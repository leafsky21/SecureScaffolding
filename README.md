# Secure Scaffolding website migration

Astro static site for Cloudflare Pages. Existing Wix routes are preserved: `/`, `/about`, `/services`, `/clients`, `/contact`.

## Local preview

Install dependencies, then run `npm run dev`. Build with `npm run build`.

## Cloudflare Pages

Connect this repository to Cloudflare Pages. Use `npm run build` as the build command and `dist` as the output directory. Add `www.securescaffolding.com.au` and `securescaffolding.com.au` as custom domains only during approved cutover.

## Contact form

Replace `REPLACE_WITH_FORM_ID` in `src/pages/contact.astro` with the approved Formspree endpoint. Enable Turnstile/spam protection and email notifications in Formspree before launch. Do not change DNS or cancel Wix until preview, forms, analytics and redirects have been verified.

## Cutover checklist

1. Deploy to the `pages.dev` preview URL.
2. Confirm all five routes, mobile navigation, form delivery, canonical URLs, sitemap and robots.
3. Add the custom domain in Cloudflare Pages and update DNS only when approved.
4. Keep Wix available for rollback until the new site is verified in production.
