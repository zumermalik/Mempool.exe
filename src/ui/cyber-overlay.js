// src/ui/cyber-overlay.js
window.MempoolUI = {
    init: function() {
        // Prevent multiple injections
        if (document.getElementById('mempool-exe-overlay')) return;

        const overlay = document.createElement('div');
        overlay.id = 'mempool-exe-overlay';
        overlay.innerHTML = `
            <h2>🛡️ Mempool.exe // Intercept</h2>
            <div class="mempool-data-row"><strong>TARGET:</strong> <span id="mempool-target"></span></div>
            <div class="mempool-data-row"><strong>PAYLOAD:</strong> <span id="mempool-data"></span></div>
            
            <div class="mempool-data-row" style="margin-top: 15px; border-top: 1px solid #333; padding-top: 10px;">
                <strong>THREAT LEVEL:</strong> <span id="mempool-threat-score">CALCULATING...</span>
            </div>
            <div class="mempool-data-row" id="mempool-flags-container">
                <strong>ANALYSIS:</strong><br/>
                <ul id="mempool-flags" style="margin: 5px 0; padding-left: 20px; color: #ff9900;"></ul>
            </div>

            <div class="mempool-btn-group">
                <button class="mempool-btn mempool-btn-reject" id="mempool-btn-drop">DROP_TX</button>
                <button class="mempool-btn" id="mempool-btn-sign">SIGN_PAYLOAD</button>
            </div>
        `;
        document.body.appendChild(overlay);
    },

    show: function(txParams, threatMatrix, onApprove, onReject) {
        const overlay = document.getElementById('mempool-exe-overlay');
        overlay.style.display = 'block';
        
        // Populate Basic Data
        document.getElementById('mempool-target').innerText = txParams.to || 'Contract Creation';
        const data = txParams.data || '0x';
        document.getElementById('mempool-data').innerText = data.length > 40 ? data.substring(0, 40) + '...' : data;

        // Populate Threat Matrix Data
        const scoreElement = document.getElementById('mempool-threat-score');
        scoreElement.innerText = `${threatMatrix.score}/100`;
        
        // Color coding based on risk
        if (threatMatrix.score < 40) {
            scoreElement.style.color = '#00ff00'; // Green - Safe
        } else if (threatMatrix.score < 70) {
            scoreElement.style.color = '#ff9900'; // Orange - Warning
        } else {
            scoreElement.style.color = '#ff003c'; // Red - Critical
        }

        // Populate Analysis Flags
        const flagsList = document.getElementById('mempool-flags');
        flagsList.innerHTML = ''; // Clear previous flags
        threatMatrix.flags.forEach(flag => {
            const li = document.createElement('li');
            li.innerText = flag;
            
            // Highlight critical flags in red
            if (flag.includes('CRITICAL')) li.style.color = '#ff003c';
            else if (flag.includes('CLEAN')) li.style.color = '#00ff00';
            
            flagsList.appendChild(li);
        });

        // Button Handlers
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
