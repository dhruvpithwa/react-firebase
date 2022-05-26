import ScrollButton from "./ScrollButton.js";

const Footer = ()=>{
    return(
        <div className="container-fluid" id="subscribe">
            <ScrollButton />

            <br/>
            
            <div className="subheader-text">
            Subscribe
            </div>

            <br/><br/>

            <footer className="page-footer font-small pt-4" id="subscribe">

            <div className="container">

                <ul className="list-unstyled list-inline text-center">
                <li className="list-inline-item">
                    <a className="btn-floating btn-fb mx-1">
                    <i className="fa fa-facebook-f"> </i>
                    </a>
                </li>
                <li className="list-inline-item">
                    <a className="btn-floating btn-gplus mx-1">
                    <i className="fa fa-google-plus"> </i>
                    </a>
                </li>
                <li className="list-inline-item">
                    <a className="btn-floating btn-fb mx-1">
                    <i className="fa fa-instagram"> </i>
                    </a>
                </li>
                </ul>

                <ul className="list-unstyled list-inline text-center text-primary">
                <li className="list-inline-item">
                shrutlekhacare@gmail.com
                </li>
                <li className="list-inline-item">
                    +91 - 797 732 9292
                </li>
                </ul>

            </div>

            <div className="footer-copyright text-center py-3">© 2020 Copyright:
                <a href="https://mdbootstrap.com/"> Shrutlekha.com</a>
            </div>
            
            </footer>
        </div>
    );
}


export default Footer;