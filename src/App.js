import React from 'react';
import './App.css';
import useUserData from './components/Utils/useUserData';
import Login from './components/Login/Login';
import Loading from './components/Loading/Loading';
import Cars from './components/Cars/Cars';
import Header from './components/Header/Header';

export default function App() {

  const { isUserLoading, userData } = useUserData();

  console.log(userData);
  
  return(
    <div className="App">
      {isUserLoading 
       ? <Loading />
       : !userData
        ? <Login />
        : <>
          <Header userData={userData} />
          <Cars />
        </>
      }
    </div>
  )
}