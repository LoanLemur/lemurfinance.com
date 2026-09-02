# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Orb development

Amp orbs install dependencies through `.agents/setup`. The Astro development server is declared
as a supervised service in `.amp/services.yaml`; run `amp orb services ensure` to start it and
print its authenticated native Portal URL. The service survives Amp updates and orb pause/resume,
and the Portal includes Amp's review widget for visual feedback.

The Portal is only a development preview. Production deployments remain on Vercel.

## GitHub issue fixer orb

The project plugin at `.amp/plugins/github-issue-fixer.ts` implements an event-driven controller
for newly opened GitHub issues. A signed `issues/opened` webhook wakes the controller orb, which
validates the event and starts one independent Amp orb thread. That thread reads the issue with
`gh`, investigates it, makes and verifies a focused fix, pushes a deterministic
`amp/issue-<number>` branch, and opens a pull request. It is explicitly prohibited from merging,
deploying, publishing, or changing sensitive automation and repository configuration.

The implementation follows Amp's [Event Driven Orbs announcement](https://ampcode.com/news/event-driven-orbs)
and current [`amp.createWebhook` Plugin API](https://ampcode.com/manual/plugin-api).

Issue-authored text is not copied into the agent prompt. The spawned thread receives only validated
routing metadata (the fixed repository name, issue number, and delivery ID), fetches the current
issue itself, and is instructed to treat all issue content and links as untrusted problem-report
data.

### Safeguards

- HMAC-SHA256 verification using GitHub's `X-Hub-Signature-256` header before parsing the body.
- Exact repository, `issues` event, `opened` action, JSON content type, payload size, issue age, and
  shape checks. Events for pull requests, other repositories, and old replayed issues are ignored.
- An orb-persistent SQLite ledger keyed by Amp event ID, GitHub delivery ID, and
  `loanlemur/lemurfinance.com#<issue>`; immediate transactions serialize concurrent deliveries.
- The created Amp thread ID is saved before its prompt is sent. A retried delivery resumes that
  thread and checks for the prompt marker instead of starting another one.
- A two-minute stale-claim recovery window covers a controller interruption before thread creation
  or prompt delivery. The deterministic branch name and the spawned agent's existing-branch/PR
  checks provide a final duplicate barrier around the small, unavoidable gap between creating a
  remote thread and saving its ID locally.
- A controller marker exists only in the designated orb, so child issue-solving orbs inherit the
  plugin without registering additional webhook endpoints.

Runtime files are private and gitignored:

| Path                                     | Purpose                                       |
| ---------------------------------------- | --------------------------------------------- |
| `.amp/github-issue-fixer-controller`     | Designates the one controller thread          |
| `.amp/github-issue-fixer-webhook-secret` | Controller-local GitHub signing secret        |
| `.amp/github-issue-fixer-state.db`       | Durable delivery/issue/thread ledger          |
| `.amp/github-issue-fixer-webhook-url`    | Webhook capability URL; treat as a credential |

### Configuration

Set these non-secret environment variables in the Amp project before creating the controller orb.
The signing secret is intentionally stored only in the controller orb rather than as a project
secret: project secrets may be inherited by the child orbs that process untrusted issue reports.

| Variable                           | Required | Default  | Description                                          |
| ---------------------------------- | -------- | -------- | ---------------------------------------------------- |
| `AMP_GITHUB_ISSUE_AUTOFIX_ENABLED` | Yes      | —        | Must be exactly `true`                               |
| `AMP_GITHUB_ISSUE_AGENT_MODE`      | No       | `medium` | One of `low`, `medium`, `high`, or `ultra`           |
| `AMP_GITHUB_ISSUE_MAX_AGE_HOURS`   | No       | `168`    | Maximum age at webhook receipt for replay protection |

The Amp GitHub connection used by spawned orbs must be able to read issues, push branches, and
create pull requests in `loanlemur/lemurfinance.com`. In GitHub permission terms, it needs
**Issues: read**, **Contents: read/write**, **Pull requests: read/write**, and **Metadata: read**.
The identity used only to create the repository webhook additionally needs **Webhooks/Administration:
write**. `gh` is preinstalled and authenticated in Amp orbs; a separate `GH_TOKEN` is unnecessary
when the connected GitHub identity already has these permissions.

### Deploy the controller

1. Put the plugin on the branch used by a dedicated, repository-backed Amp orb thread. For durable
   production use, deploy it after this change has been reviewed and landed on the default branch.
2. Add the Amp project environment settings above, then create the dedicated controller thread in
   an orb.
3. In that controller orb's private Terminal, designate it and generate a controller-local webhook
   secret. Do not print the secret:

   ```sh
   umask 077
   printf '%s\n' "$AMP_THREAD_ID" > .amp/github-issue-fixer-controller
   openssl rand -hex 32 > .amp/github-issue-fixer-webhook-secret
   chmod 600 \
     .amp/github-issue-fixer-controller \
     .amp/github-issue-fixer-webhook-secret
   ```

4. Reload the project plugin with **Ctrl+O → `plugins: reload`**. It registers the stable durable
   endpoint and writes it with mode `0600` to `.amp/github-issue-fixer-webhook-url`. Do not paste the
   URL or signing secret into an Amp thread, issue, log, or committed file.
5. In **GitHub → Settings → Webhooks → Add webhook** for this repository, configure:
   - **Payload URL:** the private value from `.amp/github-issue-fixer-webhook-url`
   - **Content type:** `application/json`
   - **Secret:** the private value from `.amp/github-issue-fixer-webhook-secret`
   - **SSL verification:** enabled
   - **Events:** “Let me select individual events” → **Issues** only
   - **Active:** enabled
6. Open a disposable test issue, confirm GitHub records a successful delivery, and verify one Amp
   thread and at most one `amp/issue-<number>` pull request are created. Close the test issue/PR
   manually; the automation intentionally never merges or closes them. If a delivery fails during
   controller recovery, use **GitHub → Settings → Webhooks → Recent Deliveries → Redeliver** after
   two minutes; redelivery is safe because the ledger deduplicates issue processing.

The controller orb may sleep after registration; Amp stores incoming events and wakes it. Plugin
reloads and orb restarts retain the same endpoint because the webhook key is stable. To pause the
automation, disable or remove the GitHub webhook first, then set
`AMP_GITHUB_ISSUE_AUTOFIX_ENABLED=false`. Treat endpoint rotation or permanent removal as a
credential-revocation operation: remove the GitHub webhook and ask Amp to remove the durable
registration rather than merely deleting the local URL file.

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
