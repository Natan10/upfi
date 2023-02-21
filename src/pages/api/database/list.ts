import { NextApiRequest, NextApiResponse } from "next";
import { query as q } from "faunadb";
import { faunaClient } from "../../../services/fauna";

interface FaunaDTO {
  ref: {
    id: string;
  };
  ts: number;
  data: {
    url: string;
    title: string;
    description?: string;
  };
}

interface FaunaResponse {
  after?: {
    id: string;
  }[];
  data: FaunaDTO[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { after } = req.query;

    const queryOptions = {
      size: 6,
      ...(after && { after: [q.Ref(q.Collection("images"), after)] }),
    };

    const response = await faunaClient.query<FaunaResponse>(
      q.Map(
        q.Paginate(q.Documents(q.Collection("images")), queryOptions),
        q.Lambda("x", q.Get(q.Var("x")))
      )
    );

    const formattedDate = response.data.map((itemPhoto) => ({
      data: {
        ...itemPhoto.data,
      },
      ts: itemPhoto.ts,
      id: itemPhoto.ref.id,
    }));

    return res.json({
      data: formattedDate,
      after: response.after ? response.after[0].id : null,
    });
  } else {
    return res.status(405);
  }
}
