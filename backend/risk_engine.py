def calculate_risk(findings):
    score = 0

    for item in findings:
        if item["type"] == "Email Address":
            score += item["count"] * 5

        elif item["type"] == "Phone Number":
            score += item["count"] * 10

        elif item["type"] == "AWS Access Key":
            score += item["count"] * 50

    if score >= 50:
        risk = "HIGH"
    elif score >= 20:
        risk = "MEDIUM"
    else:
        risk = "LOW"

    return {
        "score": score,
        "risk": risk
    }
