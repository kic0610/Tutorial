import logo from "./logo.svg";
import "./App.css";
import { useCallback, useEffect, useState } from "react";

function App() {
  // useEffect의 종속성 배열이 자주 변경될때 빈배열을 사용해서 최신값을 참조할수있다   https://ko.reactjs.org/docs/hooks-faq.html
  // 예제는 useEffect와 setInterval 함께 사용시 빈 종속성 배열로 최신값을 참조하는 방법

  let [aaa2, setaaa2] = useState(0);

  // useEffect에서는 빈 종속성 배열을 사용시 첫 마운트시에만 실행되고 리렌더링시에는 적용이되지않는다
  // 따라서 setInterval을 내부에서 콜백함수로 사용할경우 빈배열은 aaa2의 값이 최신상태로 갱신되지않는문제가발생한다
  // 때문에 종속성 배열에 aaa2를 넣으면 aaa2의 값이 변경될때 useEffect가 새로 호출이 된다
  // 하지만 예제에서 setInterval을 사용했기때문에 aaa2가 변경될 때마다 간격이 재설정되는 문제가 발생한다
  // 결론적으로 이문제를 해결하기위해 함수 컴포넌트 업데이트 폼을 사용하여 setState(prev => prev + 1);를 사용하면
  // 빈 종속성 배열에서도 최신값을 계속 사용해 상태변경을 할수있다. ( 하지만 setInterval 내부에서 최신값을 변수처럼 자유롭게 사용할순없음 )
  useEffect(() => {
    const id = setInterval(() => {
      console.log(aaa2);
      setaaa2((prev) => prev + 1); // setCount에 대한 내부 호출이 count에 최신 값을 사용할 수 있습니다.
    }, 2000);
    return () => clearInterval(id);
  }, []); // 종속성 목록으로 [count]를 지정하면 버그가 수정되지만, 변경될 때마다 간격이 재설정됩니다.

  useEffect(() => {
    console.log(aaa2, "aaa2");
  }, [aaa2]); // 종속성 목록으로 [count]를 지정하면 버그가 수정되지만, 변경될 때마다 간격이 재설정됩니다.

  // 문제 발견 2000ms로 설정하고 45값 이후로부터 간격설정이 꼬이는 문제가 발생한다
  // 또한 1번째 useEffect의 내부에서 aaa2는 0이라는 값이 나와야되는데 변경된 값을 참조하는 버그가 발생한다.

  return (
    <>
      <div>
        <li>Learn React 강익치</li>
        <li>{aaa2}</li>
        <button
          onClick={() => {
            console.log("hello");
          }}
        >
          Btn
        </button>
      </div>
    </>
  );
}

export default App;
