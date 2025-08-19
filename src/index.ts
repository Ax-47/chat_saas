import { Elysia } from 'elysia'

import { swagger } from '@elysiajs/swagger'
import 'reflect-metadata';
import { HelloWorldController } from './controllers/hello_world';
import { PromptController } from './controllers/chat';

const app = new Elysia({ prefix: '/api' })
  .use(
    swagger({
      documentation: {
        tags: [
          { name: 'Hello', description: 'testing' },
        ]
      }
    })
  )
  .group("", app => app.use(HelloWorldController))
  .group("/chat", (app) => app.use(PromptController))
  .listen(42069)
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
