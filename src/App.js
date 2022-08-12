import React, { useState, useRef, useEffect } from 'react';
import TodoList from './Box'
import { v4 as uuidv4 } from 'uuid'
import { Button, Container, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])
// do not know what's happening here :(
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Img style={{width: 1200, height:100}} src="https://picsum.photos/id/1073/1200/100"/>
          <Card.Title style={{color: "#808000"}} className="text-center">Reading list</Card.Title>
          <Card.Text style={{color: "#6B8E23"}} className="text-center">Add in cool books using the text box and buttons.</Card.Text>
        </Card.Body>
      </Card>
      <Container>
      <TodoList className="text-center" todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <div className="d-grid gap-2">
        <Button variant="outline-success" className="text-center "onClick={handleAddTodo}>Add Book</Button>{' '}
        <Button variant="outline-success" className="text-center" onClick={handleClearTodos}>Clear all checked-off books</Button>{' '}
      </div>
      <div>{todos.filter(todo => !todo.complete).length} books on the waiting list</div> 
      </Container>
    </>
  )
}

export default App;