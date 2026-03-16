# Google Meet Tab Protector 🛡️

A lightweight Chrome Extension that prevents you from accidentally ending your Google Meet calls by closing the tab or refreshing the page.

## 🚀 Features
- **Accidental Closure Prevention:** Triggers a native browser confirmation dialog if you try to close or refresh an active meeting.
- **Smart Detection:** Automatically enables protection when you join a meeting and disables it when you intentionally hang up and leave the call.
- **Performance Optimized:** Simple code, zero idle-overhead. No polling, no DOM watchers/observers. Consumes 0% CPU and memory during your meeting to ensure zero lag and impact on resources.

## 🔒 Privacy
This extension respects your privacy:
- *Data Processing*: It operates entirely locally within your browser, on your device.
- *Data Collection*: It does not collect, store, or transmit any information, browsing history, or meeting data to any external servers.
- *Third Parties*: No data is shared with third parties.
- *Permissions*: Only the `host_permission`, and only for the `meet.google.com` website, is being used - solely to detect the active meeting state and to provide the safety confirmation dialog.

## 🛠️ Installation (Manual/Developer Mode)
1. Clone this repository or download the ZIP.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer Mode** (top right).
4. Click **Load unpacked** and select the extension folder.

## 📄 License
This project is licensed under the [MIT License](LICENSE). 

## 🤝 Contributing
Feel free to open issues or submit pull requests to help improve the detection logic or UI!