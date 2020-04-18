#!/bin/sh
set -e
yarn typeorm migration:run
exec "$@"
