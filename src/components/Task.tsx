import { Check, Trash } from '@phosphor-icons/react';
import style from './Task.module.css';

interface TaskProps {
  description: string;
  isChecked: boolean;
  handleDeleteTask: (deletedTask: string) => void;
  handleCheckTask: (description: string, isChecked: boolean) => void;
}
export default function Task({
  description,
  isChecked,
  handleCheckTask,
  handleDeleteTask,
}: Readonly<TaskProps>) {
  return (
    <div className={style.task}>
      <div className={style.taskInfo}>
        {isChecked ? (
          <button
            onClick={() => handleCheckTask(description, isChecked)}
            className={`${style.circleButton} ${style.checkedCircleButton}`}
          >
            <Check size={14} weight="bold" />
          </button>
        ) : (
          <button
            onClick={() => handleCheckTask(description, isChecked)}
            className={`${style.circleButton} ${style.uncheckedCircleButton}`}
          />
        )}
        <p className={isChecked ? style.checkedTaskText : ''}>{description}</p>
      </div>
      <button
        onClick={() => handleDeleteTask(description)}
        className={style.trashButton}
      >
        <Trash size={24} />
      </button>
    </div>
  );
}
