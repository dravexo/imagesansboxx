# TODO - Performance (FCP/LCP/TBT)

- [x] Dynamic-import heavy dependency `jszip` so it is not in the initial JS bundle for `/`

- [x] Reduce lucide-react icon import surface (only what’s rendered on first view; avoid large multi-import)

- [x] Trim Google Fonts families/weights in `index.html` to only what’s needed for first paint

- [x] Ensure GA script is not duplicated / causes unnecessary main-thread work

- [ ] Build + run Lighthouse again, compare: FCP, LCP, TBT, Speed Index


