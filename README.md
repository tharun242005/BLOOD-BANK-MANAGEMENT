# 🩸 **Blood Bank Management Project**

## Overview

This repository hosts the **Blood Bank Management Project**, a web application for managing blood donors and donations. The frontend is built with modern web technologies, and the backend uses a PostgreSQL database via Supabase. A live demo of the project is available at [https://blood--bank-management.web.app/](https://blood--bank-management.web.app/). The app’s data model (including tables like `donor`) is defined in SQL, with an ER diagram provided in **ER-DIAGRAM.png**.

## Tech Stack

### Frontend

&#x20;The frontend is built with **React** (a JavaScript library for building UIs) and **TypeScript** (a typed superset of JavaScript) for robust development. We use **Vite** as the build tool, which provides a fast development experience. UI components are styled with **shadcn/ui** (an open-source set of React components), and the output is a static site ready for deployment.

&#x20;For styling and layout, the project uses **Tailwind CSS**, a utility-first CSS framework. Tailwind’s pre-built utility classes (e.g. `flex`, `pt-4`, `text-center`) allow building custom designs without writing raw CSS. Combined with shadcn/ui components, this enables rapid UI development and consistent styling.

### Backend

The backend is powered by **Supabase** (the open-source Firebase alternative) under our organization `tharun242005`. Supabase provides a dedicated **PostgreSQL** database for each project. We interact with the data via SQL: tables (like our `donor` table) and relationships are defined using SQL, and managed through Supabase’s built-in SQL editor. The finished frontend is deployed to **Firebase Hosting**, which supports publishing static sites (such as React/Vite apps) with a single command.

#### Languages

| Language   | Role                                        |
| ---------- | ------------------------------------------- |
| TypeScript | Frontend application code (React)           |
| JavaScript | Core logic & tools (used in React/Supabase) |
| SQL        | Database schema and queries (PostgreSQL)    |
| HTML       | Markup (frontend structure)                 |
| CSS        | Styling (via Tailwind CSS utility classes)  |

## Getting Started

**Prerequisites:** You need **Node.js** and **npm** installed. (Node.js is a free, open-source, cross-platform JavaScript runtime, and npm is its default package manager.) Then clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/blood-bank-management.git
cd blood-bank-management
npm install
npm run dev
```

This will start the development server (usually at `http://localhost:5173`) for the Vite/React app.

## Deployment & Supabase Integration

The app is deployed on **Firebase Hosting**. Firebase allows deploying React/Vite static sites with one command (e.g. `firebase deploy`), delivering fast, SSL-secured content globally. On the backend, we leverage our Supabase project under the `tharun242005` organization. Supabase gives us a PostgreSQL database (allowing full SQL access) and a SQL editor for creating tables and queries. For example, our data schema includes a `donor` table defined via SQL, and the relationships are visualized in **ER-DIAGRAM.png**. Credits go to Supabase for the backend infrastructure and to our Supabase organization (`tharun242005`) for providing the database backend.

## Credits

* **Supabase** – Open-source Firebase alternative (PostgreSQL database); used for the backend (organization: `tharun242005`).
* **shadcn/ui** – Free, open-source React component library used for UI components.
* **React, Vite, Tailwind CSS, Firebase**, and other open-source tools – Used extensively for frontend development and deployment.
