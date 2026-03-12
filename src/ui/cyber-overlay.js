// src/ui/cyber-overlay.js
window.MempoolUI = {
    init: function() {
        const overlay = document.createElement('div');
        overlay.id = 'mempool-exe-overlay';
        overlay.innerHTML = `
            <h2>🛡️ Mempool.exe // Intercept</h2>
            <div class="mempool-data-row"><strong>TARGET:</strong> <span id="mempool-target"></span></div>
            <div class="mempool-data-row"><strong>PAYLOAD:</strong> <span id="mempool-data"></span></div>
            <div class="mempool-data-row" style="color: #ff9900;"><strong>STATUS:</strong> SIMULATING...</div>
            <div class="mempool-btn-group">
                <button class="mempool-btn mempool-btn-reject" id="mempool-btn-drop">DROP_TX</button>
                <button class="mempool-btn" id="mempool-btn-sign">SIGN_PAYLOAD</button>
            </div>
        `;
        document.body.appendChild(overlay);
    },

    show: function(txParams, onApprove, onReject) {
        document.getElementById('mempool-exe-overlay').style.display = 'block';
        document.getElementById('mempool-target').innerText = txParams.to || 'Contract Creation';
        
        // Truncate data for display
        const data = txParams.data || '0x';
        document.getElementById('mempool-data').innerText = data.length > 40 ? data.substring(0, 40) + '...' : data;

        document.getElementById('mempool-btn-sign').onclick = () => {
            this.hide();
            onApprove();
        };

        document.getElementById('mempool-btn-drop').onclick = () => {
            this.hide();
            onReject();
        };
    },

    hide: function() {
        document.getElementById('mempool-exe-overlay').style.display = 'none';
    }
};

// Initialize the UI on script load
window.MempoolUI.init();
