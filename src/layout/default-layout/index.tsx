import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import style from './index.module.css';

export default function DefaultLayout() {
  return (
    <div>
      <Header />
      <main className={style.main}>
        <Outlet />
      </main>
    </div>
  );
}
