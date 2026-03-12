# Mempool.exe 🛡️

*A zero-dependency, browser-level execution firewall for Web3.*

Mempool.exe is a modular browser extension that sits between decentralized applications (dApps) and your Web3 wallet (like MetaMask). By intercepting native `window.ethereum` RPC calls, it acts as a local security node—analyzing raw hex payloads, running heuristic risk assessments, and halting malicious transactions before they are ever signed.



## ⚡ The Problem
Standard Web3 wallets blindly accept data payloads from dApps. If a user interacts with a compromised frontend or a malicious contract, the wallet will prompt them to sign away their assets with little to no human-readable context. 

## 🛠️ The Solution
Mempool.exe hijacks the execution environment. It dynamically injects a proxy over the browser's Ethereum provider, catches `eth_sendTransaction` requests, and pipes the bytecode through an internal **Risk Engine** before returning control to the user via a DOM-injected UI.

### Core Features
* **Provider Interception:** Seamlessly overrides `window.ethereum.request` without breaking dApp functionality.
* **Heuristic Risk Engine:** Decodes transaction signatures locally to detect high-risk operations (e.g., `SetApprovalForAll`, known drainer contracts).
* **Zero-Dependency Architecture:** Built entirely in Vanilla JavaScript and CSS. No Webpack, no React, no build steps. Just clean, modular, and lightning-fast execution.
* **DOM-Isolated UI:** Injects a custom, terminal-themed interface directly into the active webpage to display threat matrices in real-time.

---

## 🏗️ Architecture & File Structure

Unlike standard "flat" extensions, Mempool.exe utilizes an enterprise-grade modular architecture directly within the browser's isolated world context.

```text
mempool-exe/
├── manifest.json
├── src/
│   ├── boot/
│   │   └── content.js           # Sequentially injects internal modules into the DOM
│   ├── core/
│   │   └── interceptor.js       # The window.ethereum proxy and execution halt logic
│   ├── services/
│   │   └── risk-engine.js       # Evaluates hex payloads against threat signatures
│   ├── ui/
│   │   ├── cyber-overlay.js     # Dynamically generated DOM overlay
│   │   └── terminal-theme.css   # Cyberpunk aesthetic stylesheet
│   └── utils/
│       ├── decoder.js           # Hex to readable string conversion
│       └── constants.js         # Known malicious contract registries

```

---

## 🚀 Installation (Developer Mode)

Because this project uses a zero-build-step architecture, installation takes less than 10 seconds.

1. **Clone the repository:**
```bash
git clone https://github.com/zumermalik/mempool-exe.git

```


2. Open Google Chrome or Brave and navigate to `chrome://extensions/`.
3. Toggle on **Developer mode** in the top right corner.
4. Click **Load unpacked** in the top left corner.
5. Select the `mempool-exe` folder you just cloned.
6. Navigate to any dApp (e.g., Uniswap) and trigger a transaction to see the firewall in action.

---

## 🔒 Security & Privacy

Mempool.exe runs 100% locally. It does not track your IP, it does not store your private keys, and it does not phone home. The heuristic engine processes all bytecode analysis strictly within your browser's execution environment.

---

*Built for the decentralized web.*

```


