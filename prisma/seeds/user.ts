import { PrismaClient } from "@prisma/client";

export async function createInitialUsers(prisma : PrismaClient) {
  await prisma.user.create({
    data: {
      username: "AdminV4",
      password: "$2b$10$O96Efb9eVMV5wENKjuqp7u39fjn4kh7ncd/jrIrcwIY2vST0rXFbq"
    }
  });
}
