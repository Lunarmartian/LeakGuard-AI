# LeakGuard AI — Backend

FastAPI service that scans text for exposed secrets/PII and scores the risk.

## Run it

```
.venv\Scripts\python.exe -m pip install -r requirements.txt
.venv\Scripts\python.exe run.py
```

`run.py` starts the server with auto-reload (edits to any `.py` file restart it
automatically), binds to `0.0.0.0:8000` so it's reachable from other devices on
your network, and opens the interactive API docs in your browser.

## Interactive docs

While the server is running:

- Swagger UI (try requests live): http://127.0.0.1:8000/docs
- ReDoc (read-only reference): http://127.0.0.1:8000/redoc

## Endpoints

- `GET /` — health check, links to the docs
- `POST /scan` — body `{ "text": "..." }`, returns `findings` (list of
  `{ type, count }`) and `risk` (`{ score, risk }`)

## Making changes

- Detection patterns live in `scanner.py` (`DETECTORS` list — add a
  `(label, compiled_regex)` tuple to add a new type)
- Risk scoring weights live in `risk_engine.py` (`SCORE_WEIGHTS` dict)
- Both are picked up immediately by the auto-reloading server — no restart needed
