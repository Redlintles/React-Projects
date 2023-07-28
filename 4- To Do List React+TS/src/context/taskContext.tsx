import { createContext, useState } from "react"
import { NullLiteral } from "typescript";

export interface task {
  id: number,
  title: string,
  difficulty: number,
}

export interface taskContextDef {
  taskArr: Array<task>
  setter: React.Dispatch<React.SetStateAction<task[]>>
}

export const taskContext = createContext<taskContextDef>({
  taskArr: [],
  setter: () => { }
});

export function TaskContextProvider({ children }: any) {
  let tasks = [];
  (function getLocalTasks(): void {
    let local: string | null = localStorage.getItem("tasks");
    if (local) {
      tasks = JSON.parse(local);
    }
  }())

  const [taskArr, setTaskArr] = useState<task[]>(tasks);

  return (
    <taskContext.Provider value={{ taskArr, setter: setTaskArr }}>
      {children}
    </taskContext.Provider>

  )
}

export default TaskContextProvider