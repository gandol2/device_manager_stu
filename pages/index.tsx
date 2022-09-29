import { Device } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import DeviceCard from "../components/DeviceCard";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    fetch("/api/device/all")
      .then((res) => res.json())
      .then((json) => setDevices(json.alldevice));
  }, []);

  return (
    <Layout title={"HOME"}>
      <div className="h-full overflow-y-scroll p-6 space-y-7">
        <div id="웰컴메시지" className="flex justify-between items-center">
          <div>
            <div className="text-5xl font-bold">Hello KSS 🖐</div>
            <div className="text-gray-500">Welcome back to home</div>
          </div>
          <Link href={"/setting"}>
            <button className="sunmoon_btn space-x-2 py-4 px-5 rounded-lg flex">
              <span>Add Device</span>
              <span data-comment="플러스아이콘">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>
          </Link>
        </div>
        <div id="링크드유" className="flex justify-between items-center">
          <div className="text-3xl font-bold">Linked to you</div>
          <div>[실시간버튼자리]</div>
        </div>

        <div id="센서목록" className="flex flex-wrap">
          {devices.map((device, idx) => (
            <DeviceCard key={idx} device={device}></DeviceCard>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
