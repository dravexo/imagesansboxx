# Production Audit / Auto-Fix TODO

- [ ] Phase 1 (audit): scan configs, routing, shared components, and converter hooks/pages.
- [ ] Phase 1 (fix): `src/pages/ImageCompressor.tsx` ref/closure correctness, cleanup object URLs, remove/guard production console usage.
- [ ] Phase 1 (fix): `src/hooks/useImageConversion.ts` correctness, mime/type guards, race/cancel safety, reduce URL leaks.
- [ ] Phase 1 (fix): `src/components/Dropzone.tsx` runtime validation + keyboard accessibility.
- [ ] Phase 2 (SEO): improve defaults in `index.html` (canonical, OpenGraph/Twitter basics) and route title handling if required.
- [ ] Phase 3 (workspace audit): fix remaining TypeScript/build/runtime issues across all pages/components.
- [ ] Phase 4 (Cloudflare hardening): verify SPA and headers compatibility with Wrangler.
- [ ] Verify: run `npm run build`.
- [ ] Verify: run `npm run lint`.
- [ ] Final: ensure no remaining TS/Build errors; then list all issues found + all modified files + all explanations.

