// Global window augmentation for optional idle callback APIs.
// Keep this declaration compatible with lib.dom modifier requirements.

export {};

declare global {
  interface Window {
    requestIdleCallback?: (cb: IdleRequestCallback, options?: IdleRequestOptions) => number;
    cancelIdleCallback?: (id: number) => void;
  }
}

