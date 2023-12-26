/* routes/sales.ts */

/* Imports */
import { Router } from "express";

import validationMiddleware from "@middlewares/validationMiddleware";
import adminAuthorizationMiddleware from "@middlewares/adminAuthorizationMiddleware";

import fetchPaginatedSalessController from "@controllers/fetchPaginatedSalesController";
import createSalesController from "@controllers/createSalesController";
import deleteSalesController from "@controllers/deleteSalesController";

import { CreateSalesInput, DeleteSalesInput } from "@models/sales.model";
import { PaginationQuery } from "@models/utils.model";

/* Create new router */
const salesRouter = Router();

/* Endpoints */

/* GET */
salesRouter.get(
  "/fetch/page",
  validationMiddleware({ query: PaginationQuery }),
  // @ts-ignore
  fetchPaginatedSalessController,
);

/* POST */
salesRouter.post(
  "/create",
  validationMiddleware({ body: CreateSalesInput }),
  createSalesController,
);

/* DELETE */
salesRouter.delete(
  "/delete",
  adminAuthorizationMiddleware,
  validationMiddleware({ body: DeleteSalesInput }),
  deleteSalesController,
);

export default salesRouter;
