/// <reference types="vite/client" />

// Allow importing CSS files in TypeScript.
declare module '*.css' {
  const classes: Record<string, string>;
  export default classes;
}

