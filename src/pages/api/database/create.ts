import { NextApiRequest, NextApiResponse } from "next";
import { query as q } from "faunadb";

import { faunaClient } from "../../../services/fauna";
import { PhotoModel } from "../../../domain/Photo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const model: PhotoModel = req.body.data;

      const response = await faunaClient.query(
        q.Create(q.Collection("images"), {
          data: {
            id: model.id,
            title: model.title,
            description: model.description,
            url: model.url,
          },
        })
      );

      return res.status(201).json({ data: JSON.stringify(response) });
    } catch (err) {
      console.error(err);
      return res.status(500);
    }
  } else {
    return res.status(405);
  }
}
