#!/bin/bash
set -Eeuo pipefail

COZE_WORKSPACE_PATH="${COZE_WORKSPACE_PATH:-$(pwd)}"
DEFAULT_PORT="${PORT:-5000}"
DEPLOY_RUN_PORT="${DEPLOY_RUN_PORT:-$DEFAULT_PORT}"

find_available_port() {
    local preferred_port="$1"
    node -e '
const net = require("net");

const preferredPort = Number(process.argv[1]);
const maxAttempts = 50;

const tryPort = port => {
  const server = net.createServer();
  server.unref();
  server.on("error", err => {
    if (err.code === "EADDRINUSE" || err.code === "EACCES") {
      if (port >= preferredPort + maxAttempts) {
        console.error(`No available port found between ${preferredPort} and ${preferredPort + maxAttempts}.`);
        process.exit(1);
      }
      tryPort(port + 1);
      return;
    }
    console.error(err);
    process.exit(1);
  });
  server.listen(port, "0.0.0.0", () => {
    const { port: freePort } = server.address();
    server.close(() => {
      process.stdout.write(String(freePort));
    });
  });
};

tryPort(preferredPort);
' "$preferred_port"
}


start_service() {
    cd "${COZE_WORKSPACE_PATH}"
    echo "Starting HTTP service on port ${DEPLOY_RUN_PORT} for deploy..."
    PORT=${DEPLOY_RUN_PORT} node dist/server.js
}

DEPLOY_RUN_PORT="$(find_available_port "${DEPLOY_RUN_PORT}")"

if [[ "${DEPLOY_RUN_PORT}" != "${DEFAULT_PORT}" ]]; then
    echo "Default port ${DEFAULT_PORT} is busy, falling back to ${DEPLOY_RUN_PORT} for deploy."
fi

echo "Starting HTTP service on port ${DEPLOY_RUN_PORT} for deploy..."
start_service
