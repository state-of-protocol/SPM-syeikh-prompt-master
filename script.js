document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const liveInputs = document.querySelectorAll('.live-input, .live-check');
    const liveToggle = document.getElementById('liveToggle');
    const promptOutput = document.getElementById('promptOutput');
    const generateBtn = document.getElementById('generateBtn');
    const researchBtn = document.getElementById('researchIdolBtn');
    const copyBtn = document.getElementById('copyBtn');

    /**
     * CORE GENERATION LOGIC
     */
    const generatePrompt = () => {
        // Personal Data
        const name = document.getElementById('fullName').value || "[Nama Pengguna]";
        const dob = document.getElementById('dob').value || "N/A";
        const idol = document.getElementById('idol').value || "[Tokoh Strategik]";
        const ambition = document.getElementById('ambition').value || "[Matlamat Hidup]";

        // Industry Data
        const selectedIndustries = Array.from(document.querySelectorAll('input[name="industry"]:checked'))
            .map(cb => cb.value);
        
        // Task Data
        const task = document.getElementById('task').value;
        const format = document.getElementById('format').value;
        const tone = document.getElementById('tone').value;

        // Validation for output
        if (!task || selectedIndustries.length === 0) {
            promptOutput.textContent = "Sila lengkapkan bahagian 'Tugasan' dan pilih sekurang-kurangnya satu 'Bidang Industri' untuk melihat hasil.";
            return;
        }

        const industryStr = selectedIndustries.join(", ");

        // Master Prompt Template
        const masterPrompt = `[SYSTEM_PERSONA]
Bertindak sebagai Pakar Konsultasi Kanan bagi bidang [${industryStr}]. Sifat profesionalisme dan etos kerja anda diacu daripada model kepimpinan ${idol}. Anda fokus kepada hasil berskala besar, impak tinggi, dan inovasi radikal.

[PROFIL_CLIENT]
- Nama: ${name} (DOB: ${dob})
- Visi Jangka Panjang: ${ambition}
- Strategi Rujukan: Etika & Falsafah ${idol}

[OBJECTIVE_TASK]
Tugas Utama: ${task}

[ARAHAN_EKSEKUTIF]
1. Sediakan penyelesaian dalam format: ${format}.
2. Gunakan nada bicara yang ${tone}.
3. Integrasi Visi: Pastikan jawapan sejajar dengan aspirasi "${ambition}" client.
4. Model Strategi: Gunakan teknik 'First Principles' atau pendekatan unik ${idol} dalam menghuraikan masalah.
5. Standard Industri: Pastikan setiap cadangan mematuhi standard terbaik dalam [${industryStr}].

[SEARCH_CONTEXT_TRIGGER]
Sila lakukan simulasi carian (mental/data) mengenai kriteria kejayaan terbaru ${idol} dalam konteks ${industryStr} untuk memberikan jawapan yang paling kompetitif.

Sila mulakan penjanaan sekarang dengan kualiti gred-perusahaan.`;

        promptOutput.textContent = masterPrompt;
    };

    /**
     * EVENT LISTENERS
     */
    
    // Live Preview Trigger
    liveInputs.forEach(input => {
        const events = ['input', 'change'];
        events.forEach(evt => {
            input.addEventListener(evt, () => {
                if (liveToggle.checked) generatePrompt();
            });
        });
    });

    // Manual Generate
    generateBtn.addEventListener('click', generatePrompt);

    // Gemini Research Helper (Idol Lookup)
    researchBtn.addEventListener('click', () => {
        const idol = document.getElementById('idol').value;
        if (!idol) {
            alert("Sila masukkan nama idola di ruangan Profil Strategik terlebih dahulu.");
            return;
        }

        const researchPrompt = `Lakukan penyelidikan mendalam mengenai tokoh bernama ${idol}. 
Sila ekstrak 5 Strategi Kunci, Falsafah Kerja, dan Cara Membuat Keputusan beliau. 
Ringkasan ini akan saya gunakan sebagai 'Persona Base' dalam sistem AI saya untuk menyelesaikan tugasan industri. 
Berikan jawapan dalam poin yang padat.`;

        promptOutput.textContent = `[SALIN PROMPT INI KE GEMINI CLI/WEB]\n\n${researchPrompt}`;
        alert("Prompt Penyelidikan Idola telah dijana. Sila salin ke Gemini untuk maklumat lanjut.");
    });

    // Copy to Clipboard
    copyBtn.addEventListener('click', () => {
        const textToCopy = promptOutput.textContent;
        if (textToCopy.includes("Sila lengkapkan")) return;

        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = copyBtn.innerText;
            copyBtn.innerText = "Berjaya Disalin!";
            copyBtn.style.background = "#22c55e";
            copyBtn.style.color = "white";

            setTimeout(() => {
                copyBtn.innerText = originalText;
                copyBtn.style.background = "";
                copyBtn.style.color = "";
            }, 2000);
        });
    });
});