@echo off
title SPM PC-SURGEON v1.0 | State of Protocol
color 0a
echo --------------------------------------------------
echo [SPM] MEMULAKAN SERVIS PC PROFESSIONAL...
echo --------------------------------------------------
:: Check for Admin
net session >nul 2>&1
if %errorLevel% == 0 (
    echo [SPM] Menjalankan Ibu Fail Python...
    python spm_surgeon.py
) else (
    echo [ERROR] Sila "Right Click" dan "Run as Administrator"!
    echo Sila hubungi Syeikh jika ralat berterusan.
)
echo.
echo --------------------------------------------------
echo [SPM] SERVIS SELESAI. SILA SEMAK SPM_REPORT.txt
echo --------------------------------------------------
pause