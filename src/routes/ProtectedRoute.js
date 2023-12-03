import {Navigate, Outlet} from 'react-router-dom';
import Cookies from 'js-cookie';
  
  export const ProtectedRoute = ({ children }) => {
    //const { token } = useAuth();
  
    const authToken = Cookies.get('token');
    //const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      return <Navigate to="/login" replace />;
    }
  
    return <Outlet/>;
  };

  