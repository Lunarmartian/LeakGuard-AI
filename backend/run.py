import threading
import webbrowser

import uvicorn

HOST = "0.0.0.0"
PORT = 8000
DOCS_URL = f"http://127.0.0.1:{PORT}/docs"


def open_docs():
    webbrowser.open(DOCS_URL)


if __name__ == "__main__":
    threading.Timer(1.5, open_docs).start()
    uvicorn.run("app:app", host=HOST, port=PORT, reload=True)
