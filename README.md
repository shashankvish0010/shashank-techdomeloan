## Full stack assignment - Loan App
- I designed and developed the loan web app, whcih enables uers to register/login and request for a loan, Admin can approve the loan, Once the loan is approved the user can repay it with a scheduled repayment within week from the approval date.

## Tech - stack used:
# Frontend:
- Used React + Vite with Typescript - to write type safe code for the web app and its better at production.
- Used TailwindCSS and Google fonts to add styling, design alignment suited with custom fonts.
- Folder structure:
-src
 -assets -> to store images
 -componenets
 -context
 -hooks
 -utils
 -pages

# Backend:
- Used Node and Express with Typescript to create the backend service for the webapp.
- Used production level best practices to write cleaner code, that simplifies understanding it better.
- Folder structure:
- backend
 - controllers -> kept business logic here
 - dist -> output directory for js
 - routes -> kept all the routes here
 - services -> email and date generate services are added to this.
 -src
  -app.ts -> main app.
 -utils -> Essential for error handling.

## How to run:
You can chekout the deployed version as mentioned in the task description;
-Although you just need frontend url to interact/use the webapp.

frontend:
backend: 

#Local setup
-- Setup database within the backend first as per your local pgsql, setup env - like host, port etc. // Or you can just comment this statement in dbconnect.ts -> `    process.env.NODE_ENV === "production" ? proConfig : DatabaseUrl,` and can use ony `proConfig`.

- git clone
- to run backend -> cd backend; npm install; npm run dev;
- to run frontend -> cd frontend; cd techdomeloan; npm install; npm run dev;

Thanks for the opportunity, and I hope the web app meets all the requirements mentioned in the task decription.
