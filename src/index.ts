import { Elysia, t } from 'elysia';
import { swagger } from '@elysiajs/swagger';

import { PrismaClient } from '@prisma/client';

import { createUser, getUserById, getUsers, updateUser } from './controllers/user.controller';

const app = new Elysia();

export const prismaClient = new PrismaClient();

const userCount = await prismaClient.user.count();
console.log(`✨ ~ userCount:`, userCount);

app.use(swagger());

app.post(
  '/user',
  ({ body }) => {
    return createUser(body);
  },
  {
    body: t.Object({
      email: t.String({
        format: 'email',
      }),
      name: t.Optional(t.String()),
    }),
    detail: {
      tags: ['users'],
    },
  }
);

app.get(
  '/users',
  () => {
    return getUsers();
  },
  {
    detail: {
      tags: ['users'],
    },
  }
);

app.get(
  '/user/:user_id',
  ({ params: { user_id } }) => {
    return getUserById(user_id);
  },
  {
    params: t.Object({
      user_id: t.Number(),
    }),
    detail: {
      tags: ['users'],
    },
  }
);

app.put(
  '/user/:user_id',
  ({ params: { user_id }, body }) => {
    return updateUser(user_id, body);
  },
  {
    params: t.Object({
      user_id: t.Number(),
    }),
    body: t.Object({
      email: t.String({
        format: 'email',
      }),
      name: t.Optional(t.String()),
    }),
    detail: {
      tags: ['users'],
    },
  }
);

app.listen(Bun.env.PORT || 3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
