
import InfoLogin from "../components/InfoLogin";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Login() {
    const navigate = useNavigate();

    useEffect(() => {
      const token = Cookies.get('token');
      if (token) {
        navigate('/examen', { replace: true });
      }
    }, [navigate]);
    return (
      <div className="App">
        <InfoLogin></InfoLogin>
      </div>
    );
  }
  
  export default Login;