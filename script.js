document.addEventListener('DOMContentLoaded', () => {
    const liveInputs = document.querySelectorAll('.live-input, .live-check');
    const liveToggle = document.getElementById('liveToggle');
    const promptOutput = document.getElementById('promptOutput');
    const valuationBadge = document.getElementById('valuationBadge');
    const copyBtn = document.getElementById('copyBtn');
    
    // Dashboard Elements
    const uptimeCounter = document.getElementById('uptimeCounter');
    const goalProgress = document.getElementById('goalProgress');
    const goalPercent = document.getElementById('goalPercent');
    const roiValue = document.getElementById('roiValue');

    /**
     * UPTIME CLOCK
     */
    let seconds = 0;
    setInterval(() => {
        seconds++;
        let hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
        let mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        let secs = (seconds % 60).toString().padStart(2, '0');
        uptimeCounter.textContent = `${hrs}:${mins}:${secs}`;
    }, 1000);

    /**
     * TELEMETRY UPDATE
     */
    const updateDashboard = (value) => {
        const target = 250;
        const percentage = Math.min((value / target) * 100, 100).toFixed(1);
        
        goalProgress.style.width = `${percentage}%`;
        goalPercent.textContent = `${percentage}%`;
        
        // ROI Calculation (Simulated for Investor)
        const roi = (value / 49 * 100).toFixed(1);
        roiValue.textContent = `+${roi}%`;
    };

    const generatePrompt = () => {
        const industries = Array.from(document.querySelectorAll('input[name="industry"]:checked')).map(cb => cb.value);
        const task = document.getElementById('task').value;
        const idol = document.getElementById('idol').value || "STRATEGIST";

        if (!task || industries.length === 0) {
            promptOutput.textContent = "$ awaiting telemetry data...";
            valuationBadge.innerText = "VALUE: $0.00 USD";
            updateDashboard(0);
            return;
        }

        // Calculate Value
        let total = 49.00 + (industries.length * 25.00) + (task.length / 5);
        valuationBadge.innerText = `VALUE: $${total.toFixed(2)} USD`;
        updateDashboard(total);

        const prompt = `[SYSTEM_ENTERPRISE_SENTINEL]
Role: Hybrid Strategist [${industries.join(", ")}]
Base Model: ${idol} Logic Engine

[MISSION]
${task}

[TELEMETRY_STATUS]
- Target Goal: $250.00
- Est. Value: $${total.toFixed(2)}
- Protocol: Secure SSL Sync

$ generating high-impact response...`;

        promptOutput.textContent = prompt;
    };

    liveInputs.forEach(input => {
        input.addEventListener('input', () => { if (liveToggle.checked) generatePrompt(); });
        input.addEventListener('change', () => { if (liveToggle.checked) generatePrompt(); });
    });

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(promptOutput.textContent).then(() => {
            copyBtn.innerText = "COPIED!";
            setTimeout(() => copyBtn.innerText = "COPY", 1000);
        });
    });
});