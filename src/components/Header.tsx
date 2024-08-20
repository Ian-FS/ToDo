import style from './Header.module.css';
import rocket from '../assets/todo-icon.svg';
import toDo from '../assets/todo.svg';

export default function Header() {
  return (
    <header className={style.header}>
      <div className={style.logo}>
        <img src={rocket} alt="toDO icon" />
        <img src={toDo} alt="toDo" />
      </div>
    </header>
  );
}
