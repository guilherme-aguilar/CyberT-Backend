import { PrismaClient } from "@prisma/client";

export async function createInitialUsers(prisma : PrismaClient) {
  await prisma.user.create({
    data: {
      username: "AdminV4",
      password: "$2b$10$nOwyXCELfByrFpEF4g39XOks2AjCEuE2oCxLDoD7FP6zuYOmMl/w2"
    }
  });
}
