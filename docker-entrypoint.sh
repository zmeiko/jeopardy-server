#!/bin/sh
set -e
echo "Run migrations"
./node_modules/.bin/typeorm migration:run
echo "Import quizzes"
node ./scripts/import-quiz.js
exec "$@"
