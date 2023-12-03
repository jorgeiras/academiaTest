// AuthContext.js
import React, { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Cookies from 'js-cookie';

const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const handleLogin = (email, password, setResultErrorMessage, setResultRequest) =>{
    const  url = "https://jorgeiras.pythonanywhere.com/api-token-auth/"
        axios.post(url,{
            username: email,
            password: password,
        }).then(response =>{
            if(response.data.token){
                setResultRequest(false);
                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + 1);
                Cookies.set('token', response.data.token,{ expires: expirationDate });
                navigate('/examen');
            }
            else{
                
            }
        }).catch(error => {
            console.error('Login failed:', error);
            if(!error.response.data){
              console.error('Login failed:', error);
            }
            else if(error.response.data.non_field_errors === 'Unable to log in with provided credentials.'){
                console.error('error de credenciales');
                setResultErrorMessage('Usuario o contraseña incorrecta');
                setResultRequest(true);
            }
            else if(error.response.data.username === 'This field may not be blank.'  || error.response.data.password === 'This field may not be blank.'){
                console.error('Fallo en blanco');
                setResultErrorMessage('Usuario o contraseña en blanco');
                setResultRequest(true);
            }
          })
  }

  const handleLogout = () =>{
    Cookies.remove('token');

    navigate('/login', { replace: true });
  }

  const value = {
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);