# UPUP

upup is a web application designed for Ask Me Anything (AMA) sessions with a unique feature allowing users to upvote questions.

## Features

- Upvoting functionality for questions.
- Real-time updates using websockets.
- Pub/Sub with Redis for improved scalability.
- User authentication powered by Next Auth.
- Responsive and stylish UI with Tailwind CSS.
- Monorepo structure powered by Turborepo.

## What's inside?

This Monorepo includes the following packages/apps:

### Apps and Packages

- `web`: A [Next.js](https://nextjs.org/) app. This serves as the frontend of upup.
- `ui`: a stub React component library used by `web` application
- `server`: A Node.js app that uses websockets for establishing connections and broadcasting messages. It also uses Redis for publishing and subscribing to messages reveived. This enables this backend server to be highly scalable.

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Develop

To develop all apps and packages, run the following command:

1. Start an instace of Redis locally (using Docker)

```
docker run -p 6379:6379 redis
```

2. Copy over `.env.local.example` to `.env.local` in apps/web

3. Run all the apps and packages in the project locally

```
pnpm i
pnpm dev
```
