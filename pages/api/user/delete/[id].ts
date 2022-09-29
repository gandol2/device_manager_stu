import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../../libs/server/client";
import { User } from "@prisma/client";

// type Data = {
//   name: string;
// };

interface Data {
  ok: boolean;
  deletedId?: string;
  user?: User;
  err?: String;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    console.log(req.query.id);

    const deleteUser = await client.user.delete({
      where: {
        id: req.query.id?.toString(),
      },
    });
    console.log(deleteUser);

    res.status(200).json({ ok: true, deletedId: deleteUser.id });
  } catch (err) {
    res.status(200).json({ ok: false, err: `${err}` });
  }
}
