import { prisma } from "@configs/prisma";
import { IDenyAccountRequestInput } from "@models/user.model";
import { ITypedRequest } from "@utils/types";
import { Response } from "express";

const denyAccountRequestController = async (
  req: ITypedRequest<IDenyAccountRequestInput>,
  res: Response,
) => {
  try {
    await prisma.accountRequest.delete({
      where: { id: req.body.id },
    });
  } catch (e) {
    return res.status(404).send();
  }

  return res.status(200).send();
};

export default denyAccountRequestController;
