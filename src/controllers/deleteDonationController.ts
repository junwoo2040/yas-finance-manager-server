import { Response } from "express";

import { prisma } from "@configs/prisma";
import { IDeleteDonationInput } from "@models/donation.model";
import { ITypedRequest } from "@utils/types";

const deleteDonationController = async (
  req: ITypedRequest<IDeleteDonationInput>,
  res: Response,
) => {
  const { id } = req.body;

  try {
    await prisma.donation.delete({ where: { id } });
  } catch (e) {
    return res.status(400).send();
  }

  return res.status(204).send();
};

export default deleteDonationController;
