import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import { Device, DeviceType } from "@prisma/client";

interface Data {
  ok: boolean;
  value?: number;
  error?: String;
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Data>
) {
  // 405 allow method check
  if (request.method !== "GET") {
    return response.status(405).json({
      ok: false,
      error: `지원하지 않는 메서드 입니다 : ${request.method}`,
    });
  }

  const { deviceid } = request.query;
  if (!deviceid) {
    return response.status(200).json({
      ok: false,
      error: `장치 ID(deviceid)를 입력 해주세요`,
    });
  }

  try {
    console.log("여기까지 출력됨 ");

    const result = await client.sencing.findFirst({
      where: {
        // 필터링
        deviceId: deviceid.toString(),
      },
      select: {
        // select는 필드를 선택할수 있음
        value: true, // 선택된 필드만 가져오려면 boolean
        id: false,
        updateAt: false,
      },
      orderBy: {
        // 정렬
        createAt: "desc", // createAt 기준으로 오름차순으로 정렬
      },
    });

    console.log(result);

    response.status(200).json({ ok: true, value: result?.value });
  } catch (err) {
    response.status(200).json({ ok: false, error: `${err}` });
  }
}
