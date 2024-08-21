import style from './App.module.css';
import Header from './components/Header';
import clipboard from './assets/Clipboard.svg';
import Task from './components/Task';
import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import axios from 'axios';
import { GOOGLE_SHEET_API_LINK } from './config/api';
interface taskProps {
  description: string;
  isChecked: boolean;
}
interface googleSheetDataProps {
  description: string;
  isChecked: string;
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
    axios.get(GOOGLE_SHEET_API_LINK).then((res) => {
      const newTaskList = res.data.map((task: googleSheetDataProps) => {
        return {
          description: task.description,
          isChecked: task.isChecked === 'TRUE',
        } as taskProps;
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
  ]);

  async function handleCreateTask(event: React.FormEvent) {
    event.preventDefault();
    const newTask = { description: description, isChecked: 'false' };

    await axios
      .post(GOOGLE_SHEET_API_LINK, newTask)
      .then((res) => res.status === 200 && setIsSuccessfulPost(true));
    setDescription('');
  }
  async function handleDeleteTask(deletedDescription: string) {
    await axios
      .delete(
        `https://sheet.best/api/sheets/b0000182-2518-429c-b6a5-a9ad2070875f/description/*${deletedDescription}*`,
      )
      .then((res) => {
        if (res.status === 200) {
          console.log('deu certo');
          setIsSuccessfulDelete(true);
        }
      });
  }
  async function handleCheckTask(description: string, isChecked: boolean) {
    await axios
      .patch(
        `https://sheet.best/api/sheets/b0000182-2518-429c-b6a5-a9ad2070875f/description/*${description}*`,
        { isChecked: !isChecked ? 'TRUE' : 'FALSE' },
      )
      .then((res) => {
        if (res.status === 200) {
          console.log('deu certo');
          setIsSuccessfulPatchChecked(true);
        }
      });
  }
  async function handleEditTask(
    currentDescription: string,
    updateDescription: string,
  ) {
    await axios
      .patch(
        `https://sheet.best/api/sheets/b0000182-2518-429c-b6a5-a9ad2070875f/description/*${currentDescription}*`,
        { description: updateDescription },
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
                {taskList.filter((task) => task.isChecked === false).length}
              </span>
            </div>
            <div className={style.completedTasks}>
              Concluídas{' '}
              <span className={style.counterTasks}>
                {taskList.filter((task) => task.isChecked).length}
              </span>
            </div>
          </div>
          {taskList.length > 0 ? (
            <>
              <div className={style.tasksList}>
                {taskList
                  .filter((task) => !task.isChecked)
                  .map((task) => (
                    <Task
                      currentDescription={task.description}
                      isChecked={task.isChecked}
                      handleCheckTask={handleCheckTask}
                      handleDeleteTask={handleDeleteTask}
                      handleEditTask={handleEditTask}
                      key={task.description}
                      setDescription={setDescription}
                    />
                  ))}
              </div>
              {taskList.filter((task) => task.isChecked).length > 0 && (
                <div className={style.dividesLine} />
              )}
              <div className={style.tasksList}>
                {taskList
                  .filter((task) => task.isChecked)
                  .map((task) => (
                    <Task
                      currentDescription={task.description}
                      isChecked={task.isChecked}
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
