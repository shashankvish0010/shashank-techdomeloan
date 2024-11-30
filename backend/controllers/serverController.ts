import { Request, Response } from "express";

export const initialServer = (req: Request, res: Response) => {
  res.json({ success: true, message: `Hello from techdome loan app server.` });
};
