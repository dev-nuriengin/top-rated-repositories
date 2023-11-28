# A Nest JS application to retrieve the top rated repositories

## TODOs:
### Must to have
- [x] Planning
- [x] Setup project
- [x] Generate API
- [x] Postman collection
- [x] Testing
- [x] Dockerising
- [x] Documentation

### Nice to have
- [ ] Provide caching
- [ ] Generate config.ts
- [ ] Error handling and logging strategy
- [ ] Data/Input Validation
- [ ] API documentation: Swagger
- [ ] Code quality setup: Linting, Prettier, git-hooks or husky
- [ ] Security setup: CORS, Rate limit, DDoS attacks.
- [ ] DevOps setup: Different envs.

## Time Consumption (CET)
1. Planning and scaffold: 20:15 - 21:40 
2. Generating the API: 21:40 - 23:30
3. Testing and Dockerising: 23:30 - 00:30
4. Documentation: 00:30 - 00:40

## Guide / Info
1. **Initialization:** Clone the Github repo, go to "https://github.com/dev-nuriengin/top-rated-repositories"
```
# Clone and get into folder
> git@github.com:dev-nuriengin/top-rated-repositories.git & cd top-rated-repositories

# Get the required dependencies
> yarn

# Run these commands to ensure there is no issue on development
> yarn lint & yarn build

# After server started successfully, get the Postman exports and test requests. 
> yarn start:dev

# Optionally "yarn test:watch" can be used.
> yarn test
```

2. Alternatively use the docker to run the application;
```
docker run -p 3000:3000 top_rated_repositories
```

3. **API Documentation:**
Follow the link below to reach out API documentation with sample response for each request.
The project also holds ready-to-use "Postman" exports to make quick requests to endpoints.
- See: https://documenter.getpostman.com/view/31184922/2s9YXo1fBy

## Motivations, Reasons for Decisions
- **Commits:** Development process follows "Conventional Commits" structure.
  - The structure allows aside results such as auto release notes, etc. Thus, I tried to left commits with a proper title, also body as details.
  - See: https://github.com/dev-nuriengin/top-rated-repositories/commits/main
  - See: https://www.conventionalcommits.org/en/v1.0.0/
  - See: https://github.com/conventional-changelog/conventional-changelog

- **Module:** I've decided for a modular structure, which, depending on system design approach, could become a service for frontend communication and such. By doing so, I've separated the entity-based API into its own scope. This separation allows for the potential of later evolving the module into an independent project that can be included through the package.json, fitting into a microservices architecture.

- **Logging and Monitoring:**: The application's life-cycle is key during runtime when end-users are engaged. Business logic can be logged in a set format and sent to tools like KIBANA. This lets developers, project managers, and even clients track the app's progress. Additionally, a global utility can handle logging, and set up Slack notifications or email processes.

- **NestJS Features:**:
  - Interceptors: I use it often to set an unique trace-id to the header, also logging upcoming payload
  - Middleware: I use it often to IP Check process and for Auth, also logging, etc. can be applied.
  - Pipe: It is good for data validation, in this project I gave all responsibility to the "entity" files which are schemas.
  - Guards: I am using with NestJS's "UseGuards" decorator for my own JWT check approach
  - Custom decorators: I am using mostly for additional business logic/features to be encapsulated, like; check if "device-id" exist or generate and save to db, etc.

---
+ Footnotes: 
1. I got help from AI on several steps during development process;
  - Generate test and dockerising, code review, etc. 
2. I forgot to follow Git branch such as `develop`, `test` and generate PR to main. Which is best practice.
3. I skipped adding "Nice to have" TODO items, but i was hoping that you would know the knowledge is there.
  - Meanwhile tried to leave "TODO" comments in code about how to achieve goals.