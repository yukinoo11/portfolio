import React, { useState } from "react";
import styles from './LoginForm.module.scss';
import axios from 'axios';
import { Redirect } from "react-router-dom";

const LoginForm  = () =>{
  const [password, setPassword] = useState("");
  const [userID, setUserID] = useState("");


  const handleClick = () => {
    try {
    //등록하기
      axios.post('/api/admin/login', { userID, password })
        .then(res => {
          console.log('login');
          const { accessToken } = res.data;
          // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          // accessToken을 localStorage, cookie 등에 저장하지 않는다!
        })
        .catch(res => {
          alert("Failed to login");
          setUserID("");
          setPassword("");
        });
    } catch (e) {
      alert("Failed to login");
      setUserID("");
      setPassword("");
    }
  };

  return (
    <form>
      <div className={styles.loginForm}>
        <h1>주인장만 로그인하시오</h1>
        <div className={styles.loginImg}>
        </div>
        <input className={styles.input}
          value={userID}
          onChange={({ target: { value } }) => setUserID(value)}
          type="password"
          autoComplete ='off'
          placeholder="email"
        />
        <input className={styles.input}
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
          type="password"
          autoComplete ='off'
          placeholder="password"
        />
        <button type='button' className='btn' onClick={handleClick}>Login</button>
        </div>
      </form>
  );
}

export default LoginForm;