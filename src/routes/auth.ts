import { Router } from "express";

import validationMiddleware from "@middlewares/validationMiddleware";

import loginController from "@controllers/loginController";
import requestController from "@controllers/requestController";
import logoutController from "@controllers/logoutController";
import authorizeController from "@controllers/authorizeController";

import { CreateAccountRequestInput } from "@models/user.model";

const authRouter = Router();

/* All */
authRouter.get("/authorize", authorizeController);

authRouter.post(
  "/request",
  validationMiddleware({ body: CreateAccountRequestInput }),
  requestController,
);
authRouter.post("/login", loginController);
authRouter.post("/logout", logoutController);

export default authRouter;
