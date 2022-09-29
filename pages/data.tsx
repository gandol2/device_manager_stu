import { Device } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  const [selectedId, setSelectedId] = useState("");
  const [devices, setDevices] = useState<Device[]>([]);

  function 셀렉트박스변경이벤트(event: React.ChangeEvent<HTMLSelectElement>) {
    console.log("셀렉트박스변경이벤트 호출됨");
    console.log(`선택된 value : ${event.currentTarget.value}`);
    setSelectedId(event.currentTarget.value);
  }

  useEffect(() => {
    fetch(`/api/device/all`)
      .then((res) => res.json())
      .then((json) => {
        if (json.ok) {
          setDevices(json.alldevice);
        }
      });
  }, []);

  return (
    <Layout title={"DATA"}>
      <div className="h-full overflow-y-scroll p-6 space-y-7">
        <h2 className="text-3xl font-bold">장비선택</h2>
        <div>
          <select
            onChange={셀렉트박스변경이벤트}
            className="w-full h-12 ring-2 ring-black text-gray-800 px-2"
          >
            {devices.map((device) => (
              <option key={device.id} value={device.id}>
                [{device.type}] {device.product} ({device.location})
              </option>
            ))}
            {/* <option value="2f9wjf9wqjfqw9f">
              [CO2] 샤오미 공기청정기 (거실)
            </option>
            <option>[CO2] 샤오미 공기청정기 (거실)</option>
            <option>[CO2] 샤오미 공기청정기 (거실)</option> */}
          </select>
        </div>

        {selectedId || true ? (
          <div className="space-y-5">
            <h2 className="text-3xl font-bold">선택장비 : {selectedId}</h2>
            <input
              placeholder="측정값을 입력하세요"
              className="w-full h-12 ring-2 ring-black text-gray-800 px-2"
            ></input>
            <button className="sunmoon_btn w-full py-5 text-2xl font-bold rounded">
              등록
            </button>
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default Home;
