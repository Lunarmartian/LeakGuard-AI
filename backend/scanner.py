import re

def scan_text(content):
    findings = []

    # Email addresses
    emails = re.findall(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        content
    )

    if emails:
        findings.append({
            "type": "Email Address",
            "count": len(emails)
        })

    return findings
