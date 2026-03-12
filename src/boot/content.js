// src/boot/content.js
console.log("[Mempool.exe] Boot sequence initiated...");

const injectResource = (filePath, tag) => {
    const node = document.getElementsByTagName(tag)[0] || document.documentElement;
    const element = document.createElement(tag === 'head' && filePath.endsWith('.css') ? 'link' : 'script');
    
    if (element.tagName.toLowerCase() === 'link') {
        element.rel = 'stylesheet';
        element.href = chrome.runtime.getURL(filePath);
    } else {
        element.type = 'text/javascript';
        element.src = chrome.runtime.getURL(filePath);
    }
    node.appendChild(element);
};

// Inject CSS first so there's no flash of unstyled content
injectResource('src/ui/terminal-theme.css', 'head');

// Inject JS modules sequentially
const modules = [
    'src/utils/constants.js',
    'src/utils/decoder.js',
    'src/services/risk-engine.js',
    'src/ui/cyber-overlay.js',
    'src/core/interceptor.js'
];

modules.forEach(mod => injectResource(mod, 'body'));
