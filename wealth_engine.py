import os
import time
import google.generativeai as genai

# --- CONFIGURATION ---
# Pastikan anda set API KEY dalam persekitaran (Environment Variable)
# atau masukkan secara manual di sini jika perlu.
API_KEY = os.getenv("GOOGLE_API_KEY") 
genai.configure(api_key=API_KEY)

# --- THE MASTER PROMPT (SYSTEM INSTRUCTION) ---
MASTER_PROMPT = """
ROLE: Autonomous Wealth Engine & Economic Sentinel (SPM-v1).
OBJECTIVE: Menjana $250 USD sehari melalui produk digital/SaaS.
CORE LOGIC:
1. SENSE OF ECONOMICS: Analisis trend pasaran real-time (Arbitrage, Demand, Supply).
2. FALLBACK SYSTEM: Jika satu niche gagal, automatik beralih ke niche digital seterusnya.
3. VALUATION: Kira potensi USD berdasarkan (Volume x Conversion Rate).
4. OUTPUT: Berikan (A) Trend Terkini, (B) Blueprint Produk, (C) Estimasi Masa untuk Capai $250.
STRICT RULE: Minimalist, Professional, dan Fokus pada Monetization.
"""

def spm_wealth_engine():
    print("\n" + "="*60)
    print("🕋 SPM WEALTH ENGINE (Target: $250/Day) - STATE OF PROTOCOL")
    print("="*60)
    
    target_usd = 250
    current_earnings = 0 
    
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    while True:
        print(f"\n[STATUS]: ${current_earnings} / ${target_usd} USD")
        user_input = input("Syeikh (Arahan/Idea/Status): ")
        
        if user_input.lower() in ['exit', 'quit']: 
            print("Sentinel Offline. Strategi disimpan.")
            break
        
        try:
            full_prompt = f"{MASTER_PROMPT}\n\nUSER COMMAND: {user_input}\n\nPROSES SEKARANG:"
            
            response = model.generate_content(full_prompt)
            
            output = response.text
            print("\n" + "-"*50)
            print(f"🤖 SPM SENTINEL REPORT:\n")
            print(output)
            print("-"*50)
            
        except Exception as e:
            err = str(e)
            if "429" in err:
                print("⚠️ [Quota 429]: Sistem sesak. Rehat 60 saat...")
                time.sleep(60)
            else:
                print(f"❌ Ralat: {e}")

if __name__ == "__main__":
    spm_wealth_engine()