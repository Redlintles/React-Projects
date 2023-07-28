import React, { FormEvent, useState, useContext } from 'react'
import styles from "./Form.module.scss";
import { task, taskContext } from '../../context/taskContext';

function Form() {

  const [title, setTitle] = useState<string>("");
  const [difficulty, setDifficulty] = useState<number>(0);

  const { taskArr, setter } = useContext(taskContext);

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();

    const taskObj: task = {
      id: taskArr.length + 1,
      title,
      difficulty
    }

    localStorage.setItem("tasks", JSON.stringify(
      [
        taskObj,
        ...taskArr
      ]
    ));

    setter([
      taskObj,
      ...taskArr
    ]);

    setTitle("");
    setDifficulty(0);
  }

  return (
    <section className={styles.form__section}>
      <h2>O que você vai fazer?</h2>
      <form
        className={styles.form}
        onSubmit={handleSubmit}

      >
        <label className={styles.form__label}>
          <span>Título:</span>
          <input
            type="text"
            placeholder="Título da tarefa..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className={styles.form__label}>
          <span>Dificuldade:</span>
          <input
            type="number"
            placeholder="Dificuldde da Tarefa..."
            value={difficulty}
            onChange={(e) => setDifficulty(parseInt(e.target.value))}
            min="0"
            max="5"
          />
        </label>
        <button type="submit" className={styles.form__submit}>Cadastrar</button>
      </form>
    </section>
  )
}

export default Form