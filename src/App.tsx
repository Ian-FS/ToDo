import style from './App.module.css';
import Header from './components/Header';
import clipboard from './assets/Clipboard.svg';
import Task from './components/Task';
import { useState } from 'react';
import TaskForm from './components/TaskForm';

interface taskProps {
  isChecked: boolean;
  description: string;
}

function App() {
  const [taskList, setTaskList] = useState<Array<taskProps>>([]);
  const [description, setDescription] = useState('');

  function handleCreateTask(event: React.FormEvent) {
    event.preventDefault();
    setTaskList((prevState) => [
      ...prevState,
      { isChecked: false, description: description },
    ]);
    setDescription('');
  }
  function handleDeleteTask(deleteddescription: string) {
    const newTaskList = taskList.filter(
      (task) => task.description !== deleteddescription,
    );
    setTaskList(newTaskList);
  }
  function handleCheckTask(description: string, isChecked: boolean) {
    const newTaskList = taskList.map((task) =>
      task.description === description
        ? { ...task, isChecked: !isChecked }
        : task,
    );

    setTaskList(newTaskList);
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
              Tarefas criadas{' '}
              <span className={style.counterTasks}>{taskList.length}</span>
            </div>
            <div className={style.completedTasks}>
              Concluídas{' '}
              <span className={style.counterTasks}>
                {taskList.filter((task) => task.isChecked).length}
              </span>
            </div>
          </div>
          {taskList.length > 0 ? (
            <div className={style.tasksList}>
              {taskList.map((task) => (
                <Task
                  description={task.description}
                  isChecked={task.isChecked}
                  handleCheckTask={handleCheckTask}
                  handleDeleteTask={handleDeleteTask}
                  key={task.description}
                />
              ))}
            </div>
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
