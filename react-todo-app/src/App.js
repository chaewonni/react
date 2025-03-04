import React, { useState, useCallback } from "react";
import "./App.css";
import Lists from "./components/Lists";
import Form from "./components/Form";

const initialTodoData = localStorage.getItem("todoData") ? JSON.parse(localStorage.getItem("todoData")): [];

export default function App() {
  console.log('App Component')

  const [todoData, setTodoData] = useState(initialTodoData);
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    // form 안에 input을 전송할 때 페이지 리로드 되는 걸 막아줌
    e.preventDefault();

    // 새로운 할 일 데이터
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false
    }

    // 원래 있던 할 일에 새로운 할 일 더해주기
    setTodoData(prev => [...prev, newTodo])
    localStorage.setItem('todoData', JSON.stringify([...todoData, newTodo]));

    // 입력란에 있던 글씨 지워주기
    setValue("");
  }

  const handleClick = useCallback((id) => {
    let newTodoData = todoData.filter(data => data.id !== id)
    console.log('newTodoData', newTodoData)
    setTodoData(newTodoData)
    localStorage.setItem('todoData', JSON.stringify(newTodoData));
  }, [todoData]);

  const handleRemoveClick = () => {
    setTodoData([])
    localStorage.setItem('todoData', JSON.stringify([]));
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
          <button onClick={handleRemoveClick}> DeleteAll </button>
        </div>
        <Lists handleClick={handleClick} todoData={todoData} setTodoData={setTodoData} />

        <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
      </div>
    </div>
  )
}