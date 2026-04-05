document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const copyBtn = document.getElementById('copyBtn');
    const promptOutput = document.getElementById('promptOutput');

    generateBtn.addEventListener('click', () => {
        const role = document.getElementById('role').value.trim() || "Pakar Profesional";
        const task = document.getElementById('task').value.trim();
        const format = document.getElementById('format').value;
        const tone = document.getElementById('tone').value;

        if (!task) {
            alert("Sila masukkan tugasan utama!");
            return;
        }

        const masterPrompt = `[IDENTITI]
Bertindak sebagai seorang ${role}. Anda dikenali dengan hasil kerja yang tepat, berimpak tinggi, dan profesional.

[TUGASAN]
Tugas anda adalah untuk: ${task}

[ARAHAN KHUSUS]
1. Sila berikan jawapan dalam format: ${format}.
2. Gunakan nada bicara yang ${tone}.
3. Pecahkan penyelesaian kepada langkah-langkah yang logik jika perlu.
4. Terangkan rasional (mengapa) bagi setiap cadangan atau tindakan yang diambil.
5. Pastikan output sedia untuk digunakan tanpa perlu penyuntingan besar.

[STRUKTUR JAWAPAN]
- Mukadimah Strategik
- Pelaksanaan (Step-by-Step / Analisis)
- Tips Pakar & Amalan Terbaik
- Checklist Semakan Kualiti

Sila mulakan sekarang dengan pendekatan yang paling sistematik.`;

        promptOutput.textContent = masterPrompt;
    });

    copyBtn.addEventListener('click', () => {
        const text = promptOutput.textContent;
        if (text && !text.includes('Sila lengkapkan')) {
            navigator.clipboard.writeText(text).then(() => {
                alert("Prompt telah disalin ke clipboard!");
            });
        }
    });
});