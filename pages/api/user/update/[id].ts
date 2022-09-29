import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../../libs/server/client";
import { User } from "@prisma/client";

// type Data = {
//   name: string;
// };

interface Data {
  ok: boolean;
  user?: User;
  err?: String;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ ok: false, err: "지원하지 않는 메서드 입니다" });
  }

  try {
    // console.log(req.query.id);
    // console.log(req.body);

    const obj = JSON.parse(req.body);
    console.log(obj.name);

    if (!obj.name) {
      return res.status(200).json({ ok: false, err: "이름을 입력하세요" });
    }

    const updateUser = await client.user.update({
      where: {
        id: req.query.id?.toString(),
        // email: 'viola@prisma.io',
      },
      data: {
        name: obj.name,
      },
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(200).json({ ok: false, err: `${err}` });
  } finally {
    // 예외가 있던 없던 실행되는 블럭
    await client.$disconnect();
  }
}
