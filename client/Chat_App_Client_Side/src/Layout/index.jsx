import React from 'react';
import Logo from "../assets/logo.png"

const Auth_Layout = ({children}) => {
  return (
    <>
    
    <header className='flex justify-center items-center py-3 shadow-md bg-white'>
     <img src={Logo} alt="Logo" width={180} height={60}  />
    </header>
    
    {children}
    </>
  );
}

export default Auth_Layout;
