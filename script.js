document.addEventListener('DOMContentLoaded', () => {
    const liveInputs = document.querySelectorAll('.live-input, .live-check');
    const liveToggle = document.getElementById('liveToggle');
    const promptOutput = document.getElementById('promptOutput');
    const researchBtn = document.getElementById('researchIdolBtn');
    const copyBtn = document.getElementById('copyBtn');

    const generatePrompt = () => {
        const name = document.getElementById('fullName').value || "USER";
        const dob = document.getElementById('dob').value || "N/A";
        const idol = document.getElementById('idol').value || "STRATEGIST";
        
        const industries = Array.from(document.querySelectorAll('input[name="industry"]:checked'))
            .map(cb => cb.value);
        
        const task = document.getElementById('task').value;
        const format = document.getElementById('format').value;
        const tone = document.getElementById('tone').value;

        if (!task || industries.length === 0) {
            promptOutput.textContent = "$ waiting for input parameters...";
            return;
        }

        const industryStr = industries.join(", ");

        const prompt = `[SYSTEM_PERSONA]
Role: Expert Consultant in [${industryStr}]
Model: Philosophical DNA of ${idol}

[USER_CONTEXT]
Subject: ${name} (${dob})
Industry Focus: ${industryStr}

[OBJECTIVE]
Task: ${task}

[EXECUTION_FLOW]
1. Format: ${format}
2. Tone: ${tone}
3. Analysis: Integrate ${idol}'s strategic framework.
4. Output: High-impact industrial grade.

$ system ready. generating...`;

        promptOutput.textContent = prompt;
    };

    liveInputs.forEach(input => {
        input.addEventListener('input', () => { if (liveToggle.checked) generatePrompt(); });
        input.addEventListener('change', () => { if (liveToggle.checked) generatePrompt(); });
    });

    researchBtn.addEventListener('click', () => {
        const idol = document.getElementById('idol').value;
        if (!idol) return alert("Enter Idol name.");
        promptOutput.textContent = `$ gemini research --target="${idol}" --depth=deep\n\nCommand generated. Researching etos and strategy of ${idol}...`;
    });

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(promptOutput.textContent).then(() => {
            const originalText = copyBtn.innerText;
            copyBtn.innerText = "COPIED!";
            setTimeout(() => copyBtn.innerText = originalText, 1500);
        });
    });
});