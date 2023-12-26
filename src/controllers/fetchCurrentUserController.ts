import { prisma } from "@configs/prisma";
import { IUser } from "@models/user.model";
import { Request, Response } from "express";

const fetchCurrentUserController = async (req: Request, res: Response) => {
  let user: IUser | null;
  try {
    user = await prisma.user.findUnique({
      where: { id: req.session.userId },
    });
  } catch (e) {
    return res.status(404).send("User not found");
  }

  if (!user) return res.status(404).send("User not found");

  res.send(user);
};

export default fetchCurrentUserController;
