/* routes/api.ts */

/* Imports */
import { Router } from "express";

import memberAuthorizationMiddleware from "@middlewares/memberAuthorizationMiddleware";

import recordRouter from "@routes/record";
import userRouter from "@routes/user";
import authRouter from "@routes/auth";

/* Create new router */
const apiRouter = Router();

/* Use sub-routers */
apiRouter.use("/record", memberAuthorizationMiddleware, recordRouter);
apiRouter.use("/user", memberAuthorizationMiddleware, userRouter);
apiRouter.use("/auth", authRouter);

export default apiRouter;
