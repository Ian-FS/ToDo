import style from './Header.module.css';
import toDo from '../assets/todo.svg';
import { SignOut } from '@phosphor-icons/react';

export default function Header() {
  function handleLogOut() {
    localStorage.removeItem('jwt-todo');
    window.location.reload();
  }
  return (
    <header className={style.header}>
      <div className={style.wrapperLogOut}>
        {localStorage.getItem('jwt-todo') ? (
          <button
            className={style.logOutButton}
            type="submit"
            onClick={handleLogOut}
          >
            Log out <SignOut className={style.iconPhospor} />
          </button>
        ) : null}
      </div>
      <div className={style.logo}>
        {/* <img src={rocket} alt="toDO icon" /> */}
        <img src={toDo} alt="toDo" />
      </div>
    </header>
  );
}
