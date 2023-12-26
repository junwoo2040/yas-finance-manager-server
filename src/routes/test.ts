import { Request, Response, Router } from "express";

const testRouter = Router();

testRouter.use("/", async (req: Request, res: Response) => {
  const isError = true;

  const err = new Error("Error raised");

  console.log(err);

  if (isError) return res.status(400).send(err);

  return res.status(200).json({ data: "data" });
});

export default testRouter;
