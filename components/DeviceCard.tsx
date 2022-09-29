import { Device } from "@prisma/client";
import { useEffect, useState } from "react";
import { cls } from "../libs/client/utils";

interface DeviceCardProps {
  device: Device;
  realTime: Boolean;
}

export default function DeviceCard({ device, realTime }: DeviceCardProps) {
  const [value, setValue] = useState(-1);
  const [timerID, setTimerID] = useState<NodeJS.Timer>();

  function 센싱데이터업데이트() {
    fetch(`/api/sencing/${device.id}`)
      .then((res) => res.json())
      .then((json) => {
        setValue(json.value);
      });
  }

  useEffect(() => {
    if (realTime) {
      // 타이머를 실행해서 데이터 패칭
      const tempTimerID = setInterval(() => {
        센싱데이터업데이트();
        console.log(`[실시간ON] ${device.id} - ${realTime}`);
      }, 10000);
      setTimerID(tempTimerID);
    } else {
      // 타이머를 OFF
      clearInterval(timerID);
    }
  }, [realTime]);

  useEffect(() => {
    센싱데이터업데이트();
  }, []);

  return (
    <div
      data-comment="장비카드"
      className=" sunmoon_btn m-5 border-2 w-60 h-52 p-4 flex flex-col justify-between rounded-xl"
    >
      <div className="flex justify-end items-end">
        <span className={"text-5xl"}>{value ? value : "-"}</span>
        <span className="text-2xl text-gray-500">{device.unit}</span>
      </div>

      <div className="flex flex-col">
        <span className="text-gray-800">
          {device.location} {device.memo ? ` - ${device.memo}` : null}
        </span>
        <span className="text-2xl">{device.product}</span>
      </div>
    </div>
  );
}
