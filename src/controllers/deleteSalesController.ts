import { Response } from "express";

import { prisma } from "@configs/prisma";
import { IDeleteSalesInput } from "@models/sales.model";
import { ITypedRequest } from "@utils/types";

const deleteSalesController = async (
  req: ITypedRequest<IDeleteSalesInput>,
  res: Response,
) => {
  const { id } = req.body;

  try {
    await prisma.sales.delete({ where: { id } });
  } catch (e) {
    return res.status(400).send();
  }

  return res.status(204).send();
};

export default deleteSalesController;
