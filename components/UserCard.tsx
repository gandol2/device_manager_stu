import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";

interface CounterProps {
  user: User;
}

export default function UserCard({ user }: CounterProps) {
  const router = useRouter();
  function 사용자삭제(id: string) {
    console.log(`${id} 삭제 완료`);
    fetch(`/api/user/delete/${id}`).then((res) => router.reload());
  }
  return (
    <div key={user.id} className="border-2 m-2 relative">
      <div className="text-2xl font-bold">
        <span>{user.name}</span>
        <span> ({user.age}세)</span>
      </div>
      <div>{user.addr}</div>
      <div>{user.favfood}</div>
      <div className="text-gray-400 mb-10">{user.createAt.toString()}</div>
      <button
        onClick={() => 사용자삭제(user.id)}
        className="text-red-600 bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 absolute right-1 bottom-1"
      >
        삭제
      </button>
    </div>
  );
}
