// src/utils/constants.js
window.MempoolConstants = {
    // Known dangerous function signatures (First 4 bytes of keccak256 hash)
    THREAT_SIGNATURES: {
        '0x095ea7b3': { name: 'APPROVE', risk: 40, desc: 'Potential Token Drain' },
        '0xa9059cbb': { name: 'TRANSFER', risk: 10, desc: 'Moving Assets' },
        '0x23b872dd': { name: 'TRANSFER_FROM', risk: 30, desc: 'Pulling Assets' },
        '0x7331133e': { name: 'SET_APPROVAL_FOR_ALL', risk: 90, desc: 'Severe NFT Drain Risk' },
        '0x313ce567': { name: 'DECIMALS', risk: 10, desc: 'Often used in phishing/spoofing' },
        '0x': { name: 'NATIVE_TRANSFER', risk: 0, desc: 'Direct ETH Transfer' }
    },

    // Known malicious addresses (Hardcoded for the prototype)
    BLACKLIST: [
        '0x1234567890123456789012345678901234567890', // Dummy
        '0xbadc0dedbadc0dedbadc0dedbadc0dedbadc0ded'  // Dummy Burner
    ]
};
