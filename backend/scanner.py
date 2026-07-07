import re

def scan_text(content):
    findings = []

    # Email Addresses
    emails = re.findall(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        content
    )

    if emails:
        findings.append({
            "type": "Email Address",
            "count": len(emails)
        })

    # Phone Numbers (AU/US generic)
    phones = re.findall(
        r"(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{2,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{3,4}",
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

    # GitHub Personal Access Tokens
    github_tokens = re.findall(
        r"gh[pousr]_[A-Za-z0-9]{36,}",
        content
    )

    if github_tokens:
        findings.append({
            "type": "GitHub Token",
            "count": len(github_tokens)
        })

    # Azure Client IDs (GUID pattern)
    azure_ids = re.findall(
        r"\b[0-9a-fA-F]{8}-"
        r"[0-9a-fA-F]{4}-"
        r"[0-9a-fA-F]{4}-"
        r"[0-9a-fA-F]{4}-"
        r"[0-9a-fA-F]{12}\b",
        content
    )

    if azure_ids:
        findings.append({
            "type": "Azure Identifier",
            "count": len(azure_ids)
        })

    # Credit Cards
    credit_cards = re.findall(
        r"\b(?:\d[ -]*?){13,16}\b",
        content
    )

    if credit_cards:
        findings.append({
            "type": "Credit Card Number",
            "count": len(credit_cards)
        })

    return findings
