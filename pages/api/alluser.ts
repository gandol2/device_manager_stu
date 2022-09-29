import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/server/client";
import { User } from "@prisma/client";

// type Data = {
//   name: string;
// };

interface ResponseDataType {
  name: string;
  users: User[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseDataType>
) {
  try {
    const users = await client.user.findMany();
    console.log(users);
    res.status(200).json({ name: "OKOKOK", users });
  } catch (err) {
  } finally {
    // 예외가 있던 없던 실행되는 블럭
    await client.$disconnect();
  }
}
