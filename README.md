First Full Stack (FFS) Project

Een full-stack monorepo-applicatie bestaande uit een Java Spring Boot-backend en een Angular-frontend, georkestreerd via Docker.
Structuur
-FFS_backend/: Spring Boot-applicatie.
-FFS_frontend/: Angular-applicatie.
-docker-compose.yml: Service-orkestratie.

Setup
Omgevingsvariabelen
Navigeer naar FFS_backend/.
-Maak een bestand aan met de naam .env.
-Voeg het volgende toe: JWT_SECRET=jouw_geheime_sleutel_hier

Uitvoeren met Docker

Zorg ervoor dat Docker Desktop actief is. Voer vanuit de root van het project het volgende commando uit:

docker compose up --build
Poorten
-Backend: http://localhost:8080/api
-Frontend: http://localhost:4200/

Admin-account
-E-mail: test@mail.com
-Wachtwoord: test123
