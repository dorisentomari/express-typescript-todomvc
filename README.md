# express-typescript-todomvc

使用 express + typescript 做一个 todomvc 的项目，主要目的是学习使用 express + typescript 做一个前端项目。

Use express and typescript to make a todomvc project, the main purpose is to learn to use express and typescript to make a front-end project.

[前端服务仓库 express-typescript-todomvc ](https://github.com/dawnight/react-typescript-todomvc) 

[frontend server repo express-typescript-todomvc ](https://github.com/dawnight/react-typescript-todomvc) 

# 技术栈(Technology stack)
+ typescript
+ express
+ jsonwebtoken
+ bcrypt
+ class-validator
+ mongoose
+ winston

# 项目启动(Project Start)

```
npm run build-ts  // compile ts file to js

npm run start
```

# 文件目录(File Directory)

```
├── package.json
├── README.md
├── src
│   ├── app.ts
│   ├── constant.ts
│   ├── db
│   │   ├── index.ts
│   │   └── schemas
│   │       ├── common.ts
│   │       ├── todos.ts
│   │       └── user.ts
│   ├── forms
│   │   ├── account.ts
│   │   └── todos.ts
│   ├── helper
│   │   ├── random.ts
│   │   └── time.ts
│   ├── middlewares
│   │   ├── auth.ts
│   │   ├── safeFields.ts
│   │   ├── validator.ts
│   │   └── wiston.ts
│   ├── routes
│   │   ├── account.ts
│   │   ├── home.ts
│   │   ├── index.ts
│   │   └── todos.ts
│   ├── service
│   │   ├── account.ts
│   │   └── todos.ts
│   └── types
│       ├── account.ts
│       └── todos.ts
├── tsconfig.json
└── yarn.lock
```
