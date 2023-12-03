
import NavbarComp from '../components/NavBarComp';
import Footer from '../components/Footer';

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