import Data  from './data'
import Settings from './settings'
import styles from '../styles/body.module.css'
import {useRef, useEffect, useState} from 'react'
import {cleanText, findTextOutBreakPoint} from '../src/init' 

const body = () => {

    const textIn = useRef("");
    const textOut = useRef("");

    const [globalText, updateGlobalText] = useState("")
    const [globalGrammar, updateGlobalGrammar] = useState("")

    const updateText = () => {
        let cleanedText = cleanText(textIn.current.value);
        updateGlobalText(cleanedText[0]);
        updateGlobalGrammar(cleanedText[1]);
    }

    function clearText(){
        textOut.current.value = ""
        textIn.current.value = ""
        updateText();
    }
    
    // make input text backwards
    function reverseText() {
        textIn.current.value = textIn.current.value.split("").reverse().join("");
        updateText();
    }
    
    function copyText() {
        var copyText = textOut.current;
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(copyText.value.slice(findTextOutBreakPoint(textOut.current.value)+1));
        alert("Copied the text");
    }
    
    function swapText(){
        textIn.current.value = textOut.current.value.slice(findTextOutBreakPoint(textOut.current.value)+1);
        textOut.current.value = ""
        updateText();
    }

    return (
        <div className={styles.body}>
            <div className={styles.content}>
                <Data text={globalText} textIn={textIn.current.value == null ? "" : textIn.current.value} className={styles.data}></Data>
                <textarea ref={textIn} onInput={updateText} className={styles.inputTextArea} placeholder="Input text here..."></textarea>
                <textarea ref={textOut} className={styles.outputTextArea} placeholder="Output text here..." disabled="disabled"></textarea>
                <Settings clear={clearText}reverse={reverseText}swap={swapText}copy={copyText} className={styles.optionsPanel}></Settings>
            </div>
        </div>
    )
}

export default body