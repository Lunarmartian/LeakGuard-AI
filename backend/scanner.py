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

    # Phone numbers
    phones = re.findall(
        r"\b(?:\+?\d{1,3})?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b",
        content
    )

    if phones:
        findings.append({
            "type": "Phone Number",
            "count": len(phones)
        })

    # AWS Access Keys
    aws_keys = re.findall(
        r"AKIA[0-9A-Z]{16}",
        content
    )

    if aws_keys:
        findings.append({
            "type": "AWS Access Key",
            "count": len(aws_keys)
        })

    return findings
