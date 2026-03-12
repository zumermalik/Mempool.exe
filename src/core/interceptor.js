// src/core/interceptor.js
const initMempoolExe = () => {
    if (window.ethereum) {
        console.log("[Mempool.exe] Injected into window.ethereum. Awaiting payloads.");

        const originalRequest = window.ethereum.request.bind(window.ethereum);

        window.ethereum.request = async (args) => {
            const { method, params } = args;

            if (method === 'eth_sendTransaction') {
                return new Promise((resolve, reject) => {
                    // Show our custom Cyber UI instead of the browser confirm()
                    window.MempoolUI.show(
                        params[0], 
                        () => {
                            console.log("[Mempool.exe] Payload signed by user.");
                            resolve(originalRequest(args));
                        },
                        () => {
                            console.error("[Mempool.exe] Payload dropped by user.");
                            reject(new Error("Transaction dropped by Mempool.exe"));
                        }
                    );
                });
            }

            return originalRequest(args);
        };
    } else {
        setTimeout(initMempoolExe, 100);
    }
};

initMempoolExe();
