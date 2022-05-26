import shrutlekhaLogo from '../images/shrutlekha.png';
import { useSelector } from 'react-redux';

const Header = () =>{
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const isAdmin = useSelector(state => state.isAdmin);

    return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand text-primary header-text font-weight-bold" href="#">
            <img src={shrutlekhaLogo} width="200"/>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>  
        {isLoggedIn && <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto text-uppercase">
                <li className="nav-item">
                    <a className="nav-link font-weight-bold" href="#aboutus">About Us</a>
                </li>
                <li className="nav-item font-weight-bold">
                    <a className="nav-link" href="#speechtotext">Voice Dictation</a>
                </li>
                <li className="nav-item font-weight-bold">
                    <a className="nav-link" href="#transliteration">Transliteration</a>
                </li>
                <li className="nav-item font-weight-bold">
                    <a className="nav-link" href="#imagetotext">Image to Text</a>
                </li>
                { isAdmin && 
                    <li className="nav-item font-weight-bold">
                        <a className="nav-link" href="#register">Register</a>
                    </li>
                }
                <li className="nav-item font-weight-bold">
                    <a className="nav-link" href="#subscribe">Subscribe</a>
                </li>
            </ul>
        </div>}
        {!isLoggedIn && <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto text-uppercase">
                <li className="nav-item">
                    <a className="nav-link font-weight-bold" href="#aboutus">About Us</a>
                </li>
                <li className="nav-item font-weight-bold">
                    <a className="nav-link" href="#login">Login</a>
                </li>
                <li className="nav-item font-weight-bold">
                    <a className="nav-link" href="#subscribe">Subscribe</a>
                </li>
            </ul>
        </div>}
  </nav>
  );
}

export default Header;