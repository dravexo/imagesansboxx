import { useEffect } from 'react';

const BLOG_AD_SRC = 'https://quge5.com/88/tag.min.js';
const BLOG_AD_ZONE = '271357';

export default function BlogAdScript() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = BLOG_AD_SRC;
    script.dataset.zone = BLOG_AD_ZONE;
    script.async = true;
    script.dataset.cfasync = 'false';
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}
