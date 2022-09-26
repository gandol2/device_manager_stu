import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/server/client";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const NewUser = await client.user.create({
      data: { name: "홍길순", age: 25, addr: "아산시" },
    });
    res.status(200).json({ name: "OKOKOK" });
  } catch (err) {
    res.status(200).json({ name: "NGNGNG" });
  }
}
