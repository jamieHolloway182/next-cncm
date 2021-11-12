import {alphaDict, ALPHA, check} from './dependencies'
import {indexOfCoincidence} from './data'

function cleanText(text){
    let a = [];
    let b= {};
    let c = [];
    for (let i = 0; i < text.length; i++){
        let char = text[i];
        if (char.toUpperCase() in alphaDict) {
            if (char == char.toUpperCase()){
                c.push(true);
            }else{
                c.push(false)
            }
            a.push(alphaDict[char.toUpperCase()]);
        }else{
            b[i] = char;
        }
    }
    return [a,b,c]
}

function findTextOutBreakPoint(text){
    let findBreakText = text;
    let num = 0;
    for (let i = 0 ; i < findBreakText.length; i++){
        if(findBreakText[i] == '\n'){
            num ++;
        }
        if (num == 2){
            return i;
        }
    }
    return 0;
}

function input(f){
    textOut.value = "";
    if(!(textIn.value) == ''){
        let s = Date.now();
        let out = f();
        let e = Date.now();
        Time.innerHTML = (e - s) + "ms";
        return out;
    }else{
        alert("Enter text into input box first")
    }
}

function output(text){
    text = addGrammar(text).map((char, index) => index in globalGrammar ? globalGrammar[index] : ALPHA[char]).join("");
    text = "Key : " + key + "\n\n" + text;
    if(!(textOut.value == text)){
        textOut.value += text + "\n";
    }
    setKey();
}

function observedCount(text){
    let o = {};
    for (let i = 0; i < 26; i++){
        o[i] = 0;
    }
    for (let i = 0; i <text.length; i++){
        o[text[i]] ++;
    }
    return o;
}

function expectedCount(t){
    let e = [];
    for(let a in ALPHA){
        e.push(check[ALPHA[a]] * t);
    }
    return e;
}

function getKeyLength(text){
    let limit = 16;
    let keyLength = 0; 
    let highestAvg = 0;
    let ioc = 0;
    for (let step = 2; step < limit; step++){
        let sum = 0;
        let allVals = returnEveryNth(text, step);     
        for (let i of allVals){
            sum += indexOfCoincidence(i);
        }
        let avg = sum/step;
        if ((avg > ioc && avg > 0.55|| avg > 0.055 && step > keyLength) && (avg > highestAvg)){
            highestAvg = avg;
            keyLength = step;
        }
    }
    return keyLength;
}

function returnEveryNth(text, step){
    let allVals = [];
    for (let x = 0; x < step; x++){
        allVals.push([])
    }
    for (let i =0; i < text.length; i++){
        allVals[i %step].push(text[i])
    }
    return allVals;
}

export default () => {console.log("hey")}
export {cleanText, findTextOutBreakPoint, observedCount, expectedCount, getKeyLength}