# Basic Starter Apollo Express Server

A simple Apollo Express Server setup for new projects

### Getting Started

To get started:

1. Clone from this repo and ensure you're using Node v21+
2. Run 'npm i' from a terminal within the app's root directory
3. Create a .env file based on the .env-sample file included
4. The Apollo server can be launched for development by running 'npm run start:dev'
5. With the server running checkout the playground at localhost:4001

### Endpoints

- `/rest/public` (example unauthenticated public REST GET endpoint)
- `/rest/protected` (example authenticated REST GET endpoint, see .env secret and pass in authorization header to mock an authenticated request)
- `/graphql` (Apollo GraphQL server route, access playground in node_env=development setting to explore)

### Express Middlewares

The Express server has custom middlewares which are applied for the benefit of:

- Logging
- Authentication
- Error handling

Various other middlewares are applied for the benefit of security or response compression.

### Contact

Any questions contact chaycarnell@gmail.com
