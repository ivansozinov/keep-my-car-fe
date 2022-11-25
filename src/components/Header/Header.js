import React from 'react';
import { useToken } from '../Utils/useUserData';
import './Header.css';

export default function Header(props) {
  const { setToken } = useToken();
  const handleLogout = async () => {
    setToken('');
    window.location.reload();
  }

  return(
    <section className="header-wrapper">
      <p>{props.userData.name} =&gt; {props.userData.email} <button onClick={e => handleLogout()}>Logout</button></p>
    </section>
  )
}