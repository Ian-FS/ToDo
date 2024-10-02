import {
  Check,
  CheckFat,
  PencilSimple,
  Trash,
  XSquare,
} from '@phosphor-icons/react';
import style from './Task.module.css';
import { useState } from 'react';

interface ITask {
  id: string;
  description: string;
  done: boolean;
}

interface TaskProps {
  task: ITask;
  handleDeleteTask: (deletedTask: string) => void;
  handleCheckTask: (task: ITask, done: boolean) => void;
  handleEditTask: (currentDescription: string, task: ITask) => void;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}
export default function Task({
  task,
  handleCheckTask,
  handleDeleteTask,
  handleEditTask,
}: Readonly<TaskProps>) {
  const [isEdit, setIsEdit] = useState(false);
  const [updateDescription, setUpdateDescription] = useState('');

  function handleEnableEdit() {
    setUpdateDescription(task.description);
    setIsEdit(true);
  }

  return (
    <div className={style.task}>
      <div className={style.taskInfo}>
        {task.done ? (
          <button
            onClick={() => handleCheckTask(task, task.done)}
            className={`${style.circleButton} ${style.checkedCircleButton}`}
          >
            <Check size={14} weight="bold" />
          </button>
        ) : (
          <button
            onClick={() => handleCheckTask(task, task.done)}
            className={`${style.circleButton} ${style.uncheckedCircleButton}`}
            disabled={isEdit}
          />
        )}

        <form className={style.containerTaskDescription}>
          <input
            autoFocus
            ref={(inputEl) => inputEl && inputEl.focus()}
            className={
              task.done
                ? `${style.taskDescriptionInput} ${style.checkedTaskText} ${style.checkedTaskDescriptionInput}`
                : `${style.taskDescriptionInput}`
            }
            value={isEdit ? updateDescription : task.description}
            onChange={(event) => setUpdateDescription(event.target.value)}
            disabled={!isEdit}
          />

          {isEdit ? (
            <div className={style.confirmOrCancelContainer}>
              <button
                disabled={updateDescription === ''}
                onClick={() => {
                  handleEditTask(updateDescription, task);
                  setIsEdit(false);
                }}
                className={
                  updateDescription === ''
                    ? style.disabledConfirmButton
                    : style.confirmButton
                }
              >
                <CheckFat weight="fill" />
              </button>
              <button
                onClick={() => {
                  setIsEdit(false);
                }}
                className={style.cancelButton}
              >
                <XSquare weight="fill" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleEnableEdit}
              className={
                task.done
                  ? `${style.editDescriptionButton} ${style.disabledButton}`
                  : `${style.editDescriptionButton} ${style.enableEditButton}`
              }
              disabled={task.done}
            >
              <PencilSimple weight="fill" />
            </button>
          )}
        </form>
      </div>
      {!isEdit && (
        <button
          onClick={() => handleDeleteTask(task.id)}
          className={style.trashButton}
        >
          <Trash size={24} />
        </button>
      )}
    </div>
  );
}
