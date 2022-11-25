import React, { useState } from 'react';
import axiosInstance from '../Utils/axiosInstance';
import { useToken } from '../Utils/useUserData';

import './Login.css';

export function Login({ setUser }) {
  const [email, setEmail] = useState();
  const [code, setCode] = useState();
  const [emailApproved, setEmailApproved] = useState(false);
  const { setToken } = useToken();

  const handleEmailSubmit = async e => {
    e.preventDefault();
    axiosInstance.post('/login/getAuthCode', JSON.stringify({
      email
    }))
    .then(response => {
      console.log(response.status);
      if(response.status === 201) {
        setEmailApproved(true);
      }
      console.log(emailApproved);
    });
  }

  const handleLogin = async e => {
    e.preventDefault();
    axiosInstance.post('/login/auth', JSON.stringify({
      email,
      code
    }))
    .then(response => {
      if(response.data.token && emailApproved) {
        setToken(response.data.token);
        window.location.reload();
      }
    });
  }

  return(
    <section className="login-wrapper">
      <form onSubmit={!emailApproved ? handleEmailSubmit : handleLogin}>
        {!emailApproved && 
          <section className='login-first-part'>
            <input placeholder='Enter your email' type="email" onChange={e => setEmail(e.target.value)}/>
            <button type="submit">Send code to email</button>
          </section>
        }
        {emailApproved &&
          <section className='login-second-part'>
            <input placeholder='Enter code' type="number" onChange={e => setCode(e.target.value)}/>
            <button type="submit">Send code</button>
          </section>
        }
        
      </form>
    </section>
  )
}