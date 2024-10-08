import style from './Header.module.css';
import rocket from '../assets/todo-icon.svg';
import toDo from '../assets/todo.svg';

export default function Header() {
  function handleLogOut() {
    localStorage.removeItem('jwt-todo');
    window.location.reload();
  }
  return (
    <header className={style.header}>
      <div className={style.logo}>
        <img src={rocket} alt="toDO icon" />
        <img src={toDo} alt="toDo" />
      </div>
      {localStorage.getItem('jwt-todo') ? (
        <button type="submit" onClick={handleLogOut}>
          Log out
        </button>
      ) : null}
    </header>
  );
}
