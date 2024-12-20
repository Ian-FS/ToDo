import style from './index.module.css';
import clipboard from './../../assets/Clipboard.svg';
import Task from '../../components/Task';
import { useEffect, useState } from 'react';
import TaskForm from '../../components/TaskForm';
import axios from 'axios';

interface taskProps {
  id: string;
  description: string;
  done: boolean;
  userID: string;
}
interface strapiDataProps {
  documentId: string;
  description: string;
  done: boolean;
}

export default function TasksPage() {
  const [taskList, setTaskList] = useState<Array<taskProps>>([]);
  const [description, setDescription] = useState('');
  const [isSuccessfulPost, setIsSuccessfulPost] = useState(false);
  const [isSuccessfulPatchChecked, setIsSuccessfulPatchChecked] =
    useState(false);
  const [isSuccessfulPatchDescription, setIsSuccessfulPatchDescription] =
    useState(false);
  const [isSuccessfulDelete, setIsSuccessfulDelete] = useState(false);
  const token = localStorage.getItem('jwt-todo');
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const tasksEndPoint = import.meta.env.VITE_TASKS_ENDPOINT;
  const tasksURL = `${apiBaseUrl}${tasksEndPoint}`;

  useEffect(() => {
    axios
      .get(tasksURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const newTaskList = res.data.map((task: strapiDataProps) => {
          return {
            id: task.documentId,
            description: task.description,
            done: task.done,
          };
        });
        setTaskList(newTaskList);

        setIsSuccessfulPost(false);
        setIsSuccessfulPatchChecked(false);
        setIsSuccessfulPatchDescription(false);
        setIsSuccessfulDelete(false);
      });
  }, [
    isSuccessfulPost,
    isSuccessfulPatchChecked,
    isSuccessfulPatchDescription,
    isSuccessfulDelete,
    tasksURL,
    token,
  ]);

  async function handleCreateTask(event: React.FormEvent) {
    event.preventDefault();
    const newTask = {
      data: {
        description,
      },
    };

    await axios
      .post(tasksURL, newTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.status === 201 && setIsSuccessfulPost(true));
    setDescription('');
  }
  async function handleDeleteTask(taskID: string) {
    await axios
      .delete(`${tasksURL}/${taskID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 204) {
          console.log('deu certo');
          setIsSuccessfulDelete(true);
        }
      });
  }
  async function handleCheckTask(task: taskProps, done: boolean) {
    const token = localStorage.getItem('jwt-todo');
    const updateTask = {
      data: {
        done: !done,
        description: task.description,
      },
    };
    await axios
      .put(`${tasksURL}/${task.id}`, updateTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log('deu certo');
          setIsSuccessfulPatchChecked(true);
        }
      });
  }
  async function handleEditTask(updateDescription: string, task: taskProps) {
    const token = localStorage.getItem('jwt-todo');
    await axios
      .put(
        `${tasksURL}/${task.id}`,
        {
          data: {
            description: updateDescription,
            done: task.done,
          },
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((res) => {
        if (res.status === 200) {
          console.log('deu certo');
          setIsSuccessfulPatchDescription(true);
        }
      });
  }

  return (
    <div className={style.main}>
      <TaskForm
        setDescription={setDescription}
        description={description}
        handleCreateTask={handleCreateTask}
      />
      <div className={style.wrapperTasks}>
        <div className={style.tasksInfo}>
          <div className={style.createdTasks}>
            Pendentes{' '}
            <span className={style.counterTasks}>
              {taskList.filter((task) => task.done === false).length}
            </span>
          </div>
          <div className={style.completedTasks}>
            Concluídas{' '}
            <span className={style.counterTasks}>
              {taskList.filter((task) => task.done).length}
            </span>
          </div>
        </div>
        {taskList.length > 0 ? (
          <>
            <div className={style.tasksList}>
              {taskList
                .filter((task) => !task.done)
                .map((task) => (
                  <Task
                    task={task}
                    handleCheckTask={handleCheckTask}
                    handleDeleteTask={handleDeleteTask}
                    handleEditTask={handleEditTask}
                    key={task.description}
                    setDescription={setDescription}
                  />
                ))}
            </div>
            {taskList.filter((task) => task.done).length > 0 && (
              <div className={style.dividesLine} />
            )}
            <div className={style.tasksList}>
              {taskList
                .filter((task) => task.done)
                .map((task) => (
                  <Task
                    task={task}
                    handleCheckTask={handleCheckTask}
                    handleDeleteTask={handleDeleteTask}
                    handleEditTask={handleEditTask}
                    key={task.description}
                    setDescription={setDescription}
                  />
                ))}
            </div>
          </>
        ) : (
          <div className={style.noTasksList}>
            <img src={clipboard} alt="" />
            <div className={style.textInfo}>
              <p>Você ainda não tem tarefas cadastradas</p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
