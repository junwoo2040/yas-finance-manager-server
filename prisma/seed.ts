import { PrismaClient } from "@prisma/client";
import encrypt from "../src/utils/encrypt";

const prisma = new PrismaClient();

const main = async () => {
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      firstName: "Terryl",
      lastName: "Just",
      email: "admin@gmail.com",
      username: "admin",
      isAdmin: true,
      password: await encrypt("admin", 10),
    },
  });
};

main();
