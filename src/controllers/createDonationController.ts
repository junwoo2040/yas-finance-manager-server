/* /controllers/createDonationController.ts */

/* Imports */
import { Response } from "express";

import { ITypedRequest } from "@utils/types";
import { prisma } from "@configs/prisma";
import { IDonation, ICreateDonationInput } from "@models/donation.model";

const createDonationController = async (
  req: ITypedRequest<ICreateDonationInput>,
  res: Response<IDonation>,
) => {
  /* Create new record */
  try {
    await prisma.donation.create({
      data: { ...req.body, author: { connect: { id: req.session.userId } } },
      include: { author: true },
    });
  } catch (e) {
    return res.status(400).send();
  }

  /* Send new record */
  res.status(200).send();
};

export default createDonationController;
