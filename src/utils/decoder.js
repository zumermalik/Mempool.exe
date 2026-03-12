// src/utils/decoder.js
window.MempoolDecoder = {
    /**
     * Extracts the 4-byte function signature (first 10 chars) from tx data.
     */
    getSignature: function(data) {
        if (!data || data === '0x') return '0x';
        return data.length >= 10 ? data.substring(0, 10).toLowerCase() : '0x';
    },

    /**
     * Converts a raw hex value (Wei) into a readable ETH string.
     */
    weiHexToEth: function(hexValue) {
        if (!hexValue || hexValue === '0x0') return '0 ETH';
        try {
            const wei = BigInt(hexValue);
            const eth = Number(wei) / 1e18; // 10^18 Wei = 1 ETH
            return `${eth.toFixed(4)} ETH`;
        } catch (e) {
            console.error("[Mempool.exe // Decoder] Hex parsing failed.");
            return 'Parse Error';
        }
    },

    /**
     * Truncates long hex strings (like addresses) for clean UI rendering.
     */
    truncateHex: function(hexString, start = 6, end = 4) {
        if (!hexString || hexString.length <= start + end) return hexString;
        return `${hexString.substring(0, start)}...${hexString.substring(hexString.length - end)}`;
    }
};
