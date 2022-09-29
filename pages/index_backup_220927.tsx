import { User } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Counter from "../components/Counter";
import UserCard from "../components/UserCard";

const Home: NextPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();
  const [rename, setRename] = useState("");

  function 사용자추가함수() {
    fetch("/api/adduser")
      .then((res) => res.json())
      .then((json) => {
        setUsers([...users, json.user]);
        // users.push(json.user);
      });
  }

  useEffect(() => {
    // 컴포넌트가 로딩될때 한번만 실행됨
    // 사용자목록을 가져와서 state 변수에 저장

    fetch("/api/alluser")
      .then((res) => res.json())
      .then((json) => setUsers(json.users));
  }, []);

  function 사용자삭제(targetId: string) {
    console.log(`삭제할 ID : ${targetId}`);

    fetch(`/api/user/delete/${targetId}`)
      .then((res) => res.json())
      .then((json) => {
        const filterUsers = users.filter((user) => user.id !== json.deletedId);
        setUsers(filterUsers);

        console.log("여기서 삭제 하자");
        console.log(json.deletedId);
      });
  }

  function 이름변경(targetId: string) {
    if (!rename) return;

    const data = { name: rename };

    fetch(`/api/user/update/${targetId}`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    console.log(`${targetId} 의 이름을 ${rename}로 변경 `);
  }

  return (
    <div>
      <Counter title="첫번째 카운터" />
      <button className="bg-gray-300 p-2 rounded m-2" onClick={사용자추가함수}>
        사용자추가
      </button>
      <div className="flex flex-wrap">
        {users.map((user) => (
          <div key={user.id} className="border-2">
            <div>
              <input
                type={"text"}
                className="border"
                value={rename}
                onChange={(e) => setRename(e.currentTarget.value)}
              />
              <button
                onClick={() => 이름변경(user.id)}
                className="bg-gray-200 text-blue-500 
                  px-1 rounded hover:bg-gray-300"
              >
                수정
              </button>
            </div>

            <div className="text-2xl font-bold">
              <span>{user.name}</span>
              <span> ({user.age}세)</span>
            </div>
            <div>{user.addr}</div>
            <div>{user.favfood}</div>
            <div className="text-gray-400">{user.createAt.toString()}</div>
            <div>{user.id}</div>

            <button
              className="bg-gray-200 text-red-500 
            px-1 rounded hover:bg-gray-300"
              onClick={() => 사용자삭제(user.id)}
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
