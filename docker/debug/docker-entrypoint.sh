#!/bin/sh
set -e
yarn typeorm migration:run
yarn ts-node ./src/scripts/import-quiz.ts
exec "$@"
