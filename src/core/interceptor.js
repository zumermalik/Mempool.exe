const initMempoolExe = () => {
    if (window.ethereum && window.MempoolUI && window.RiskEngine) {
        console.log("[Mempool.exe] Core injected. Shield active.");

        const originalRequest = window.ethereum.request.bind(window.ethereum);

        window.ethereum.request = async (args) => {
            const { method, params } = args;

            // Intercept outbound transactions
            if (method === 'eth_sendTransaction') {
                return new Promise(async (resolve, reject) => {
                    console.log("[Mempool.exe] Transaction intercepted. Running heuristics...");
                    
                    // 1. Run the raw payload through our Risk Engine
                    const txParams = params[0];
                    const threatMatrix = await window.RiskEngine.evaluate(txParams);

                    // 2. Pass the tx details AND the threat matrix to the UI
                    window.MempoolUI.show(
                        txParams, 
                        threatMatrix, 
                        () => {
                            console.log("[Mempool.exe] User bypassed shield. Payload signed.");
                            // Send to MetaMask
                            resolve(originalRequest(args)); 
                        },
                        () => {
                            console.error("[Mempool.exe] Threat neutralized. Payload dropped.");
                            // Reject at the browser level, dApp sees a user rejection
                            reject({
                                code: 4001,
                                message: "Transaction dropped by Mempool.exe Firewall."
                            });
                        }
                    );
                });
            }

            // Let all other requests (like connecting wallet, checking chainId) pass through normally
            return originalRequest(args);
        };
    } else {
        // Retry if the DOM or dependencies haven't finished loading
        setTimeout(initMempoolExe, 100);
    }
};

initMempoolExe();
