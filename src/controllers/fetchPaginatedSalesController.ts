import { Request, Response } from "express";

import { prisma } from "@configs/prisma";

import { IPaginatedSales } from "@models/sales.model";
import { IPaginationQuery } from "@models/utils.model";

const fetchPaginatedSalesController = async (
  req: Request<{}, {}, {}, IPaginationQuery>,
  res: Response<IPaginatedSales>,
) => {
  const { page, limit } = req.query;

  /* Find sales with page */
  const sales = await prisma.sales.findMany({
    /* Skip over entries before the page */
    skip: (page - 1) * limit,
    /* Take the entries on the page */
    take: limit,
    include: { author: true },
    orderBy: {
      createdAt: "desc",
    },
  });

  /* Get total count of the records */
  const recordCount = await prisma.sales.count();

  if (!sales) return res.status(404).send();

  /* Calculate number of pages */
  const pageCount =
    Math.floor(recordCount / limit) + (recordCount % limit === 0 ? 0 : 1);

  return res.status(200).json({
    data: sales,
    pagination: {
      recordCount: recordCount,
      pageCount: pageCount,
      currentPage: page,
      limit,
    },
  });
};

export default fetchPaginatedSalesController;
