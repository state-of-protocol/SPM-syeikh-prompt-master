document.addEventListener('DOMContentLoaded', () => {
    const liveInputs = document.querySelectorAll('.live-input, .live-check');
    const liveToggle = document.getElementById('livePreviewToggle');
    const promptOutput = document.getElementById('promptOutput');
    const researchBtn = document.getElementById('researchIdolBtn');
    const generateBtn = document.getElementById('generateBtn');
    const copyBtn = document.getElementById('copyBtn');

    // FUNCTION TO GENERATE PROMPT
    const generateMasterPrompt = () => {
        const name = document.getElementById('fullName').value || "Individu Berwawasan";
        const dob = document.getElementById('dob').value || "N/A";
        const idol = document.getElementById('idol').value || "Tokoh Global";
        const ambition = document.getElementById('ambition').value || "Mencapai Kecemerlangan";
        
        const industries = Array.from(document.querySelectorAll('input[name="industry"]:checked'))
            .map(cb => cb.value);
        
        const task = document.getElementById('task').value;
        const format = document.getElementById('format').value;
        const tone = document.getElementById('tone').value;

        if (!task || industries.length === 0) {
            promptOutput.textContent = "Menunggu input lengkap (Tugasan & Bidang Industri)...";
            return;
        }

        const industryStr = industries.join(", ");

        const prompt = `[SYSTEM_ROLE]
Bertindak sebagai Pakar Hibrid dalam [${industryStr}] dengan DNA strategi [${idol}].

[USER_PROFILE]
Subjek: ${name}
Visi: ${ambition}
Rujukan: ${idol}

[OBJECTIVE]
${task}

[CONSTRAINTS]
1. Format: ${format}
2. Nada: ${tone}
3. Integrasi: Gabungkan falsafah ${idol} ke dalam penyelesaian untuk ${name}.
4. Standard: Gunakan metrik industri berimpak tinggi.

[GEMINI_SEARCH_TRIGGER]
Sila rujuk data terkini mengenai kriteria kejayaan ${idol} dalam konteks ${industryStr} untuk memberikan jawapan yang paling relevan bagi ${name}.

Sila jana output sekarang.`;

        promptOutput.textContent = prompt;
    };

    // LIVE PREVIEW LISTENERS
    liveInputs.forEach(input => {
        input.addEventListener('input', () => {
            if (liveToggle.checked) generateMasterPrompt();
        });
        input.addEventListener('change', () => {
            if (liveToggle.checked) generateMasterPrompt();
        });
    });

    // RESEARCH IDOL BUTTON (GEMINI HELPER)
    researchBtn.addEventListener('click', () => {
        const idol = document.getElementById('idol').value;
        if (!idol) {
            alert("Sila masukkan nama idola terlebih dahulu!");
            return;
        }

        const researchPrompt = `Cari maklumat terperinci mengenai etos kerja, strategi utama, dan falsafah kejayaan ${idol}. Fokus kepada bagaimana beliau menguruskan projek berskala besar dan impak tinggi. Sila berikan ringkasan dalam bentuk poin untuk saya gunakan sebagai rujukan persona AI.`;
        
        promptOutput.textContent = `[SALIN PROMPT INI KE GEMINI CLI/WEB UNTUK PENYELIDIKAN]\n\n${researchPrompt}`;
        alert("Prompt Penyelidikan Idola telah dijana!");
    });

    // MANUAL GENERATE
    generateBtn.addEventListener('click', generateMasterPrompt);

    // COPY FUNCTION
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(promptOutput.textContent).then(() => {
            alert("Prompt telah disalin!");
        });
    });
});