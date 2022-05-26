import React, { useState } from "react";
import { ReactTransliterate } from "react-transliterate";
import banner from '../images/side-img3.jpeg';

const Transliterate = () =>{

    const [text, setText] = useState("");
    const [language,setLanguage] = useState("en")
    
    const selectHandler = (event)=>{
        setLanguage(event.target.value);
    }
    
    return (
    
    <div className="container-fluid">

        <div className="subheader-text" id="transliteration">
          Transliteration
        </div>

        <div class="row">
            <div class="center-div p-2">

                <div class="form-group">
                    <span className="inline-div m-1">
                        <label>Choose Language: </label>
                    </span>
                    <span className="inline-div m-1">
                        <select className="form-control" onChange={selectHandler}>
                            <option value="en">English</option>
                            <option value="gu">Gujarati</option>
                            <option value="hi">Hindi</option>
                            <option value="mr">Marathi</option>
                        </select>
                    </span>
                </div>
            </div>
        </div>

        <div className="row">
          
            <div className="col-sm-8 center-div">
                <ReactTransliterate
                    renderComponent={(props) => <textarea className="form-control text-justify p-3 times-roman" rows={"10"} placeholder="Enter text to transliterate" {...props}/>}
                    value={text}
                    onChangeText={(text) => {
                        setText(text);
                    }}
                    lang={language}
                />
            </div>  
        </div>

    </div>
    );
}


export default Transliterate;