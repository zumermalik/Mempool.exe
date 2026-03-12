// src/services/risk-engine.js
window.RiskEngine = {
    // Known dangerous function signatures (First 4 bytes of keccak256 hash)
    THREAT_SIGNATURES: {
        '0x095ea7b3': 'APPROVE (Potential Token Drain)',
        '0xa9059cbb': 'TRANSFER (Moving Assets)',
        '0x23b872dd': 'TRANSFER_FROM (Pulling Assets)',
        '0x7331133e': 'SET_APPROVAL_FOR_ALL (Severe NFT Drain Risk)',
        '0x313ce567': 'DECIMALS (Often used in phishing/spoofing)',
        '0x': 'NATIVE_TRANSFER (Direct ETH Transfer)'
    },

    // Mock Database: In a real environment, you'd fetch this from a live API
    // like the Chainabuse API or GoPlus Security.
    BLACKLIST: [
        '0x1234567890123456789012345678901234567890', // Dummy
        '0xbadc0dedbadc0dedbadc0dedbadc0dedbadc0ded'  // Dummy Burner
    ],

    /**
     * Analyzes a raw transaction payload and returns a threat matrix.
     */
    evaluate: async function(txParams) {
        console.log("[Mempool.exe // RiskEngine] Commencing heuristic analysis...");
        
        let threatLevel = 0; // 0-100 scale
        let flags = [];

        const target = (txParams.to || '').toLowerCase();
        const payload = (txParams.data || '0x').toLowerCase();
        const valueHex = txParams.value || '0x0';

        // --- HEURISTIC 1: Blacklist Check ---
        if (this.BLACKLIST.includes(target)) {
            threatLevel += 100;
            flags.push("CRITICAL: Target matches known malicious syndicate.");
        }

        // --- HEURISTIC 2: Payload Signature Analysis ---
        const methodSignature = payload.length >= 10 ? payload.substring(0, 10) : '0x';
        if (this.THREAT_SIGNATURES[methodSignature]) {
            threatLevel += 40;
            flags.push(`WARNING: Executing ${this.THREAT_SIGNATURES[methodSignature]}`);
            
            // Extreme risk modifier for SetApprovalForAll
            if (methodSignature === '0x7331133e') threatLevel += 50; 
        }

        // --- HEURISTIC 3: Value Volume ---
        // Convert raw hex value to BigInt (Vanilla JS) to check for large native transfers
        try {
            if (valueHex !== '0x0') {
                const ethValue = BigInt(valueHex);
                // 1 ETH in Wei = 1000000000000000000
                if (ethValue >= BigInt('1000000000000000000')) { 
                    threatLevel += 20;
                    flags.push("NOTICE: High-volume native asset transfer detected.");
                }
            }
        } catch (e) {
            console.error("[Mempool.exe] Volume parsing failure.");
        }

        // --- HEURISTIC 4: Blind Contract Interaction ---
        if (payload.length > 10 && valueHex !== '0x0') {
            threatLevel += 10;
            flags.push("NOTICE: Sending value while executing complex payload.");
        }

        return {
            isSafe: threatLevel < 70,
            score: Math.min(threatLevel, 100), // Cap at 100
            flags: flags.length > 0 ? flags : ["CLEAN: No obvious heuristic triggers."]
        };
    }
};
