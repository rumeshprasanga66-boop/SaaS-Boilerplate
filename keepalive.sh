#!/usr/bin/env bash
# Keep frontend (12000) + backend (12001) alive. Restarts them if they die.
FRONTEND_DIR="/workspace/SaaS-Boilerplate"
BACKEND_DIR="/workspace/SaaS-Boilerplate/backend"

while true; do
  # Frontend
  if ! curl -s -m 5 -o /dev/null http://localhost:12000/; then
    echo "[keepalive] frontend down — restarting $(date)"
    pkill -f "next start" 2>/dev/null
    (cd "$FRONTEND_DIR" && PORT=12000 npm start >> /tmp/next-prod.log 2>&1 &)
  fi

  # Backend
  if ! curl -s -m 5 -o /dev/null http://localhost:12001/health; then
    echo "[keepalive] backend down — restarting $(date)"
    pkill -f "uvicorn vidstack.main" 2>/dev/null
    (cd "$BACKEND_DIR" && VIDSTACK_PUBLIC_URL=https://work-2-ezkcvdzuqgiedaow.prod-runtime.all-hands.dev .venv/bin/uvicorn vidstack.main:app --host 0.0.0.0 --port 12001 >> /tmp/backend.log 2>&1 &)
  fi

  sleep 15
done
