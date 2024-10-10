import { useNavigate } from 'react-router-dom';
import style from './index.module.css';
import { SignOut } from '@phosphor-icons/react';

export default function LogOutButton() {
  const navigate = useNavigate();
  function handleLogOut() {
    localStorage.removeItem('jwt-todo');
    navigate('/');
  }
  return (
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
  );
}
