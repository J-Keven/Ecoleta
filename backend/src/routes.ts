import { Router } from "express";
import dbConnection from "./database/connection";

const routes = Router();

routes.get("/items", async (req, res) => {
  const item = await dbConnection("item").select("*");

  const serializedItems = item.map((e) => {
    return {
      title: e.title,
      image: e.image,
      url: `http://localhost:3333/uploads/${e.image}`,
    };
  });
  return res.json(serializedItems);
});

export default routes;
