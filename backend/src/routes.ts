import { Router } from "express";
import * as yup from "yup";

import dbConnection from "./database/connection";
import itemsController from "./controllers/ItemsContorller";
import pointController from "./controllers/PointController";

const routes = Router();

routes.get("/items", itemsController.index);

routes.get("/point", pointController.index);
routes.post("/point", pointController.create);
routes.get("/point/:id", pointController.show);

routes.get("/pointItems", async (req, res) => {
  const poitItems = await dbConnection("point_item").select("*");
  return res.json(poitItems);
});

export default routes;
