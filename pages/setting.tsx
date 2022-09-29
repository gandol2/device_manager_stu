import { Device } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  const router = useRouter();
  const [product, setProduct] = useState(""); // 제품명
  const [location, setLocation] = useState(""); // 설치위치
  const [type, setType] = useState(""); // 장치종류
  const [unit, setUnit] = useState(""); // 측정단위
  const [memo, setMemo] = useState(""); // 메모
  const [errorMessage, setErrorMessage] = useState(""); // 화면에 표시할 에러 메시지
  const [devices, setDevices] = useState<Device[]>([]);

  function ClearForm() {
    setLocation("");
    setType("");
    setUnit("");
    setProduct("");
    setMemo("");
    setErrorMessage("");
  }

  function 장비추가버튼클릭() {
    document.querySelector("#container_add_device")?.classList.toggle("hidden");
    ClearForm();
  }
  // <select> change
  function 장치종류변경(event: React.ChangeEvent<HTMLSelectElement>) {
    console.log("장치종류변경 함수 호출 됨 ");
    setType(event.currentTarget.value);
  }
  function 장비등록버튼클릭() {
    console.log("장비등록버튼클릭");

    if (!product) {
      setErrorMessage("제품명을 입력 하세요");
      return;
    }
    if (!location) {
      setErrorMessage("설치위치를 입력 하세요");
      return;
    }
    if (!type) {
      setErrorMessage("장치종류를 선택 하세요");
      return;
    }
    if (!unit) {
      setErrorMessage("단위를 입력 하세요");
      return;
    }
    setErrorMessage("");

    // TODO :  서버에 body로 싣어서 보낼 데이터
    const data = { product, type, location, unit, memo };
    console.log(data);

    // 서버로 데이터 전송
    fetch("/api/device/add", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.ok) {
          document
            .querySelector("#container_add_device")
            ?.classList.toggle("hidden");
          ClearForm();

          const tempArr = [...devices, json.newDevice];
          setDevices(tempArr);
        } else {
          setErrorMessage("등록에 실패했습니다.");
        }
      });
  }

  function 장치삭제(장치ID: string) {
    if (!장치ID) return;

    fetch(`/api/device/${장치ID}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.ok === true) {
          // router.reload();
          console.log(json.id);

          const tempArr = devices.filter((device) => device.id !== json.id);

          setDevices(tempArr);
        }
      });
  }

  useEffect(() => {
    fetch("/api/device/all")
      .then((res) => res.json())
      .then((json) => setDevices(json.alldevice));
  }, []);

  return (
    <Layout title={"SETTING"}>
      <div className="h-full overflow-y-scroll p-6 space-y-7">
        <div data-comment={"장비추가버튼"} className="flex justify-end">
          <button
            onClick={장비추가버튼클릭}
            className="sunmoon_btn space-x-2 py-4 px-5 rounded-lg flex"
          >
            <span>Add Device </span>
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
        </div>
        <div
          id="container_add_device"
          data-comment={"새로운디바이스추가 폼"}
          className="space-y-5 hidden"
        >
          <hr />
          <div className="text-3xl font-bold">New Device</div>
          <div className="flex flex-col">
            <span>제품명 *</span>
            <input
              type={"text"}
              value={product}
              onChange={(event) => setProduct(event.currentTarget.value)}
              placeholder="제품명을 입력하세요"
              className="h-12 ring-2 ring-black text-gray-800 px-2"
            />
          </div>
          <div className="flex flex-col">
            <span>설치위치 *</span>
            <input
              type={"text"}
              value={location}
              onChange={(event) => setLocation(event.currentTarget.value)}
              placeholder="거실, 안방... etc"
              className="h-12 ring-2 ring-black text-gray-800 px-2"
            />
          </div>
          <div className="flex flex-col">
            <span>장치종류 *</span>
            <select
              className="h-12 ring-2 ring-black text-gray-800 px-2"
              onChange={장치종류변경}
            >
              <option hidden>장치종류를 선택하세요</option>
              <option value="TEMP">온도 센서</option>
              <option value="HUMI">습도 센선</option>
              <option value="CO2">CO2 센서</option>
            </select>
          </div>
          <div className="flex flex-col">
            <span>단위 *</span>
            <input
              type={"text"}
              value={unit}
              onChange={(event) => setUnit(event.currentTarget.value)}
              placeholder="측정단위 (eg : ℃, %)"
              className="h-12 ring-2 ring-black text-gray-800 px-2"
            />
          </div>
          <div className="flex flex-col">
            <span>메모</span>
            <input
              type={"text"}
              value={memo}
              onChange={(event) => setMemo(event.currentTarget.value)}
              placeholder="메모를 입력하세요"
              className="h-12 ring-2 ring-black text-gray-800 px-2"
            />
          </div>

          {errorMessage ? (
            <div className="text-red-500 ">{errorMessage}</div>
          ) : null}
          {/* {notError ? null : (
            <div className="text-red-500 ">제품명이 없습니다</div>
          )} */}

          <button
            onClick={장비등록버튼클릭}
            className="sunmoon_btn w-full py-5 text-2xl font-bold rounded"
          >
            등록
          </button>

          <hr />
        </div>

        <div data-comment={"장비삭제메뉴"}>
          <h2 className="text-3xl font-bold">장치목록</h2>

          {0 < devices.length ? null : (
            <div className="text-red-400 font-bold mt-5 text-center text-2xl">
              장치를 등록 해주세요
            </div>
          )}

          <div>
            {devices.map((device, idx) => (
              <div key={idx} className="border-b-4 py-5 flex justify-between">
                <div>
                  <div>{device.id}</div>
                  <div>
                    [{device.type}]{" "}
                    <span className="font-bold">{device.product}</span> (
                    {device.location})
                  </div>
                  <div>{device.memo}</div>
                </div>
                <button
                  onClick={() => 장치삭제(device.id)}
                  className="text-red-500 bg-red-200 hover:bg-red-300 w-16 h-16 rounded-xl"
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
