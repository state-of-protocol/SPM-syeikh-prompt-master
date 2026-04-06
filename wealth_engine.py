import os
import time
import requests
import json
import google.generativeai as genai

# --- CONFIGURATION ---
API_KEY = os.getenv("GOOGLE_API_KEY") 
genai.configure(api_key=API_KEY)

# URL Data Raw dari GitHub Syeikh
DATA_URL = "https://raw.githubusercontent.com/state-of-protocol/SPM-syeikh-prompt-master/main/data/cctv_leads.json"

MASTER_PROMPT = """
ROLE: Autonomous Wealth Engine & Economic Sentinel (SPM-v1).
OBJECTIVE: Menjana $250 USD sehari melalui produk digital/SaaS.
CORE LOGIC (Economic Sentinel Logic):
1. Formula: Daily Revenue = (N x P x CR).
2. Priority Niche: AI Security (CCTV) for Schools.
3. Target: SMK Banting (High Potential) & SRH Cyberjaya.
4. Strategy: Gunakan 'Pain-Point Targeted Outreach' (PPTO).
STRICT RULE: Minimalist, Data-Driven, dan Fokus pada Monetization.
"""

def get_economic_context():
    try:
        # Sedut Data Leads secara Real-Time dari GitHub
        response = requests.get(DATA_URL, timeout=10)
        leads_data = response.json()
        return f"\n[CURRENT_DATA_SYNC]:\n{json.dumps(leads_data, indent=2)}"
    except Exception as e:
        return f"\n[OFFLINE_MODE]: Gagal sync data ({e}). Menggunakan logic $250/day standard."

def spm_wealth_engine():
    print("\n" + "="*60)
    print("🕋 SPM WEALTH SENTINEL v2.9 - DATA-DRIVEN MODE")
    print("="*60)
    
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    while True:
        # Sync data sebelum setiap arahan
        context = get_economic_context()
        print(f"\n📡 [SPM] Data Synced: {len(context)} bytes")
        
        user_input = input("Syeikh (Arahan Strategi): ")
        if user_input.lower() in ['exit', 'quit']: break
        
        try:
            full_prompt = f"{MASTER_PROMPT}\n{context}\n\nUSER COMMAND: {user_input}\n\nPROSES SEKARANG:"
            
            response = model.generate_content(full_prompt)
            print("\n" + "-"*50)
            print(f"🤖 SPM SENTINEL REPORT:\n{response.text}")
            print("-"*50)
            
        except Exception as e:
            print(f"❌ Ralat: {e}")

if __name__ == "__main__":
    spm_wealth_engine()