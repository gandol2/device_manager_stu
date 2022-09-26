import { useState } from "react";

interface CounterProps {
  title: String;
}

export default function Counter(props: CounterProps) {
  const [count, setCount] = useState(0);

  return (
    <div className="border bg-red-100">
      <h2>
        {props.title} : {count}
      </h2>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
    </div>
  );
}
