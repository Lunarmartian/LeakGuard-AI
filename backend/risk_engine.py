SCORE_WEIGHTS = {
    "Email Address": 5,
    "Phone Number": 8,
    "Username": 3,
    "File Name": 2,
    "Domain Name": 5,
    "IP Address": 8,
    "URL / Website": 5,
    "LinkedIn Profile": 5,
    "Bank Account Number": 35,
    "Credit Card Number": 40,
    "Azure Identifier": 30,
    "Password": 45,
    "API Key": 45,
    "JWT Token": 45,
    "AWS Access Key": 50,
    "AWS Secret Key": 60,
    "GitHub Token": 50,
    "Azure Secret": 55,
    "Private Key": 70,
    "SSH Key": 60,
    "Database Connection String": 55,
    "MongoDB Connection": 55,
    "PostgreSQL Connection": 55,
    "MySQL Connection": 55,
    "Docker Secret": 50,
    "Kubernetes Secret": 50,
}

DEFAULT_WEIGHT = 5


def calculate_risk(findings):

    score = 0

    for item in findings:
        weight = SCORE_WEIGHTS.get(item["type"], DEFAULT_WEIGHT)
        score += item["count"] * weight

    if score >= 80:
        risk = "CRITICAL"
    elif score >= 50:
        risk = "HIGH"
    elif score >= 20:
        risk = "MEDIUM"
    else:
        risk = "LOW"

    return {
        "score": score,
        "risk": risk
    }
