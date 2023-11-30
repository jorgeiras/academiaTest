
import NavbarComp from '../components/NavBarComp';
import ExamBody from '../components/ExamBody';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

function MainRoute({ children }) {
  return (
    <div className="App">
      <NavbarComp />
      <main>{children}</main> {/* This is where the routed content will be injected */}
      <Footer />
    </div>
  );
}

export default MainRoute;