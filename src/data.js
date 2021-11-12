import {observedCount, expectedCount, getKeyLength} from "./init";

var IoC = 0;
var Chi = 0;
var likely = "unknown"

function chiHelper(o,e){
    return (o - e)**2/e;
}

function chiTest(text){
    let o = observedCount(text);
    let e = expectedCount(text.length);
    let sum = 0;
    for(let i = 0; i < 26; i++){
        sum += chiHelper(o[i],e[i]);
    }
    return Math.sqrt(sum);
}

function indexOfCoincidence(text){
    let o = observedCount(text);
    let n = 0;
    let sum = 0;
    for (let i = 0; i < 26; i++){
        sum += o[i] * (o[i] - 1);
        n += o[i];
    }
    let N = (n * (n - 1))/26;
    return (sum / N) / 26;
}

function determineCipher(text){
    let c = chiTest(text);
    if (c < 120){
        return "Transposition";
    }
    let i = indexOfCoincidence(text);
    if (i >= 0.064 && i <= 0.069){
        return "Substitution";
    }
    let k = getKeyLength(text)
    if (k != 0){
        return "Vigenere"
    }
    return "idk lol";
}

function updateDataValues(text){
    if (text.length > 1){
        IoC = Number(Math.round(indexOfCoincidence(text)+'e4')+'e-4');
        Chi = Number(Math.round(chiTest(text)+'e2')+'e-2');
    }else{
        IoC = 0;
        Chi = 0;
    }
    likely = determineCipher(text);

    return {
        likely : likely,
        IoC : IoC,
        Chi : Chi
    }
}

export default updateDataValues
export {indexOfCoincidence}