import { Request, Response } from "express";

import dbConnection from "../database/connection";
import insertImageUrl from "./utils/insertImageUrl";

export default {
  async index(req: Request, res: Response) {
    const items = await dbConnection("item").select("*");

    const serializedItems = insertImageUrl(items);

    return res.json(serializedItems);
  },
};
