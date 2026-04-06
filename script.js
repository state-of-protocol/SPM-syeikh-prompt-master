document.addEventListener('DOMContentLoaded', () => {
    const liveInputs = document.querySelectorAll('.live-input, .live-check');
    const liveToggle = document.getElementById('liveToggle');
    const promptOutput = document.getElementById('promptOutput');
    const valuationBadge = document.getElementById('valuationBadge');
    const researchBtn = document.getElementById('researchIdolBtn');
    const copyBtn = document.getElementById('copyBtn');

    /**
     * AI VALUATION ENGINE
     */
    const calculateValuation = (industries, taskLength, idol) => {
        let baseValue = 49.00; // Base professional grade
        let industryBonus = industries.length * 25.00;
        let complexityBonus = (taskLength / 50) * 10.00;
        let idolBonus = idol ? 30.00 : 0;
        
        let total = baseValue + industryBonus + complexityBonus + idolBonus;
        valuationBadge.innerText = `VALUE: $${total.toFixed(2)} USD`;
        
        // Visual feedback
        valuationBadge.style.animation = 'none';
        valuationBadge.offsetHeight;
        valuationBadge.style.animation = 'glow 2s infinite ease-in-out';
    };

    const generatePrompt = () => {
        const name = document.getElementById('fullName').value || "USER";
        const dob = document.getElementById('dob').value || "N/A";
        const idol = document.getElementById('idol').value || "STRATEGIST";
        const industries = Array.from(document.querySelectorAll('input[name="industry"]:checked')).map(cb => cb.value);
        const task = document.getElementById('task').value;
        const format = document.getElementById('format').value;
        const tone = document.getElementById('tone').value;

        if (!task || industries.length === 0) {
            promptOutput.textContent = "$ waiting for telemetry...";
            valuationBadge.innerText = "VALUE: $0.00 USD";
            return;
        }

        calculateValuation(industries, task.length, document.getElementById('idol').value);

        const industryStr = industries.join(", ");
        const prompt = `[SYSTEM_PERSONA]
Role: Expert Consultant in [${industryStr}]
DNA: Philosophical Strategy of ${idol}

[USER_CONTEXT]
Subject: ${name}
Visi: Global Impact

[OBJECTIVE]
Task: ${task}

[EXECUTION]
1. Format: ${format}
2. Tone: ${tone}
3. Analysis: Higher-order reasoning integrated.

$ prompt_valuation: success.`;

        promptOutput.textContent = prompt;
    };

    liveInputs.forEach(input => {
        input.addEventListener('input', () => { if (liveToggle.checked) generatePrompt(); });
        input.addEventListener('change', () => { if (liveToggle.checked) generatePrompt(); });
    });

    researchBtn.addEventListener('click', () => {
        const idol = document.getElementById('idol').value;
        if (!idol) return;
        promptOutput.textContent = `$ gemini analyze --target="${idol}"\n\nResearching economic impact of ${idol}...`;
    });

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(promptOutput.textContent).then(() => {
            const originalText = copyBtn.innerText;
            copyBtn.innerText = "COPIED!";
            setTimeout(() => copyBtn.innerText = originalText, 1000);
        });
    });
});