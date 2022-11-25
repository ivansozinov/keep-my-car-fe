import React, { useState } from 'react';
import axiosInstance from '../Utils/axiosInstance';
import { useMultistepForm } from '../Utils/useMultistepForm';
import { useToken } from '../Utils/useUserData';

import './Login.css';

const INITIAL_DATA = {
  email: "",
  code: "",
}

function FirstPart({
  email,
  updateFields,
}) {
  return (
    <>
      <label>Type email: </label>
      <input
        autoFocus
        required
        type="email"
        value={email}
        onChange={e => updateFields({ email: e.target.value })}
      />
    </>
  )
};

function SecondPart({
  code,
  updateFields,
}) {
  return (
    <>
      <label>Type code: </label>
      <input
        autoFocus
        required
        type="text"
        value={code}
        onChange={e => updateFields({ code: e.target.value })}
      />
    </>
  )
};

export default function Login() {
  const [data, setData] = useState(INITIAL_DATA)
  const { setToken } = useToken();
  function updateFields(fields) {
    setData(prev => {
      return { ...prev, ...fields }
    })
  }
  const { step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <FirstPart {...data} updateFields={updateFields} />,
      <SecondPart {...data} updateFields={updateFields} />
    ])

  function onSubmit(e) {
    e.preventDefault()
    if(isFirstStep) {
      axiosInstance.post('/login/getAuthCode', JSON.stringify(data))
      .then(response => {
        if(response.status === 201) {
          next();
        }
      });
    } else {
      axiosInstance.post('/login/auth', JSON.stringify(data))
      .then(response => {
        if(response.data.token) {
          setToken(response.data.token);
          window.location.reload();
        }
      });
    }
  }

  return(
    <section className="login-wrapper">
      <form onSubmit={onSubmit}>
        <section>
          {step}
        </section>
        
        {isLastStep && (
          <button type="button" onClick={back}>
            Back to email change
          </button>
        )}
        <button type="submit">{isLastStep ? "Auth" : "Send code"}</button>
      </form>
    </section>
  )
}