import { useDroppable } from "@dnd-kit/react"
const Column = ({ id, children }) => {
    const {ref, isDropTarget} = useDroppable({id, })
  return (
      <div ref={ref} className={`rounded-md p-2 ${isDropTarget? "bg-zinc-200": "bg-zinc-50"}`}>
       {children}
    </div>
  )
}

export default Column
