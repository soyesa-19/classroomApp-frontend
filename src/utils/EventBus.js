// @ts-nocheck
/**
 * EventBus class for handling communication between parent window and iframe
 */
export class EventBus {
  constructor() {
    this.listeners = new Map();
    this.iframe = null;
    this.isIframe = window !== window.parent;
  }

  /**
   * Initialize iframe reference
   * @param {HTMLIFrameElement} iframeElement - The iframe element to communicate with
   */
  setIframe(iframeElement) {
    this.iframe = iframeElement;
  }

  /**
   * Setup message listener for both parent and iframe
   */
  setupMessageListener() {
    const handleMessage = (event) => {
      // Verify origin for security
      // if (event.origin !== "YOUR_TRUSTED_ORIGIN") return;

      const { type, payload } = event.data;
      if (type && this.listeners.has(type)) {
        this.listeners.get(type)?.forEach((callback) => callback(payload));
      }
    };
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }

  /**
   * Subscribe to events
   * @param {string} eventType - The type of event to subscribe to
   * @param {Function} callback - The callback function to execute when the event is emitted
   * @returns {Function} A function to unsubscribe from the event
   */
  subscribe(eventType, callback) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    this.listeners.get(eventType)?.add(callback);

    // Return unsubscribe function
    return () => {
      this.listeners.get(eventType)?.delete(callback);
    };
  }

  /**
   * Emit events
   * @param {string} eventType - The type of event to emit
   * @param {any} payload - The data to send with the event
   */
  emit(eventType, payload) {
    const message = {
      type: eventType,
      payload,
    };

    if (this.iframe) {
      // If we're the parent, send to iframe
      this.iframe.contentWindow?.postMessage(message, "*");
    }
  }

  /**
   * Remove all listeners
   */
  clear() {
    this.listeners.clear();
  }
}

// Create singleton instance
export const eventBus = new EventBus();
