## Development

In an orb, start the Astro development server and its native Amp Portal with:

```
amp orb services ensure
```

Manage it with `amp orb service status web`, `amp orb service logs web`,
`amp orb service restart web`, and `amp orb service stop web`.

Use the portal URL printed by `amp orb services ensure` when reporting UI changes so they can be
tested from another device. Outside an orb, use `astro dev --background`; manage that server with
`astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
