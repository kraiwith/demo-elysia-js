import { prismaClient } from '..';

export const createUser = async ({ email, name }: { email: string; name?: string }) => {
  return await prismaClient.user.create({
    data: {
      email,
      name,
    },
  });
};

export const getUsers = async () => {
  return await prismaClient.user.findMany();
};

export const getUserById = async (user_id: number) => {
  return await prismaClient.user.findFirst({ where: { id: user_id } });
};

export const updateUser = async (
  user_id: number,
  { email, name }: { email: string; name?: string }
) => {
  return await prismaClient.user.update({
    where: { id: user_id },
    data: {
      email,
      name,
    },
  });
};
