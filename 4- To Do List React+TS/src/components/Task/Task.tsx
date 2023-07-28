import React, { useContext, useState } from 'react'
import styles from "./Task.module.scss";

import { BsFillTrashFill, BsPencil, BsCheckLg } from "react-icons/bs";

import { task, taskContext } from '../../context/taskContext';

type Props = {
  task: task

}

function Task({ task }: Props) {

  const { taskArr, setter } = useContext(taskContext);
  const [edit, setEdit] = useState<Boolean>(false);

  const [title, setTitle] = useState<string>(task.title);
  const [difficulty, setdifficulty] = useState<number>(task.difficulty);

  function editTask():void {

    const taskObj: task = {
      ...task,
      title,
      difficulty
    }

    const arr = taskArr.map((item)=> {
      if(item.id === taskObj.id) {
        return taskObj
      }
      return item;
    })
    setEdit(false);
    setter(arr);
    localStorage.setItem("tasks", JSON.stringify(arr));

  }

  function removeTask(task: task): void {
    let arr = taskArr.filter((item) => item.id !== task.id);
    setter(arr);
    localStorage.setItem("tasks", JSON.stringify(arr));
  }

  const bgColor = styles[`bg_red_${task.difficulty}`]
  return (
    <div className={
      `${styles.task} ${bgColor}`
      
      }>
      {edit && (
        <div className={styles.task__edit}>
          <label>
            <span>Título:</span>
            <input
              type="text"
              placeholder="Novo Título..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            <span>Dificuldade:</span>
            <input
              type="number"
              placeholder="Novo Título..."
              value={difficulty}
              onChange={(e) => setdifficulty(parseInt(e.target.value))}
              min="0"
              max="5"
            />
          </label>
        </div>
      )}

      {!edit && (
        <div className={styles.task__info}>
          <h3>{task.title}</h3>
          <p>Dificuldade: {task.difficulty}</p>
        </div>
      )}
      <div className={styles.task__actions}>
        {!edit && (
          <button
            onClick={() => { setEdit(true) }}
          >
            <BsPencil />
          </button>
        )}
        {edit && (
          <button
            onClick={editTask}
          >
            <BsCheckLg />
          </button>
        )}
        <button
          onClick={() => { removeTask(task) }}

        >
          <BsFillTrashFill />
        </button>
      </div>
    </div>
  )
}

export default Task