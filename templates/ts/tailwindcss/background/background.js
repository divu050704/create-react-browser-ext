console.log("🔹 Background service worker loaded.");

// Example: Log when the extension is installed or updated
chrome.runtime.onInstalled.addListener((details) => {
  console.log("✅ Extension installed or updated:", details.reason);
});

// Example: Listen for browser action (popup or icon click)
chrome.action.onClicked.addListener((tab) => {
  console.log("🖱️ Extension icon clicked on:", tab.url);

  // Send a test message to content script
  chrome.tabs.sendMessage(tab.id, {
    type: "PING",
    message: "Hello from background script 👋",
  });
});

// Example: Listen for messages from popup or content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("📨 Message received in background:", request);

  if (request.type === "GREET") {
    sendResponse({ message: "👋 Hello from background.js" });
  }

  // Keep the message channel open if needed
  return true;
});

// Optional: Log to confirm hot reload (useful for dev)
if (import.meta.hot) {
  console.log("♻️ HMR active for background.js");

  import.meta.hot.accept(() => {
    console.log("🔁 background.js updated — reloaded by Vite HMR");
  });
}
