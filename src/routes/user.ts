import { Router } from "express";

import adminAuthorizationMiddleware from "@middlewares/adminAuthorizationMiddleware";
import validationMiddleware from "@middlewares/validationMiddleware";

import fetchCurrentUserController from "@controllers/fetchCurrentUserController";
import fetchPaginatedAccountRequestsController from "@controllers/fetchPaginatedAccountRequestsController";
import acceptAccountRequestController from "@controllers/acceptAccountRequestController";
import denyAccountRequestController from "@controllers/denyAccountRequestController";

import {
  AcceptAccountRequestInput,
  DenyAccountRequestInput,
} from "@models/user.model";
import { PaginationQuery } from "@models/utils.model";

const userRouter = Router();

/* Get current user */
userRouter.get("/current", fetchCurrentUserController);

/* Account Requests */
userRouter.get(
  "/request/fetch/page",
  adminAuthorizationMiddleware,
  validationMiddleware({ query: PaginationQuery }),
  // @ts-ignore
  fetchPaginatedAccountRequestsController,
);

userRouter.post(
  "/request/accept",
  adminAuthorizationMiddleware,
  validationMiddleware({ body: AcceptAccountRequestInput }),
  acceptAccountRequestController,
);
userRouter.post(
  "/request/deny",
  adminAuthorizationMiddleware,
  validationMiddleware({ body: DenyAccountRequestInput }),
  denyAccountRequestController,
);

export default userRouter;
