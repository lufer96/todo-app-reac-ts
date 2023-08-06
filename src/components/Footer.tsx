import { type FilterValue } from "../types"
import { Filters } from "./Filters"

interface Props {
  activeCount: number
  completedCount: number
  filterSelected: FilterValue
  onClearCompleted: () => void
  handlerFilterChanged: (value: FilterValue) => void
}

export const Footer: React.FC<Props> = ({
  activeCount = 0,
  completedCount = 0,
  filterSelected,
  onClearCompleted,
  handlerFilterChanged,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount}</strong> Pending tasks
      </span>
      {/* <span className="todo-count">
        <strong>{completedCount}</strong>  tasks
      </span> */}
      <Filters
        filterSelected={filterSelected}
        onFilterChange={handlerFilterChanged}
      />
      {completedCount > 0 && (
        <button className="clear-completed" onClick={onClearCompleted}>
          Delete completed tasks
        </button>
      )}
    </footer>
  )
}
