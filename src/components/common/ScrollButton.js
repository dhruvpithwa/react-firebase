import React, {useState} from 'react';

const ScrollButton = () =>{

const [visible, setVisible] = useState(false)

const toggleVisible = () => {
	const scrolled = document.documentElement.scrollTop;
	if (scrolled > 300){
	setVisible(true)
	}
	else if (scrolled <= 300){
	setVisible(false)
	}
};

const scrollToTop = () =>{
	window.scrollTo({
	top: 0,
	behavior: 'smooth'
	/* you can also use 'auto' behaviour
		in place of 'smooth' */
	});
};

window.addEventListener('scroll', toggleVisible);

return (
	<button onClick={scrollToTop} id="back-to-top" className="btn btn-dark btn-lg rounded-circle display-1" style={{display: visible ? 'inline' : 'none'}}>
        <b>&#8593;</b>
    </button>
);
}

export default ScrollButton;
