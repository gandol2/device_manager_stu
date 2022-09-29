import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import { Device, DeviceType } from "@prisma/client";

interface Data {
  ok: boolean;
  newDevice?: Device;
  error?: String;
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Data>
) {
  // 405 allow method check
  if (request.method !== "POST") {
    response.status(405).json({
      ok: false,
      error: `지원하지 않는 메서드 입니다 : ${request.method}`,
    });

    return;
  }

  const { product, location, type, unit, memo } = JSON.parse(request.body);

  console.log(product, location, type, unit, memo);
  // 입력필드 검증
  if (true) {
    if (!product) {
      return response
        .status(200)
        .json({ ok: false, error: "제품명(product)이 없습니다" });
    }
    if (!location) {
      return response
        .status(200)
        .json({ ok: false, error: "설치위치(location)가 없습니다" });
    }
    if (!type) {
      return response
        .status(200)
        .json({ ok: false, error: "장치종류(type)가 없습니다" });
    }
    if (!unit) {
      return response
        .status(200)
        .json({ ok: false, error: "측정단위(unit)가 없습니다" });
    }
  }

  try {
    // Device row Create
    const newDevice = await client.device.create({
      data: {
        product,
        location,
        type,
        unit,
        memo,
      },
    });

    response.status(200).json({ ok: true, newDevice });
  } catch (err) {
    response.status(200).json({ ok: false, error: `${err}` });
  } finally {
    // 예외가 있던 없던 실행되는 블럭
    await client.$disconnect();
  }
}
