import style from './App.module.css';
import Header from './components/Header';
import clipboard from './assets/Clipboard.svg';
import Task from './components/Task';
import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import axios from 'axios';
interface taskProps {
  id: string;
  description: string;
  done: boolean;
}
interface strapiDataProps {
  documentId: string;
  description: string;
  done: boolean;
}

function App() {
  const [taskList, setTaskList] = useState<Array<taskProps>>([]);
  const [description, setDescription] = useState('');
  const [isSuccessfulPost, setIsSuccessfulPost] = useState(false);
  const [isSuccessfulPatchChecked, setIsSuccessfulPatchChecked] =
    useState(false);
  const [isSuccessfulPatchDescription, setIsSuccessfulPatchDescription] =
    useState(false);
  const [isSuccessfulDelete, setIsSuccessfulDelete] = useState(false);

  useEffect(() => {
    axios
      .get('https://blessed-darling-a54a6fe8b6.strapiapp.com/api/tasks/')
      .then((res) => {
        const newTaskList = res.data.data.map((task: strapiDataProps) => {
          return {
            id: task.documentId,
            description: task.description,
            done: task.done,
          };
        });
        console.log(res);
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
  ]);

  async function handleCreateTask(event: React.FormEvent) {
    event.preventDefault();
    const newTask = {
      data: {
        description: description,
        done: false,
      },
    };

    await axios
      .post(
        'https://blessed-darling-a54a6fe8b6.strapiapp.com/api/tasks',
        newTask,
      )
      .then((res) => res.status === 201 && setIsSuccessfulPost(true));
    setDescription('');
  }
  async function handleDeleteTask(taskID: string) {
    await axios
      .delete(
        `https://blessed-darling-a54a6fe8b6.strapiapp.com/api/tasks/${taskID}`,
      )
      .then((res) => {
        if (res.status === 204) {
          console.log('deu certo');
          setIsSuccessfulDelete(true);
        }
      });
  }
  async function handleCheckTask(task: taskProps, done: boolean) {
    const updateTask = {
      data: {
        done: !done,
        description: task.description,
      },
    };
    await axios
      .put(
        `https://blessed-darling-a54a6fe8b6.strapiapp.com/api/tasks/${task.id}`,
        updateTask,
      )
      .then((res) => {
        if (res.status === 200) {
          console.log('deu certo');
          setIsSuccessfulPatchChecked(true);
        }
      });
  }
  async function handleEditTask(updateDescription: string, task: taskProps) {
    await axios
      .put(
        `https://blessed-darling-a54a6fe8b6.strapiapp.com/api/tasks/${task.id}`,
        {
          data: {
            description: updateDescription,
            done: task.done,
          },
        },
      )
      .then((res) => {
        if (res.status === 200) {
          console.log('deu certo');
          setIsSuccessfulPatchDescription(true);
        }
      });
  }

  return (
    <>
      <Header />
      <main className={style.main}>
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
      </main>
    </>
  );
}

export default App;
