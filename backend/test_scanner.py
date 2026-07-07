from scanner import scan_text
from risk_engine import calculate_risk

sample = """
john@example.com
admin@company.com

+61 412 345 678

AKIA1234567890ABCDEF

ghp_abcdefghijklmnopqrstuvwxyz1234567890ABC

12345678-1234-1234-1234-123456789abc

4111 1111 1111 1111
"""

findings = scan_text(sample)

risk = calculate_risk(findings)

print("Findings:", findings)
print("Risk:", risk)

