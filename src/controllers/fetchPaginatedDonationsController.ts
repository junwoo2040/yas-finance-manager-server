import { Request, Response } from "express";

import { prisma } from "@configs/prisma";

import { IPaginatedDonations } from "@models/donation.model";
import { IPaginationQuery } from "@models/utils.model";

const fetchPaginatedDonationsController = async (
  req: Request<{}, {}, {}, IPaginationQuery>,
  res: Response<IPaginatedDonations>,
) => {
  const { page, limit } = req.query;

  /* Find donations with page */
  const donations = await prisma.donation.findMany({
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
  const recordCount = await prisma.donation.count();

  if (!donations) return res.status(404).send();

  /* Calculate number of pages */
  const pageCount =
    Math.floor(recordCount / limit) + (recordCount % limit === 0 ? 0 : 1);

  return res.status(200).json({
    data: donations,
    pagination: {
      recordCount: recordCount,
      pageCount: pageCount,
      currentPage: page,
      limit,
    },
  });
};

export default fetchPaginatedDonationsController;
