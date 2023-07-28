import { useContext } from "react";
import { taskContext } from "../../context/taskContext";
import Task from "../Task/Task";
import styles from "./TaskContainer.module.scss";

type Props = {}

function TaskContainer({}: Props) {

  const {taskArr} = useContext(taskContext);

  return (
    <section className={
      styles.taskContainer  
      }> 
      <h2>Suas Tarefas</h2>
      {taskArr.length === 0 && (
        <p>Não Há Tarefas Cadastradas</p>
      )}
      {taskArr.length !== 0 && taskArr.map((item) =>(
        <Task task={item} key={item.id}/>
      ))}
      
    </section>
  )
}

export default TaskContainer