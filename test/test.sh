#!/bin/bash

# Configuration
TEST_FILE="test/tests.html"
PORT=3060
PROFILE_DIR="$PWD/temp-profile"
LOG_FILE="$PROFILE_DIR/chrome.log"
ACTUAL_FILE="$TEST_FILE.actual"
EXPECTED_LOG="test/tests.html.log"

echo "Starting python server on port $PORT..."
python3 -m http.server $PORT -d . &
HTTP_PID=$!

# Wait for server to be ready
while ! curl -s http://127.0.0.1:$PORT > /dev/null; do sleep 1; done;

echo "Running tests in headless Chrome..."
# Ensure fresh profile directory
rm -rf "$PROFILE_DIR"
mkdir -p "$PROFILE_DIR"

google-chrome --headless=new --user-data-dir="$PROFILE_DIR" --enable-logging --v=1 \
  --log-file="$LOG_FILE" --virtual-time-budget=5000 \
  "http://127.0.0.1:$PORT/$TEST_FILE" > /dev/null 2>&1;

echo "Extracting test results..."
touch "$ACTUAL_FILE"
grep -E -o '(❌|✅|🟦).*' "$LOG_FILE" | sed 's/", source:.*//' > "$ACTUAL_FILE"

# Clean up server and profile
kill -9 $HTTP_PID
rm -rf "$PROFILE_DIR"

# Count results
TOTAL=$(wc -l < "$ACTUAL_FILE")
PASS=$(grep -c "✅" "$ACTUAL_FILE" || true)
BLUE=$(grep -c "🟦" "$ACTUAL_FILE" || true)
FAIL=$(grep -c "❌" "$ACTUAL_FILE" || true)

echo "----------------------------------------"
echo "Total tests run: $TOTAL"
echo "Tests different but green: $BLUE"
echo "Tests failed: $FAIL"
echo "----------------------------------------"

if [ "$FAIL" -gt 0 ]; then
  echo "Failed tests:"
  grep "❌" "$ACTUAL_FILE"
  echo "----------------------------------------"
  echo "Tests failed. CI run is red."
  exit 1
else
  echo "All Green!"
  
  # Only backup and update if the log file exists and is different, or if it doesn't exist
  if [ -f "$EXPECTED_LOG" ]; then
    cp "$EXPECTED_LOG" "${EXPECTED_LOG}.backup"
  fi
  cp "$ACTUAL_FILE" "$EXPECTED_LOG"
  echo "Updated $EXPECTED_LOG"
  exit 0
fi
