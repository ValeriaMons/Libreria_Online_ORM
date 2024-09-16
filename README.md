SISTEMA DI GESTIONE LIBRERIA ONLINE

Questo progetto implemenmta un sistema di gestione per una libreria online, permettendo agli utenti di visualizzare,
aggiungere, modificare e rimuovere libri dal catalogo.

TECNOLOGIE UTILIZZATE

Backend

- Node.js
- Express.js
- TypeScript
- SQL (per il database)

Frontend

- React
- TypeScript
- HTML
- CSS


FUNZIONALITA'

- Visualizzazione del catalogo libri
- Aggiunta di nuovi libri
- Modifica delle informazioni dei libri esistenti
- Rimozione di libri dal catalogo


INSTALLAZIONE

Clona il repository:
    Copygit clone https://github.com/tuousername/library-management-system.git

Installa le dipendenze per il backend:
    Copycd backend
    npm install

Installa le dipendenze per il frontend:
    Copycd ../frontend
    npm install

Configura il database:

-  Crea un database SQL
-  Aggiorna le credenziali del database nel file di configurazione del backend



AVVIO DELL'APPLICAZIONE

Avvia il server backend:
    Copycd backend
    npm run start

In un altro terminale, avvia l'applicazione frontend:
    Copycd frontend
    npm start


STRUTTURA DEL PROGETTO

Libreria_Online
|
|__backend/
|   |__dist/
|   |__config/
|   |   |   |__db.js
|   |   |__controllers/
|   |   |    |__bookshopControllers.js
|   |   |middleware/
|   |   |   |__errorHandler.js
|   |   |__models/
|   |   |    |_books.js
|   |   |__routes/
|   |   |   |__routes.js
|   |   |__services/
|   |       |__bookShopServices.js
|   |
|   |__src/
|   |   |__config/
|   |   |   |__db.ts
|   |   |__controllers/
|   |   |    |__bookshopControllers.ts
|   |   |middleware/
|   |   |   |__errorHandler.ts
|   |   |__models/
|   |   |    |_books.ts
|   |   |__routes/
|   |   |   |__routes.ts
|   |   |__services/
|   |       |__bookShopServices.ts
|   |
|   |__server.ts
|   |__package-lock.json
|   |__package.json
|   |__tsconfig.json
|
|__frontend/
    |
    |__src/
    |   |__components/
    |   |   |__BookList.tsx
    |   |   |__BookList.css
    |   |__services/
    |       |__api.tsx
    |   
    |__App.css
    |   
    |__App.tsx
    |   
    |__index.css
    |
    |__index.tsx
    |
    |__package-lock.json
    |
    |__package.json

   