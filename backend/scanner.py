import re

DETECTORS = [
    ("Email Address", re.compile(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
    )),
    ("Phone Number", re.compile(
        r"(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{2,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{3,4}"
    )),
    ("AWS Access Key", re.compile(
        r"AKIA[0-9A-Z]{16}"
    )),
    ("AWS Secret Key", re.compile(
        r"(?i)aws_secret_access_key\s*[:=]\s*['\"]?[A-Za-z0-9/+=]{40}['\"]?"
    )),
    ("GitHub Token", re.compile(
        r"gh[pousr]_[A-Za-z0-9]{36,}"
    )),
    ("Azure Identifier", re.compile(
        r"\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\b"
    )),
    ("Azure Secret", re.compile(
        r"(?i)(?:azure_client_secret|client_secret)\s*[:=]\s*['\"]?[A-Za-z0-9\-_.~]{34,}['\"]?"
    )),
    ("Credit Card Number", re.compile(
        r"\b(?:\d[ -]*?){13,16}\b"
    )),
    ("Bank Account Number", re.compile(
        r"(?i)account[_ ]?(?:no|number)?\s*[:=]\s*\d{8,17}"
    )),
    ("IP Address", re.compile(
        r"\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)\b"
    )),
    ("Domain Name", re.compile(
        r"\b(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+"
        r"(?:com|net|org|io|ai|gov|edu|co|dev|app|info|biz)\b"
    )),
    ("URL / Website", re.compile(
        r"https?://[^\s\"'<>]+"
    )),
    ("Password", re.compile(
        r"(?i)(?:password|passwd|pwd)\s*[:=]\s*\S{4,}"
    )),
    ("API Key", re.compile(
        r"(?i)api[_-]?key\s*[:=]\s*['\"]?[A-Za-z0-9\-_]{16,}['\"]?"
    )),
    ("JWT Token", re.compile(
        r"eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+"
    )),
    ("Private Key", re.compile(
        r"-----BEGIN (?:RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----"
    )),
    ("SSH Key", re.compile(
        r"ssh-(?:rsa|ed25519|dss|ecdsa[a-z0-9-]*)\s+[A-Za-z0-9+/]+={0,3}"
    )),
    ("MongoDB Connection", re.compile(
        r"mongodb(?:\+srv)?://[^\s\"'<>]+"
    )),
    ("PostgreSQL Connection", re.compile(
        r"postgres(?:ql)?://[^\s\"'<>]+"
    )),
    ("MySQL Connection", re.compile(
        r"mysql://[^\s\"'<>]+"
    )),
    ("Database Connection String", re.compile(
        r"(?<![\w+])(?!mongodb|postgres|mysql)\w+://[^\s:@/'\"<>]+:[^\s@'\"<>]+@[^\s/'\"<>]+"
    )),
    ("Docker Secret", re.compile(
        r"(?i)docker[_-]?(?:secret|password)\s*[:=]\s*\S+"
    )),
    ("Kubernetes Secret", re.compile(
        r"(?i)kind:\s*Secret|kubernetes\.io/[a-z\-]+"
    )),
    ("LinkedIn Profile", re.compile(
        r"https?://(?:www\.)?linkedin\.com/in/[A-Za-z0-9\-_%]+"
    )),
    ("Username", re.compile(
        r"(?i)(?:username|user_name|login)\s*[:=]\s*[A-Za-z0-9_.\-]{3,}"
    )),
    ("File Name", re.compile(
        r"\b[\w,\s-]+\.(?:txt|csv|pdf|docx?|xlsx?|pem|key|env|json|ya?ml|log|sql|zip|jpe?g|png|gif)\b"
    )),
]


def scan_text(content):
    findings = []

    for label, pattern in DETECTORS:
        matches = pattern.findall(content)
        if matches:
            findings.append({
                "type": label,
                "count": len(matches)
            })

    return findings
