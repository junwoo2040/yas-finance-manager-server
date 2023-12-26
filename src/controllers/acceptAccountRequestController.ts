import { prisma } from "@configs/prisma";
import {
  IAcceptAccountRequestInput,
  IAccountRequest,
} from "@models/user.model";
import { ITypedRequest } from "@utils/types";
import { Response } from "express";

const acceptAccountRequestController = async (
  req: ITypedRequest<IAcceptAccountRequestInput>,
  res: Response,
) => {
  let accountRequest: IAccountRequest | null;
  try {
    accountRequest = await prisma.accountRequest.findUnique({
      where: { id: req.body.id },
    });
  } catch (e) {
    return res.status(404).send();
  }

  if (!accountRequest) return res.status(404).send();

  const { id, createdAt, ...user } = accountRequest;

  await prisma.user.create({ data: { ...user } });
  await prisma.accountRequest.delete({ where: { id } });

  return res.status(200).send();
};

export default acceptAccountRequestController;
