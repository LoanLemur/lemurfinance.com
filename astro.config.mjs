// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.lemurfinance.com',
  redirects: {
    '/contact.html': '/contact/',
  },
  integrations: [sitemap()],
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Plus Jakarta Sans',
      cssVariable: '--font-plus-jakarta-sans',
      weights: ['200 800'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
  // Amp's embedded browser and the Cloudflare preview reach Astro through
  // trusted reverse proxies whose hostnames are generated per orb or tunnel.
  // Astro documents `[{}]` for this dynamic-domain reverse-proxy case:
  // https://docs.astro.build/en/reference/configuration-reference/#securityalloweddomains
  security: {
    allowedDomains: [{}],
  },
  // Listen beyond localhost so those proxies can reach the dev server. A
  // leading `.` permits both the named domain and its subdomains; keep this
  // list explicit instead of using `true`, which Vite warns enables DNS
  // rebinding attacks:
  // https://vite.dev/config/server-options.html#server-host
  // https://vite.dev/config/server-options.html#server-allowedhosts
  server: {
    host: true,
    allowedHosts: ['.e2b.app', '.onamp.dev', '.trycloudflare.com'],
  },
  vite: {
    plugins: [
      // Astro 7's dev middleware blocks cross-site subresource requests unless
      // their `Origin` is a URL that matches `security.allowedDomains`. A
      // sandboxed iframe can instead have the opaque origin `null`, which is
      // not a URL and therefore cannot pass that check. This narrowly removes
      // the unreliable proxy metadata for that request shape; every other
      // request still goes through Astro's normal protection.
      // Astro source: https://github.com/withastro/astro/blob/astro%407.0.3/packages/astro/src/vite-plugin-astro-server/sec-fetch.ts
      // Opaque origins: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Origin#description
      {
        name: 'allow-sandboxed-preview-origin',
        // This workaround belongs to the development server, not the build.
        apply: 'serve',
        configureServer(server) {
          // Vite calls a returned hook after its internal middleware is
          // installed. `unshift` then places this normalization immediately
          // before Astro's Sec-Fetch middleware.
          // https://vite.dev/guide/api-plugin.html#configureserver
          return () => {
            server.middlewares.stack.unshift({
              route: '',
              handle(request, _response, next) {
                const isOpaqueCrossOriginPreview =
                  request.headers['sec-fetch-site'] === 'cross-site' &&
                  request.headers['sec-fetch-mode'] === 'cors' &&
                  (!request.headers.origin ||
                    request.headers.origin === 'null');

                if (isOpaqueCrossOriginPreview) {
                  // Astro explicitly permits requests without this header;
                  // deleting it avoids falsely claiming the request is same-site.
                  delete request.headers['sec-fetch-site'];
                }

                next();
              },
            });
          };
        },
      },
      tailwindcss(),
    ],
    // Vite's default CORS policy permits only localhost origins. Amp's dynamic
    // preview origins require the dev server to reflect the requesting origin.
    // The explicit Host allowlist above still limits which proxy hosts Vite
    // will serve.
    // https://vite.dev/config/server-options.html#server-cors
    server: {
      cors: {
        origin: true,
      },
    },
  },
});
