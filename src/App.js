import "./index.css";
import Home from './components/Home.js';
import Authentication from './components/Authentication.js';

import { useSelector } from "react-redux";


const App = () => {
  const isLoggedIn = useSelector((state)=> state.isLoggedIn)

  return (
    <div>
      { isLoggedIn && <Home/>}
      { isLoggedIn == false && <Authentication/> }

    </div>
  );
};

export default App;