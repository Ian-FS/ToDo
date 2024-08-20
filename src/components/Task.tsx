import {
  Check,
  CheckFat,
  PencilSimple,
  Trash,
  XSquare,
} from '@phosphor-icons/react';
import style from './Task.module.css';
import { useState } from 'react';

interface TaskProps {
  currentDescription: string;
  isChecked: boolean;
  handleDeleteTask: (deletedTask: string) => void;
  handleCheckTask: (description: string, isChecked: boolean) => void;
  handleEditTask: (
    currentDescription: string,
    updateDescription: string,
  ) => void;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}
export default function Task({
  currentDescription,
  isChecked,
  handleCheckTask,
  handleDeleteTask,
  handleEditTask,
}: Readonly<TaskProps>) {
  const [isEdit, setIsEdit] = useState(false);
  const [updateDescription, setUpdateDescription] = useState('');

  function handleEnableEdit() {
    setUpdateDescription(currentDescription);
    setIsEdit(true);
  }

  return (
    <div className={style.task}>
      <div className={style.taskInfo}>
        {isChecked ? (
          <button
            onClick={() => handleCheckTask(currentDescription, isChecked)}
            className={`${style.circleButton} ${style.checkedCircleButton}`}
          >
            <Check size={14} weight="bold" />
          </button>
        ) : (
          <button
            onClick={() => handleCheckTask(currentDescription, isChecked)}
            className={`${style.circleButton} ${style.uncheckedCircleButton}`}
            disabled={isEdit}
          />
        )}

        <form className={style.containerTaskDescription}>
          <input
            autoFocus
            ref={(inputEl) => inputEl && inputEl.focus()}
            className={
              isChecked
                ? `${style.taskDescriptionInput} ${style.checkedTaskText} ${style.checkedTaskDescriptionInput}`
                : `${style.taskDescriptionInput}`
            }
            value={isEdit ? updateDescription : currentDescription}
            onChange={(event) => setUpdateDescription(event.target.value)}
            disabled={!isEdit}
          />

          {isEdit ? (
            <div className={style.confirmOrCancelContainer}>
              <button
                disabled={updateDescription === ''}
                onClick={() => {
                  handleEditTask(currentDescription, updateDescription);
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
                isChecked
                  ? `${style.editDescriptionButton} ${style.disabledButton}`
                  : `${style.editDescriptionButton} ${style.enableEditButton}`
              }
              disabled={isChecked}
            >
              <PencilSimple weight="fill" />
            </button>
          )}
        </form>
      </div>
      {!isEdit && (
        <button
          onClick={() => handleDeleteTask(currentDescription)}
          className={style.trashButton}
        >
          <Trash size={24} />
        </button>
      )}
    </div>
  );
}
