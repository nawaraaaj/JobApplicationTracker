# JobTracker

Live Demo: https://job-application-tracker-ci-cd.vercel.app/

JobTracker is a personal job application tracking tool built for an individual developer portfolio. It lets a user log job applications, track their status through a pipeline, view status history, and review dashboard analytics. This repository demonstrates a standalone Web API and separate React SPA built with Clean Architecture and CQRS/MediatR, not a monolithic ASP.NET Core MVC portfolio piece.

## Table of Contents

- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Backend Folder Structure](#backend-folder-structure)
- [Frontend Folder Structure](#frontend-folder-structure)
- [Prerequisites](#prerequisites)
- [Setup & Installation](#setup--installation)
- [Running the Project](#running-the-project)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Architecture Decisions](#architecture-decisions)
- [Status / Roadmap](#status--roadmap)
- [License](#license)
- [Contributing](#contributing)

## Key Features

- Job application CRUD for tracking company, role, location, source, work mode, salary, and notes
- Status pipeline tracking with current stage and history/timeline support
- Dashboard analytics and funnel metrics for application counts and status distribution
- JWT authentication for user-specific access
- Per-user data isolation so each account only sees its own records
- Separate backend API and frontend SPA, deployed independently

## Tech Stack

### Backend

- .NET 10
- Clean Architecture with Domain / Application / Infrastructure / WebAPI separation
- CQRS with MediatR 14.2.0
- FluentValidation 12.1.1
- EF Core 9.0.10
- Pomelo.EntityFrameworkCore.MySql 9.0.0
- FluentMigrator 8.0.1 / FluentMigrator.Runner.MySql 8.0.1
- JWT authentication via Microsoft.AspNetCore.Authentication.JwtBearer 10.0.10
- Custom `Result<T>` error handling pattern

### Frontend

- React 19.2.7
- TypeScript 6.0.2
- Vite 8.1.1
- Tailwind CSS v4.3.3
- shadcn/ui integration with `@base-ui/react` 1.6.0
- TanStack Query 5.101.2
- axios 1.18.1
- react-hook-form 7.82.0 + zod 4.4.3
- sonner 2.0.7 for toast notifications
- React Router DOM 7.18.1

## Backend Folder Structure

```text
Application/
  Application.csproj
  ApplicationAssemblyReference.cs
  Common/
    Results/
  Features/
    Auth/
      Commands/
      Queries/
      DTOs/
    JobApplications/
      Commands/
      Queries/
      DTOs/
  Interfaces/
Domain/
  Domain.csproj
  Entities/
  Enums/
Infrastructure/
  Infrastructure.csproj
  Authentication/
  Persistence/
    Migrations/
  Repositories/
  Security/
WebAPI/
  WebAPI.csproj
  Program.cs
  Controllers/

### Dependency Flow

- `Domain` has no external dependencies and contains core entities and enums.
- `Application` depends on `Domain` and defines feature commands, queries, DTOs, validation, and interfaces.
- `Infrastructure` depends on `Application` and `Domain` and implements repository, authentication, data access, and migrations.
- `WebAPI` composes the application and infrastructure layers, registers MediatR, configures JWT, and exposes API controllers.

### Why CQRS / Vertical Slice

The repo uses vertical slices for each feature rather than a generic repository/service layer. This keeps commands, queries, DTOs, and validation grouped by intent, simplifies feature ownership, and avoids unnecessary abstraction layers.

## Frontend Folder Structure

```text
frontend/
  package.json
  tsconfig.json
  vercel.json
  src/
    app/
      App.tsx
      AppLayout.tsx
      providers.tsx
      router.tsx
    pages/
      Auth/
      Dashboard/
      Home/
      NoPage/
    components/
      layout/
      routing/
      ui/
    shared/api/
    lib/
    types/
    assets/
```

### Frontend Structure Notes

- `app/` contains global providers, routing, and layout composition.
- `pages/` holds route-level views, including auth and dashboard content.
- `components/` contains reusable UI and routing helpers.
- `shared/api/` centralizes axios configuration and request handling.
- `lib/` is reserved for utilities, hooks, and app-wide helpers.
- `types/` stores shared TypeScript interfaces.

## Prerequisites

- .NET 10 SDK
- Node.js 18+ (Node 20 is compatible with the current frontend stack)
- MySQL installed locally for the backend database
- No global .NET tools are required for the current repository; FluentMigrator runs on application startup.

## Setup & Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/JobTracker.git
cd JobTracker
```

2. Restore backend dependencies:

```bash
dotnet restore JobTracker.slnx
```

3. Configure backend settings:

- Update `WebAPI/appsettings.Development.json` or use your own environment-specific configuration.
- Do not commit secrets.
- Set `ConnectionStrings:DefaultConnection`, `Jwt:SecretKey`, `Jwt:Issuer`, `Jwt:Audience`, and `Cors:AllowedOrigins`.

4. Run FluentMigrator migrations:

- Migrations are executed automatically when the backend starts.
- Ensure MySQL is running and the configured database is reachable.

5. Start the backend API:

```bash
dotnet run --project WebAPI/WebAPI.csproj
```

6. Install frontend dependencies:

```bash
cd frontend
npm install
```

7. Configure frontend API base URL:

- Create a `.env` file in `frontend/`.
- Set:

```env
VITE_API_URL=http://localhost:5046/api
```

8. Start the frontend development server:

```bash
npm run dev
```

## Running the Project

### Backend

```bash
dotnet run --project WebAPI/WebAPI.csproj
```

The backend will typically listen on:

- `http://localhost:5046`
- `https://localhost:7131`

### Frontend

```bash
cd frontend
npm run dev
```

The frontend Vite app will typically run on:

- `http://localhost:5173`

## Environment Variables

### Backend

- `ConnectionStrings:DefaultConnection`
- `Jwt:SecretKey`
- `Jwt:Issuer`
- `Jwt:Audience`
- `Cors:AllowedOrigins`

### Frontend

- `VITE_API_URL`

Use `WebAPI/appsettings.Development.json` as the reference for backend configuration. Create a `frontend/.env` file for frontend runtime values.

## Deployment

### Frontend

The frontend is deployed on Vercel:

- https://job-application-tracker-ci-cd.vercel.app/

The repo includes `frontend/vercel.json` for SPA rewrite behavior.

### Backend

The backend deploys to Azure App Service using GitHub Actions.

The workflow defined in `.github/workflows/backend-deploy.yml`:

- checks out the repo
- installs .NET 10 SDK
- restores NuGet packages
- builds the solution
- publishes `WebAPI/WebAPI.csproj`
- deploys to Azure App Service app `jobapplicationstracker`

The current repository does not include a separate frontend deployment workflow in `.github/workflows`.

## Architecture Decisions

- `Domain` is intentionally dependency-free and holds entities plus enum definitions.
- `Application` contains feature-specific commands, queries, DTOs, and interfaces.
- `Infrastructure` implements persistence, auth, hashing, and DI wiring.
- `WebAPI` composes the whole backend and exposes API controllers.
- CQRS vertical slices were chosen to keep feature code close together and reduce generic service/repository abstraction.
- `Result<T>` is used for explicit success/failure modeling instead of throwing exceptions for normal control flow.
- `JobApplication.CurrentStatus` is denormalized for cheaper reads, while `StatusHistory` remains the source of truth for the timeline.
- FluentMigrator is used instead of EF migrations to support future stored procedures and analytics-driven migration needs.
- Mapping is handled with explicit DTOs and handlers rather than AutoMapper.

## Status / Roadmap

- Auth flows for register/login are implemented.
- Dashboard page and route layout are implemented.
- Job application domain entities and CQRS scaffolding exist in `Application/Features/JobApplications`.
- `JobApplicationController` is present as a scaffold, but job application endpoints are not yet implemented.
- Several protected frontend routes currently render placeholder pages (`/applications`, `/pipeline`, `/settings`, `/profile`, `/help`).
- No backend test project is included yet.

## License

This project is released under the MIT License. See `LICENSE` for details.

## Contributing

Contributions are welcome. Open an issue or pull request to propose changes, especially for completing the application feature set and adding automated tests.
