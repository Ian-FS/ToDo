import style from './index.module.css';
import toDo from '/todo.svg';
import LogOutButton from '../button-log-out';

export default function Header() {
  return (
    <header className={style.header}>
      <div className={style.wrapperInfo}>
        <LogOutButton />
        <div className={style.logo}>
          <img src={toDo} alt="toDo" />
        </div>
      </div>
    </header>
  );
}
