import { Response } from "express";

import { ITypedRequest } from "@utils/types";
import { prisma } from "@configs/prisma";
import { ISales, ICreateSalesInput } from "@models/sales.model";

const createSalesController = async (
  req: ITypedRequest<ICreateSalesInput>,
  res: Response<ISales>,
) => {
  try {
    await prisma.sales.create({
      data: { ...req.body, author: { connect: { id: req.session.userId } } },
      include: { author: true },
    });
  } catch (e) {
    return res.status(400).send();
  }

  res.status(200).send();
};

export default createSalesController;
