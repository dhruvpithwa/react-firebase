import { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import banner from '../images/side-img2.jpg';

const ImageToText = () => {
    const [ocr, setOcr] = useState("");
    const [imageData, setImageData] = useState(null);
    const [progress, setProgress] = useState(0);
    const [language, setLanguage] = useState("eng")
    
   
    const convertImageToText = async () => {
        if (!imageData) return;
        
        await worker.load();
        await worker.loadLanguage(language);
        await worker.initialize(language);
        
        const { data: { text },} = await worker.recognize(imageData);
        setOcr(text);
    };

    const worker = createWorker({
        logger: (m) => {
        console.log(m);
        setProgress(parseInt(m.progress * 100));
        },
    });     

    useEffect(() => { convertImageToText();}, [imageData]);

    const handleImageChange = (e) =>{
        const file = e.target.files[0];
        if(!file) return;
        
        const reader = new FileReader();
        
        reader.onloadend = () => {
            const imageDataUri = reader.result;   
            setImageData(imageDataUri);
        };
        
        reader.readAsDataURL(file);
    }

    const selectLanguageHandler = (event) =>{
        setLanguage(event.target.value)
    }

    const selectTextHandler = (event)=>{
        setOcr(event.target.value)
    }

  return (
    
    <div class="container-fluid">
        
        <div class="subheader-text" id="imagetotext">
            Image to Text
        </div>

        <div class="row">
            <div class="center-div p-2">

                <span class="inline-div">
                    <span className="inline-div m-1">
                        <label>Choose Language: </label>
                    </span>
                    <span className="inline-div m-1">
                        <select className="form-control" onChange={selectLanguageHandler}>
                            <option value="en">English</option>
                            <option value="gu">Gujarati</option>
                            <option value="hi">Hindi</option>
                            <option value="mr">Marathi</option>
                        </select>
                    </span>
                </span>

                <span className="inline-div m-1">
                    <input 
                        type="file" 
                        className="form-control" 
                        onChange={handleImageChange}
                        accept="image/*" />
                </span>
        

                <div class="progress">
                    <div class="progress-bar" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: `${progress}%`}}>{progress}%</div>
                </div>
                
            </div>
        </div>

        <div className="row">

            <div className="col-sm-8 center-div p-2">
                <div class="form-group">
                    <textarea 
                        className="form-control text-justify p-3 times-roman" 
                        rows="10" 
                        placeholder="Output of Image to Text goes here ...!" 
                        value={ocr}
                        onChange={selectTextHandler}
                        />
                </div>
            </div>

        </div>
    </div>


  );
}
export default ImageToText;