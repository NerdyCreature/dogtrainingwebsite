# dog training website
web portion of the project, not the app

This is a static site. Deploy the repository root with no build command; Cloudflare Pages serves `index.html` as the homepage.

`wrangler.jsonc` declares the repository root as the Pages build output directory, so the static files are deployed without a build step.
