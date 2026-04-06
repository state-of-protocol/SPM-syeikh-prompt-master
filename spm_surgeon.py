import os
import shutil
import subprocess
import ctypes
import datetime
import sys

class SPMSurgeon:
    def __init__(self):
        self.report_content = []
        self.trash_paths = [
            os.environ.get('TEMP'),
            r'C:\Windows\Temp',
            r'C:\Windows\Prefetch',
            r'C:\Windows\SoftwareDistribution\Download'
        ]

    def is_admin(self):
        try:
            return ctypes.windll.shell32.IsUserAnAdmin()
        except:
            return False

    def log(self, message):
        print(f"[SPM] {message}")
        self.report_content.append(message)

    def clear_trash(self):
        self.log("🧹 Memulakan Pembersihan Digital (Janitor Module)...")
        bytes_deleted = 0
        for path in self.trash_paths:
            if os.path.exists(path):
                self.log(f"Cleaning: {path}")
                shutil.rmtree(path, ignore_errors=True)
        self.log("✅ Sampah Digital telah dibersihkan.")

    def system_tune(self):
        self.log("⚡ Menjalankan Performance Tuner...")
        # Flush DNS
        subprocess.run(["ipconfig", "/flushdns"], shell=True, capture_output=True)
        # Optimize SSD / Defrag HDD
        subprocess.run(["defrag", "C:", "/O"], shell=True, capture_output=True)
        self.log("✅ Rangkaian & Disk telah di-refresh.")

    def get_hardware_status(self):
        self.log("🔍 Menjalankan Diagnostic Sentinel...")
        try:
            # BIOS Age
            bios_raw = subprocess.check_output("wmic bios get releasedate", shell=True).decode().split('\n')[1].strip()
            year = int(bios_raw[:4])
            age = datetime.datetime.now().year - year
            
            # Disk Health
            disk_status = subprocess.check_output("wmic diskdrive get status", shell=True).decode().split('\n')[1].strip()
            
            self.log(f"--- LAPORAN HARDWARE ---")
            self.log(f"Status Disk: {disk_status}")
            self.log(f"Usia Sistem: {age} Tahun")
            
            if age > 5:
                self.log("⚠️ STATUS: KRITIKAL. Cadangan: Tukar Hardware Baru.")
            elif age > 3:
                self.log("ℹ️ STATUS: MODERATE. Cadangan: Upgrade RAM/SSD.")
            else:
                self.log("✅ STATUS: CEMERLANG.")
        except:
            self.log("❌ Gagal mendapatkan data hardware.")

    def generate_report(self):
        report_file = "SPM_SURGEON_REPORT.txt"
        with open(report_file, "w") as f:
            f.write("\n".join(self.report_content))
        self.log(f"📄 Report Professional dijana: {report_file}")

if __name__ == "__main__":
    surgeon = SPMSurgeon()
    
    print("\n" + "="*50)
    print("🕋 SPM PC-SURGEON & SENTINEL v1.0")
    print("Professional PC Optimization & Diagnostic System")
    print("="*50 + "\n")

    if not surgeon.is_admin():
        print("❌ ERROR: Sila jalankan PowerShell sebagai Administrator!")
        sys.exit()

    surgeon.clear_trash()
    surgeon.system_tune()
    surgeon.get_hardware_status()
    surgeon.generate_report()
    
    print("\n🚀 PC anda kini kembali 'Ganas'! Sila semak report untuk tindakan lanjut.")
    print("Target Nilai Servis: $250.00 USD / Milestone\n")