import { prisma } from "@configs/prisma";
import { IPaginatedAccountRequests } from "@models/user.model";
import { IPaginationQuery } from "@models/utils.model";
import { Request, Response } from "express";

const fetchPaginatedAccountRequestsController = async (
  req: Request<{}, {}, {}, IPaginationQuery>,
  res: Response<IPaginatedAccountRequests>,
) => {
  const { page, limit } = req.query;

  /* Find account requests with page */
  const accountRequests = await prisma.accountRequest.findMany({
    /* Skip over entries before the page */
    skip: (page - 1) * limit,
    /* Take the entries on the page */
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  /* Get total count of the records */
  const recordCount = await prisma.accountRequest.count();

  if (!accountRequests) return res.status(404).send();

  /* Calculate number of pages */
  const pageCount =
    Math.floor(recordCount / limit) + (recordCount % limit === 0 ? 0 : 1);

  return res.status(200).send({
    data: accountRequests,
    pagination: {
      recordCount: recordCount,
      pageCount: pageCount,
      currentPage: page,
      limit,
    },
  });
};

export default fetchPaginatedAccountRequestsController;
