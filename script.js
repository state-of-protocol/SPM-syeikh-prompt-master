document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const copyBtn = document.getElementById('copyBtn');
    const promptOutput = document.getElementById('promptOutput');

    generateBtn.addEventListener('click', () => {
        // Capture Personal Info
        const name = document.getElementById('fullName').value || "Individu Berwawasan";
        const dob = document.getElementById('dob').value || "N/A";
        const idol = document.getElementById('idol').value || "Tokoh Global";
        const ambition = document.getElementById('ambition').value || "Mencapai Kecemerlangan Industri";

        // Capture Selected Industries (Tick Mode)
        const selectedIndustries = Array.from(document.querySelectorAll('input[name="industry"]:checked'))
            .map(cb => cb.value);

        const task = document.getElementById('task').value;
        const format = document.getElementById('format').value;
        const tone = document.getElementById('tone').value;

        if (!task) {
            alert("Sila masukkan tugasan utama anda!");
            return;
        }

        if (selectedIndustries.length === 0) {
            alert("Sila pilih sekurang-kurangnya satu bidang industri!");
            return;
        }

        const industryList = selectedIndustries.join(", ");

        const masterPrompt = `[PROFIL PENGGUNA]
Nama: ${name}
Tarikh Lahir: ${dob}
Idola/Rujukan: ${idol}
Cita-cita: ${ambition}

[KONTEKS INDUSTRI]
Kepakaran Terpilih: ${industryList}

[TUGASAN STRATEGIK]
Tugas Utama: ${task}

[ARAHAN KHUSUS]
1. Bertindak sebagai gabungan Pakar Kanan dalam bidang [${industryList}] dengan etos kerja dan visi yang diinspirasikan oleh [${idol}].
2. Gunakan profil peribadi pengguna (Nama & Cita-cita) untuk menyesuaikan penyelesaian supaya relevan dengan matlamat jangka panjang beliau.
3. Strukturkan jawapan dalam format: ${format}.
4. Nada bicara mestilah ${tone}.
5. Berikan rasional teknikal bagi setiap langkah yang dicadangkan.

[STRUKTUR OUTPUT]
- Analisis Profil & Kesesuaian Industri
- Pelan Tindakan Berimpak Tinggi (Step-by-Step)
- Integrasi Visi & Amalan Terbaik (Model: ${idol})
- Checklist Kualiti Akhir

Sila mulakan penjanaan dengan kualiti profesional tertinggi.`;

        promptOutput.textContent = masterPrompt;
    });

    copyBtn.addEventListener('click', () => {
        const text = promptOutput.textContent;
        if (text && !text.includes('Sila lengkapkan')) {
            navigator.clipboard.writeText(text).then(() => {
                alert("Prompt Master telah berjaya disalin!");
            });
        }
    });
});