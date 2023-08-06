import { useState } from "react"
import { Todos } from "./components/Todos"
import { FilterValue, TodoTitle, type TodoID, type Todo as TodoType } from "./types"
import { TODO_FILTERS } from "./consts"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"

const mockTodos = [
  {
    id: "1",
    title: "Todo 1",
    completed: true,
  },
  {
    id: "2",
    title: "Todo 2",
    completed: false,
  },
  {
    id: "3",
    title: "Todo 3",
    completed: false,
  },
]
const App = (): JSX.Element => {
  const [todos, setTodos] = useState(mockTodos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(
    TODO_FILTERS.ALL
  )

  const handlerRemove = ({ id }: TodoID): void => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }
  // const handledCompleted = ({id, completed}: Partial<Todo>) => {
  const handledCompleted = ({
    id,
    completed,
  }: Pick<TodoType, "id" | "completed">): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed,
        }
      }

      return todo
    })

    setTodos(newTodos)
  }

  const handlerFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const handlerRemoveAllCompleted = () => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  const handlerAddTodo = ({title}: TodoTitle) => {
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false
    }

    const newTodos = [...todos, newTodo]
    setTodos(newTodos)



  }

  const activeCount = todos.filter((todo) => !todo.completed).length
  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter((todo) => {
    if(filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if(filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo

  })

  return (
    <div className="todoapp">
      <Header onAddTodo={handlerAddTodo}/>
      <Todos
        onToggleCompleteTodo={handledCompleted}
        onRemoveTodo={handlerRemove}
        todos={filteredTodos}
      />
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        handlerFilterChanged={handlerFilterChange}
        onClearCompleted={handlerRemoveAllCompleted}
      />
    </div>
  )
}

export default App
