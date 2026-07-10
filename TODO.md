# TODO - Improve Page Speed & Accessibility

## Step 1: Font loading performance
- [ ] Move Google Font loading from `src/index.css` (@import) to `index.html` with `preconnect` + stylesheet links.
- [ ] Keep safe font fallbacks.

## Step 2: Reduce blog content bloat
- [x] Update `src/data/blogPosts.ts` to stop generating 10,000+ word content by default.
- [x] Cap expansion to a smaller target (2000 words default). 


## Step 3: Optimize blog images
- [x] Update `src/pages/Blog.tsx` blog card images: `loading="lazy"`, `decoding="async"`, and set `width/height`.
- [x] Update `src/pages/BlogPost.tsx` hero image: `fetchPriority="high"`, `loading="eager"`, `decoding="async"`, and add dimension hints.


## Step 4: Modal accessibility
- [x] Update `src/pages/ImageCompressor.tsx` modal to use `role="dialog"`, `aria-modal="true"`, `aria-labelledby`.
- [x] Add focus management (focus close button / return focus on close).
- [x] Add Escape handling inside modal and ensure backdrop close remains.



## Step 5: Validate
- [x] Run `npm run build`
- [ ] Re-check Lighthouse/PageSpeed + Accessibility scores


