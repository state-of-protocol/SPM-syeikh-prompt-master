document.addEventListener('DOMContentLoaded', () => {
    const liveInputs = document.querySelectorAll('.live-input, .live-check');
    const liveToggle = document.getElementById('liveToggle');
    const promptOutput = document.getElementById('promptOutput');
    const researchBtn = document.getElementById('researchIdolBtn');
    const generateBtn = document.getElementById('generateBtn');
    const copyBtn = document.getElementById('copyBtn');

    /**
     * PERSISTENCE ENGINE (AUTO-SAVE/LOAD)
     */
    const saveState = () => {
        const state = {
            name: document.getElementById('fullName').value,
            dob: document.getElementById('dob').value,
            idol: document.getElementById('idol').value,
            ambition: document.getElementById('ambition').value,
            task: document.getElementById('task').value,
            format: document.getElementById('format').value,
            tone: document.getElementById('tone').value,
            industries: Array.from(document.querySelectorAll('input[name="industry"]:checked')).map(cb => cb.value)
        };
        localStorage.setItem('spm_state', JSON.stringify(state));
    };

    const loadState = () => {
        const saved = localStorage.getItem('spm_state');
        if (!saved) return;
        
        const state = JSON.parse(saved);
        if (state.name) document.getElementById('fullName').value = state.name;
        if (state.dob) document.getElementById('dob').value = state.dob;
        if (state.idol) document.getElementById('idol').value = state.idol;
        if (state.ambition) document.getElementById('ambition').value = state.ambition;
        if (state.task) document.getElementById('task').value = state.task;
        if (state.format) document.getElementById('format').value = state.format;
        if (state.tone) document.getElementById('tone').value = state.tone;
        
        if (state.industries) {
            state.industries.forEach(val => {
                const cb = document.querySelector(`input[value="${val}"]`);
                if (cb) cb.checked = true;
            });
        }
        
        // Trigger initial generation if data exists
        generatePrompt();
    };

    /**
     * CORE GENERATION LOGIC
     */
    const generatePrompt = () => {
        const name = document.getElementById('fullName').value || "USER";
        const dob = document.getElementById('dob').value || "N/A";
        const idol = document.getElementById('idol').value || "STRATEGIST";
        const industries = Array.from(document.querySelectorAll('input[name="industry"]:checked')).map(cb => cb.value);
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

[OBJECTIVE]
Task: ${task}

[EXECUTION_FLOW]
1. Format: ${format}
2. Tone: ${tone}
3. Analysis: Integrate ${idol}'s strategic framework.

$ system ready. generating...`;

        promptOutput.style.animation = 'none';
        promptOutput.offsetHeight; 
        promptOutput.style.animation = null; 
        promptOutput.textContent = prompt;
    };

    // Initialize State
    loadState();

    // Event Listeners for Persistence & Preview
    liveInputs.forEach(input => {
        input.addEventListener('input', () => { 
            saveState();
            if (liveToggle.checked) generatePrompt(); 
        });
        input.addEventListener('change', () => { 
            saveState();
            if (liveToggle.checked) generatePrompt(); 
        });
    });

    researchBtn.addEventListener('click', () => {
        const idol = document.getElementById('idol').value;
        if (!idol) return;
        promptOutput.textContent = `$ gemini research --target="${idol}" --depth=deep\n\nCommand generated. Researching strategy of ${idol}...`;
    });

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(promptOutput.textContent).then(() => {
            const originalText = copyBtn.innerText;
            copyBtn.innerText = "COPIED!";
            copyBtn.style.background = "#27c93f";
            setTimeout(() => {
                copyBtn.innerText = originalText;
                copyBtn.style.background = "";
            }, 1000);
        });
    });
});