# Tech Chapter interns coding challenge

## Overview

This project implements the features requested in the TechChapter interns challenge

### Usage

#### Running in docker

- Create an .env file at the root directory (same place as the docker-compose.yml file)

```bash
touch .env
```

- Set env variables

```
VITE_SALLING_GROUP_API_TOKEN=<API_TOKEN>
VITE_SALLING_GROUP_API_URL=http://localhost:8080/api
```

- Run the container

```bash
docker compose up -d
```

- The frontend is available on port `80` and the backend at port `8080`

#### Backend

- Navigate to the backend directory

```bash
cd backend
```

- Provide the url and api token as shown in .env.sample file.
- Set the env variables

```bash
source set-env.sh .env
```

- Run tests

```bash
dotnet test
```

#### Frontend

- Navigate to the frontend directory

```bash
cd frontend
```

- Create a .env file and add the url and api token as shown in .env.sample file.
- Install depedencies

```bash
npm i
```

- Run the application

```bash
npm run dev
```
