import { Request, Response } from "express";
import * as yup from "yup";

import dbConnection from "../database/connection";
import insertImageUrl from "./utils/insertImageUrl";

class PointController {
  async index(req: Request, res: Response) {
    const { uf, city, items } = req.query;

    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    const points = await dbConnection("point")
      .join("point_item", "point_item.id_point", "=", "point.id")
      .whereIn("point_item.id_item", parsedItems)
      .where("city", String(city).toLowerCase())
      .where("uf", String(uf).toUpperCase())
      .distinct()
      .select("point.*");

    //  const points = await dbConnection("point").select("*");
    return res.json(points);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ err: "Id is required" });
    }

    const point = await dbConnection("point").where({ id }).select("*").first();

    if (!point) {
      return res.status(400).json({ error: "Point not found." });
    }
    const items = await dbConnection("item")
      .join("point_item", "item.id", "=", "point_item.id_item")
      .where("id_point", "=", id)
      .select(["item.id", "title", "image"]);

    point.items = insertImageUrl(items);
    return res.json(point);
  }

  async create(req: Request, res: Response) {
    const {
      name,
      email,
      whatsApp,
      image,
      longitude,
      latitude,
      city,
      uf,
      items,
    } = req.body;

    const Schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().required(),
      whatsApp: yup.string().required(),
      image: yup.string().required(),
      longitude: yup.number().required(),
      latitude: yup.number().required(),
      city: yup.string().required(),
      uf: yup.string().required().max(2),
    });

    const point = {
      name: name.toLowerCase(),
      email,
      whatsApp,
      image,
      longitude,
      latitude,
      city: city.toLowerCase(),
      uf: uf.toUpperCase(),
    };

    if (!(await Schema.isValid(point))) {
      return res.status(400).json({ error: "invalid filds" });
    }

    const trx = await dbConnection.transaction();

    const [createdPoint] = await trx("point").insert(point);

    const pointItems = items.map((item: number) => {
      return {
        id_point: createdPoint,
        id_item: item,
      };
    });

    await trx("point_item").insert(pointItems);

    await trx.commit();

    return res.json({
      id: createdPoint,
      ...point,
    });
  }
}

export default new PointController();
