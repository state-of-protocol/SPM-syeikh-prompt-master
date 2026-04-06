document.addEventListener('DOMContentLoaded', () => {
    const liveInputs = document.querySelectorAll('.live-input, .live-check');
    const liveToggle = document.getElementById('liveToggle');
    const promptOutput = document.getElementById('promptOutput');
    const valuationBadge = document.getElementById('valuationBadge');
    const researchBtn = document.getElementById('researchIdolBtn');
    const copyBtn = document.getElementById('copyBtn');

    // WEALTH ENGINE LOGIC
    const WEALTH_CORE = `OBJECTIVE: Generate $250 USD Daily.
LOGIC: Market Arbitrage, High Conversion SaaS, Rapid Digital Synthesis.`;

    const calculateValuation = (industries, taskLength, idol) => {
        let baseValue = 150.00; // Wealth Engine Base
        let industryBonus = industries.length * 45.00;
        let complexityBonus = (taskLength / 30) * 15.00;
        let total = baseValue + industryBonus + complexityBonus;
        valuationBadge.innerText = `POTENTIAL: $${total.toFixed(2)} USD`;
    };

    const generatePrompt = () => {
        const name = document.getElementById('fullName').value || "SYEIKH";
        const idol = document.getElementById('idol').value || "SENTINEL";
        const industries = Array.from(document.querySelectorAll('input[name="industry"]:checked')).map(cb => cb.value);
        const task = document.getElementById('task').value;

        if (!task || industries.length === 0) {
            promptOutput.textContent = "$ spm --wealth-engine --awaiting-input";
            return;
        }

        calculateValuation(industries, task.length, idol);

        const prompt = `[ROLE: SPM-WEALTH-SENTINEL]
Target: $250/Day Milestone.
DNA: ${idol} Strategy Integration.

[CONTEXT]
Owner: ${name}
Market Cluster: [${industries.join(", ")}]

[MISSION_COMMAND]
${task}

[STRATEGIC_REQUIREMENTS]
1. Focus on Monetization & Arbitrage.
2. Provide Blueprint & Conversion Estimation.
3. ${WEALTH_CORE}

$ sentinel_report: ready.`;

        promptOutput.textContent = prompt;
    };

    liveInputs.forEach(input => {
        input.addEventListener('input', () => { if (liveToggle.checked) generatePrompt(); });
        input.addEventListener('change', () => { if (liveToggle.checked) generatePrompt(); });
    });

    researchBtn.addEventListener('click', () => {
        const idol = document.getElementById('idol').value;
        promptOutput.textContent = `$ sentinel --research="${idol}" --target-usd=250\n\nCommand: Analyze wealth tactics of ${idol}...`;
    });

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(promptOutput.textContent).then(() => {
            copyBtn.innerText = "COPIED!";
            setTimeout(() => copyBtn.innerText = "COPY", 1000);
        });
    });
});