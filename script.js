document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const liveInputs = document.querySelectorAll('.live-input, .live-check');
    const promptOutput = document.getElementById('promptOutput');
    const valuationBadge = document.getElementById('valuationBadge');
    const progressFill = document.getElementById('progressFill');
    const uptimeCounter = document.getElementById('uptimeCounter');
    const copyBtn = document.getElementById('copyBtn');

    // State Persistence
    const saveState = () => {
        const state = {
            task: document.getElementById('task').value,
            idol: document.getElementById('idol').value,
            inds: Array.from(document.querySelectorAll('input[name="industry"]:checked')).map(cb => cb.value)
        };
        localStorage.setItem('spm_v3', JSON.stringify(state));
    };

    const loadState = () => {
        const saved = JSON.parse(localStorage.getItem('spm_v3'));
        if (!saved) return;
        document.getElementById('task').value = saved.task || "";
        document.getElementById('idol').value = saved.idol || "";
        if (saved.inds) {
            saved.inds.forEach(v => {
                const cb = document.querySelector(`input[value="${v}"]`);
                if (cb) cb.checked = true;
            });
        }
        generate();
    };

    // Uptime
    let secs = 0;
    setInterval(() => {
        secs++;
        const h = Math.floor(secs/3600).toString().padStart(2,'0');
        const m = Math.floor((secs%3600)/60).toString().padStart(2,'0');
        const s = (secs%60).toString().padStart(2,'0');
        uptimeCounter.textContent = `${h}:${m}:${s}`;
    }, 1000);

    // Generation & Valuation
    const generate = () => {
        const task = document.getElementById('task').value;
        const idol = document.getElementById('idol').value || "SENTINEL";
        const inds = Array.from(document.querySelectorAll('input[name="industry"]:checked')).map(cb => cb.value);

        if (!task || inds.length === 0) {
            promptOutput.textContent = "$ spm --awaiting-input";
            valuationBadge.textContent = "$0.00";
            progressFill.style.width = "0%";
            return;
        }

        const value = 150 + (inds.length * 45) + (task.length / 5);
        valuationBadge.textContent = `$${value.toFixed(2)}`;
        progressFill.style.width = `${Math.min((value/250)*100, 100)}%`;

        promptOutput.textContent = `[SPM_COMMAND_INIT]
DNA: ${idol} Logic
CLUSTER: [${inds.join(", ")}]
TASK: ${task}

[SENTINEL_OVERRIDE]
1. Target: $250/Day.
2. Focus: Monetization & Efficiency.
3. Output: Industrial Grade.

$ executing_strategy...`;
    };

    liveInputs.forEach(i => {
        i.addEventListener('input', () => { saveState(); generate(); });
        i.addEventListener('change', () => { saveState(); generate(); });
    });

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(promptOutput.textContent).then(() => {
            copyBtn.textContent = "COPIED!";
            setTimeout(() => copyBtn.textContent = "COPY_RAW", 1000);
        });
    });

    loadState();
});