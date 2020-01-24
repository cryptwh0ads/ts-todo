import React, { Fragment, useState } from 'react'
import ReactDom from 'react-dom'

// Use 'type' to refer another type
type FormElem = React.FormEvent<HTMLFormElement>
// Use 'interface' to create a new type
interface ITodo {
  text: string
  complete: boolean
}

export default function App(): JSX.Element {
  const [value, setValue] = useState<string>('')
  const [todos, setTodos] = useState<ITodo[]>([])

  const handleSubmit = (e: FormElem): void => {
    //    Prevent refresh page on submit form
    e.preventDefault()
    //  Perform action to add Todo
    addTodo(value)
    //  Redefine value to null string
    setValue('')
  }

  //    Function to add new todo an array
  const addTodo = (text: string): void => {
    const newTodos: ITodo[] = [...todos, { text, complete: false }]
    setTodos(newTodos)
  }
  //    Function to set a 'complete' or 'incomplete' to Todo
  const completeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos]
    newTodos[index].complete = !newTodos[index].complete
    setTodos(newTodos)
  }
  //    Function to remove todo an array
  const removeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }

  return (
    <Fragment>
      <h1>Todo list</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={value}
          onChange={e => setValue(e.target.value)}
          required
        />
        <button type='submit'>Add Todo</button>
      </form>
      <section>
        {todos.map((todo: ITodo, index: number) => {
          return (
            <Fragment key={index}>
              <div
                style={{ textDecoration: todo.complete ? 'line-through' : '' }}
              >
                {todo.text}
              </div>
              <button type='button' onClick={() => completeTodo(index)}>
                {todo.complete ? 'Incomplete' : 'Complete'}
              </button>
              <button type='button' onClick={() => removeTodo(index)}>
                Remove Todo
              </button>
            </Fragment>
          )
        })}
      </section>
    </Fragment>
  )
}

const root = document.getElementById('app-root')

ReactDom.render(<App />, root)
