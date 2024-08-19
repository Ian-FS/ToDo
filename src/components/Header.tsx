import style from './Header.module.css';
import rocket from '../assets/rocket.svg';
import toDo from '../assets/todo.svg';

export default function Header() {
  return (
    <header className={style.header}>
      <div className={style.logo}>
        <img src={rocket} alt="rocket" />
        <img src={toDo} alt="toDo" />
      </div>
    </header>
  );
}
