import { Request, Response } from "express";

const logoutController = async (req: Request, res: Response) => {
  console.log("Logout");
  req.session.destroy((err) => err);
  return res.status(204).send();
};

export default logoutController;
