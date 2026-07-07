from scanner import scan_text
from risk_engine import calculate_risk

sample = """
john@example.com
admin@company.com

AKIA1234567890ABCDEF
"""

findings = scan_text(sample)

risk = calculate_risk(findings)

print("Findings:", findings)
print("Risk:", risk)
