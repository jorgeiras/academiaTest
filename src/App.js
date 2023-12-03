import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExamBody from './components/ExamBody';
import { BrowserRouter, Route, Routes, Navigate  } from 'react-router-dom';
import MainRoute from './routes/MainRoute';
import Login from './routes/Login'
import Profile from './components/Profile';
import About from './components/About';
import { AuthProvider } from './context/AuthProvider';
import { ProtectedRoute } from './routes/ProtectedRoute';
import NoMatch from './components/NoMatch';
import Cookies from 'js-cookie';
import React from 'react';



function App() {


  return (
    <BrowserRouter basename="/academiaTest">
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login /> } />
          <Route path="/" element={<Navigate replace to={Cookies.get('token')  ? "/examen" : "/login"} />}/>
          {/* Protected routes */}
          <Route element={<ProtectedRoute/>}>
            <Route path="/examen" element={<MainRoute><ExamBody /></MainRoute>} />
            <Route path="/perfil" element={<MainRoute><Profile /></MainRoute>} />
            <Route path="/sobre_nosotros" element={<MainRoute><About /></MainRoute>} />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
