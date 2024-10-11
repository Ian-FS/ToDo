import { Outlet } from 'react-router-dom';
import Header from '../../components/header';
import style from './index.module.css';
import { Analytics } from '@vercel/analytics/react';

export default function DefaultLayout() {
  const isAuthenticated = () => {
    return localStorage.getItem('jwt-todo') !== null;
  };
  return (
    <div>
      {isAuthenticated() ? <Header /> : null}
      <main className={style.main}>
        <Outlet />
        <Analytics />
      </main>
    </div>
  );
}
