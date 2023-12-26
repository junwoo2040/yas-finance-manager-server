/* routes/donation.ts */

/* Imports */
import { Router } from "express";

import validationMiddleware from "@middlewares/validationMiddleware";
import adminAuthorizationMiddleware from "@middlewares/adminAuthorizationMiddleware";

import fetchPaginatedDonationsController from "@controllers/fetchPaginatedDonationsController";
import createDonationController from "@controllers/createDonationController";
import deleteDonationController from "@controllers/deleteDonationController";

import {
  CreateDonationInput,
  DeleteDonationInput,
} from "@models/donation.model";
import { PaginationQuery } from "@models/utils.model";

/* Create new router */
const donationRouter = Router();

/* Endpoints */
/* GET */
donationRouter.get(
  "/fetch/page",
  validationMiddleware({ query: PaginationQuery }),
  // @ts-ignore
  fetchPaginatedDonationsController,
);

/* POST */
donationRouter.post(
  "/create",
  validationMiddleware({ body: CreateDonationInput }),
  createDonationController,
);

/* DELETE */
donationRouter.delete(
  "/delete",
  adminAuthorizationMiddleware,
  validationMiddleware({ body: DeleteDonationInput }),
  deleteDonationController,
);

export default donationRouter;
