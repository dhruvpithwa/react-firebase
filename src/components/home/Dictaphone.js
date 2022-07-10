import { useDispatch } from "react-redux";
import React, {useState, useRef, useEffect } from 'react';
import banner from '../images/side-img1.jpg';
import { isUserActive } from "../../store/index"

const Dictaphone = () => {
  const textareaElement = useRef(null);
  const dispatch = useDispatch();
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; 
  const speechRecognizerObj = new SpeechRecognition();

  const [speechRecognizer, setSpeechRecognizer] = useState(speechRecognizerObj);
  

  const [language, setLanguage] = useState()
  const [font, setFont] = useState('times-roman')
  const [listeningState, setListeningState] = useState('Start Listening')
  const [output, setOutput] = useState()
  const [speechToTextClass, setSpeechToTextClass] = useState('btn btn-warning')
  const [textClass, setTextClass] = useState('form-control text-justify p-3')
  const [isBold, setBold] = useState(false);
  const [isItalic, setItalic] = useState(false);
  const [isUnderline, setUnderline] = useState(false);
  
  const placeholder = `Welcome to Speech To Text Translation Section...
To start translating your speech, press Start Listening button and speak!`  
  
    useEffect(()=>{
      const area = textareaElement.current;
      area.scrollTop = area.scrollHeight;
    })

    const selectHandler = (event) => {
      setLanguage(event.target.value)
    }

    const setCustomFont = (event) => {
      if(event.target.value === "timesRoman"){
        setFont('times-roman')
      }
      else if(event.target.value === "krutidev010"){
        setFont('krutidev010')
      }
      else if(event.target.value === "krutidev040"){
        setFont('krutidev040')
      }
      else if(event.target.value === "krutidev055"){
        setFont('krutidev055')
      }
      else if(event.target.value === "shivaji01"){
        setFont('shivaji01')
      }
      else if(event.target.value === "shivaji05"){
        setFont('shivaji05')
      }
    }

    const speechToText = () => {
      
      const token = localStorage?.getItem("getUserAuthToken") ?? ''
      dispatch(isUserActive({
        token:token
      }))
      
      if(listeningState === 'Stop Listening')
      {
        stopConverting() 
        setListeningState('Start Listening')
        setSpeechToTextClass('btn btn-warning')
      }
      else{
        startConverting()
        setListeningState('Stop Listening')
        setSpeechToTextClass('btn btn-danger')
      }
    }

    const startConverting = () =>{
    
      if('webkitSpeechRecognition' in window){

          
          speechRecognizer.continuous = true
          speechRecognizer.interimResults = true
          speechRecognizer.lang = language
          speechRecognizer.start();
          
          let finalTranscripts = output
          
          speechRecognizer.onresult = (event) => {
              
              let interimTranscripts = '';
              for(let i = event.resultIndex; i < event.results.length; i++)
              {
                  let transcript = event.results[i][0].transcript;
                  transcript.replace("\n", "<br>")
              
                  if(event.results[i].isFinal){
                  finalTranscripts += transcript
                  }
                  else{
                  interimTranscripts += transcript
                  }
              }
              
              const updateOp = finalTranscripts + interimTranscripts
              setOutput(updateOp); 
          };
        }
      }
        
    const stopConverting = () => {
      speechRecognizer.stop();
      console.log("stop converting called")
    }

    const updateOutput = (event) => {
      setOutput(event.target.value)
      console.log("changed")
      if(listeningState === 'Stop Listening')
      {
        stopConverting() 
        setListeningState('Start Listening')
        setSpeechToTextClass('btn btn-warning')
      }
      
    }

    
    const clearOutput = () => {
      setOutput('')
    }

    const download = () => {
      const element = document.createElement("a");
      const file = new Blob([output], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = "download.doc";
      document.body.appendChild(element); 
      element.click();
    }

    const print = () => {
      let childWindow = window.open('','childWindow','location=yes, menubar=yes, toolbar=yes');
      childWindow.document.open();
      childWindow.document.write('<html><head></head><body>');
      childWindow.document.write(output.replace(/\n/gi,'<br>'));
      childWindow.document.write('</body></html>');
      childWindow.print();
      childWindow.document.close();
      childWindow.close();
    }

    const copy = () =>{
      navigator.clipboard.writeText(output)
    }

    const bold = () =>{
      if(isBold){
        setBold(false)
        const oldTextclass = textClass
        setTextClass(oldTextclass.replace('font-weight-bold', ''))
      }
      else{
        setBold(true)
        const oldTextclass = textClass
        setTextClass(`${oldTextclass} font-weight-bold`)
      }
    }

    const italic = () =>{
      if(isItalic){
        setItalic(false)
        const oldTextclass = textClass
        setTextClass(oldTextclass.replace('font-italic', ''))
      }
      else{
        setItalic(true)
        const oldTextclass = textClass
        setTextClass(`${oldTextclass} font-italic`)
      }

    }

    const underline = () =>{
      if(isUnderline){
        setUnderline(false)
        const oldTextclass = textClass
        setTextClass(oldTextclass.replace('font-underline', ''))
      }
      else{
        setUnderline(true)
        const oldTextclass = textClass
        setTextClass(`${oldTextclass} font-underline`)
      }

    }

  return (
    
    <div className="container-fluid" >

        <div className="subheader-text" id="speechtotext">
          Voice Dictation
        </div>
        
        <div className="row">
            
            <div class="center-div p-2">
              
              <span className="inline-div">
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
              </span>

              <span className="inline-div">
                  <span className="inline-div m-1">
                    <label>Custom Font: </label>
                  </span>
                  <span className="inline-div m-1">
                    <select className="form-control" onChange={setCustomFont}>
                    <option value="timesRoman">Times Roman</option>
                      <option value="krutidev010">Kruti Dev 010</option>
                      <option value="krutidev040">Kruti Dev 040</option>
                      <option value="krutidev055">Kruti Dev 055</option>
                      <option value="shivaji01">Shivaji 01</option>
                      <option value="shivaji05">Shivaji 05</option>
                    </select>
                  </span>
              </span>
            
              <span className="inline-div">
                <button type="button" id="record" className={`m-1 ${speechToTextClass}`} onClick={speechToText}>
                  {listeningState}
                </button>
              </span>


              <span className="inline-div">
                <button type="button" className="btn btn-warning m-1" onClick={download}>
                  Download
                </button>
              </span>
            
              <span className="inline-div">
                <button type="button" className="btn btn-warning m-1" onClick={print}>
                  Print
                </button>
              </span>

              <span className="inline-div">
                <button type="button" className="btn btn-warning m-1" onClick={copy}>
                  Copy
                </button>
              </span>

              <span className="inline-div">
                <button type="button" className="btn btn-warning m-1" onClick={clearOutput}>
                  Clear
                </button>
              </span>
            
            </div>
        </div>

        <br></br>

        <div className="row">

              <div className="col-sm-8 center-div border">
                
                <div class="row m-2 p-2">
                  <button type="button" className="btn btn-light ml-1 mr-1" onClick={bold}><b>B</b></button>
                  <button type="button" className="btn btn-light ml-1 mr-1" onClick={italic}><b><i>I</i></b></button>
                  <button type="button" className="btn btn-light ml-1 mr-1" onClick={underline}><b><u>U</u></b></button>
                </div> 
                
                <div class="form-group p-2 m-2">
                  <textarea 
                    ref={textareaElement}
                    className={`${textClass} ${font}`} 
                    rows="15" 
                    placeholder={placeholder} 
                    value={output} 
                    onChange={updateOutput}
                    ></textarea>
                  </div>
              </div>
        </div>
    </div>
  );
};

export default Dictaphone;