# TODO - Fix pagespeed.web.de Performance (FCP/CLS)

- [x] Update `src/index.css` to add global font-rendering fallbacks and reduce FCP impact.
- [x] Update `src/pages/ImageCompressor.tsx` to avoid layout shifts caused by Suspense-wrapped Footer/KB (provide fixed-height placeholders).
- [ ] Update root `index.html` to preload/prioritize the main Vite entry script (where possible) and add browser hints.

- [ ] Rebuild (`npm run build`) and re-check Lighthouse/PageSpeed metrics (FCP + CLS).
- [ ] Iterate based on remaining CLS/FCP issues.

