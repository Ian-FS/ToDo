import { PlusCircle } from '@phosphor-icons/react';
import style from './TaskForm.module.css';
import React from 'react';

interface TaskFormProps {
  description: string;
  setDescription: (description: string) => void;
  handleCreateTask: (event: React.FormEvent) => void;
}

export default function TaskForm({
  setDescription,
  description,
  handleCreateTask,
}: Readonly<TaskFormProps>) {
  return (
    <form className={style.wrapperAddTaskBar}>
      <input
        className={style.addTaskBar}
        type="text"
        placeholder="Adicione uma nova tarefa"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button
        disabled={description.length < 1}
        className={`${style.taskAddButton} ${
          description.length > 0
            ? style.ableTaskAddButton
            : style.disabledTaskAddButton
        }`}
        onClick={handleCreateTask}
      >
        Criar <PlusCircle size={16} />
      </button>
    </form>
  );
}
