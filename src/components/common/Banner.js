import banner from '../images/banner.png'

const Banner = () =>{
    return (
        <div class="container">
            
            <div class="center-div slogan">
                <h3>
                    Now type with your Voice in <span class="animate-text"></span>
                </h3>
            </div>

            <div >
                <img class="col-sm-8 center-div" src={banner}/>
            </div>
        </div>
    );
}

export default Banner;