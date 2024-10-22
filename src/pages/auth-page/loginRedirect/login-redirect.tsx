import axios from 'axios';
import style from './login-redirect.module.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/useAuth';
import { Mosaic } from 'react-loading-indicators';

export default function LoginRedirect() {
  const { setIsAuthenticated } = useAuth();
  const [text, setText] = useState('Carregando...');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    axios
      .get(`${apiBaseUrl}/auth/google/callback${location.search}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
        }
        return res;
      })
      .then((response) => {
        localStorage.setItem('jwt-todo', response.data.jwt);
        setIsAuthenticated(true);
        setText(
          'Você se conectou com sucesso. Em poucos minutos você será redirecionado.',
        );
        setTimeout(() => navigate('/tasks'), 3000);
      })
      .catch((error) => {
        console.log(error);
        setText('An error occurred, please see the developer console.');
      });
  }, [navigate, location, setIsAuthenticated]);

  return (
    <div className={style.loadingWrapper}>
      <Mosaic color="#5e60ce" size="large" text="" />
      {text}
    </div>
  );
}
