#!/bin/sh

# Wait for PostgreSQL to be ready
until nc -z -v -w30 postgres 5432
do
  echo "Waiting for PostgreSQL to be ready..."
  sleep 5
done

# Run migrations and seeders
npm run db:migrate:seed

# Start your application
exec "$@"
