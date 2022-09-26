import { User } from "@prisma/client";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Counter from "../components/Counter";

const Home: NextPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  function 사용자추가함수() {
    console.log("사용자 추가함수가 클릭되었습니다.");

    fetch("/api/adduser");
  }

  useEffect(() => {
    // 컴포넌트가 로딩될때 한번만 실행됨
    // 사용자목록을 가져와서 state 변수에 저장

    fetch("/api/alluser")
      .then((res) => res.json())
      .then((json) => setUsers(json.users));
  }, []);

  return (
    <div>
      <Counter title="첫번째 카운터" />
      <button className="bg-gray-300 p-2 rounded m-2" onClick={사용자추가함수}>
        사용자추가
      </button>

      <div className="flex flex-wrap">
        {users.map((user) => (
          <div key={user.id} className="border-2">
            <div className="text-2xl font-bold">
              <span>{user.name}</span>
              <span> ({user.age}세)</span>
            </div>

            <div>{user.addr}</div>
            <div>{user.favfood}</div>
            <div className="text-gray-400">{user.createAt.toString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
