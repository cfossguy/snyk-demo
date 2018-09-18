#!/usr/bin/env bash
set -e
export BACKEND_BANKING_LEGACY_URL=http://localhost:8080/backend-banking-legacy

cd ./backend-banking/
./mvnw clean package -Dskip.tests=true

cd ../backend-banking-legacy/
mvn clean package -Dskip.tests=true

cd ../backend-investments/
./mvnw clean package -Dskip.tests=true

cd ../backend-linesofcredit
./mvnw clean package -Dskip.tests=true

cd ../web-gui
npm run build

cd ..

cf push