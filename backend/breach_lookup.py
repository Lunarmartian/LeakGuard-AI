import os

import httpx
from dotenv import load_dotenv

load_dotenv()

HIBP_API_KEY = os.getenv("HIBP_API_KEY")
HIBP_BASE_URL = "https://haveibeenpwned.com/api/v3"
USER_AGENT = "LeakGuard-AI"


class BreachLookupError(Exception):
    def __init__(self, message, status_code=502):
        super().__init__(message)
        self.status_code = status_code


def check_email_breaches(email):
    if not HIBP_API_KEY:
        raise BreachLookupError(
            "HIBP_API_KEY is not configured on the server.", status_code=500
        )

    response = httpx.get(
        f"{HIBP_BASE_URL}/breachedaccount/{email}",
        headers={
            "hibp-api-key": HIBP_API_KEY,
            "user-agent": USER_AGENT,
        },
        params={"truncateResponse": "false"},
        timeout=10.0,
    )

    if response.status_code == 404:
        return []

    if response.status_code == 401:
        raise BreachLookupError("Invalid HIBP API key.", status_code=401)

    if response.status_code == 429:
        raise BreachLookupError(
            "Rate limited by Have I Been Pwned. Try again shortly.",
            status_code=429,
        )

    response.raise_for_status()

    return [
        {
            "name": breach.get("Name"),
            "title": breach.get("Title"),
            "domain": breach.get("Domain"),
            "breachDate": breach.get("BreachDate"),
            "dataClasses": breach.get("DataClasses", []),
            "isVerified": breach.get("IsVerified", False),
            "isSensitive": breach.get("IsSensitive", False),
        }
        for breach in response.json()
    ]
