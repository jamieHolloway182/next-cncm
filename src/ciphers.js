function caesarEncrypt(text = globalText.slice(0,globalText.length)){
    // with key
    if (!key == ''){
        let thisKey = parseInt(key);
        if (thisKey >= 0){
            key = thisKey;
            return caesarShift(text, parseInt(thisKey));
        }
        else{
            alert("Incorrect key input, using automatic...");
        }
    }

    // keyless
    let n = rand(0,26);
    key = n;
    return caesarShift(text, n);   
}

function caesarDecrypt(text = globalText.slice(0,globalText.length)){
    // with key
    if (!key == ''){
        let n = parseInt(key);
        if (n > 0){
            key = n;
            return caesarShift(text, (26 - mod(n,26)));
        }
        else{
            alert("Incorrect key input, using automatic...");
        }
    }

    // keyless
    for (let i = 0; i < 26; i ++) {
        let t = caesarShift(text, i);
        if (isEnglish(t)){
            key = 26 - i;
            return t;
        }
    }
}

function affineEncrypt(text = globalText.slice(0,globalText.length)){
    //with key
    if (!key == ''){
        let k = key.split("");
        let s = k.indexOf(",");
        k = k.join("");
        let n1 = parseInt(k.substring(0,s));
        let n2 = parseInt(k.substring(s+1));
        if (n1 >= 0 && n2 >= 0){
            key = n1 + "n+" + n2;
            return affineShiftEncrypt(text, n1, n2);
        }
        else{
            alert("Incorrect key input, using automatic...");
        }
    }

    // keyless
    let n1 = rand(0,12) * 2 + 1;
    let n2 = rand(0,26);
    while(n1 == 13){
        n1 = rand(0,12) * 2 + 1;
    }
    key = n1 + "n+" + n2;
    return affineShiftEncrypt(text, n1, n2);
}

function affineDecrypt(text = globalText.slice(0,globalText.length)){
    // with key
    if (!key == ''){
        let k = key.split("");
        let s = k.indexOf(",");
        k = k.join("");
        let n1 = parseInt(k.substring(0,s));
        let n2 = parseInt(k.substring(s+1));
        if (n1 >= 0 && n2 >= 0){
            key = n1 + "n+" + n2;
            return affineShiftEncrypt(text, n1, n2);
        }
        else{
            alert("Incorrect key input, using automatic...");
        }
    }
    
    // keyless 
    for (let i = 1; i < 13; i ++) {
        for (let x = 0; x <26; x++){
            let t = affineShift(text, i, x);
            if (isEnglish(t)){
                key = i + "n+" + x;
                return t;
            }
        } 
    }
    return text;
}

function substitutionAEncrypt(text = globalText.slice(0,globalText.length)){
    //
    if (!key == ''){
        if (key.length <= 26){
            return applySubstitutionKey(text, generateFullKey(key).map((char) => alphaDict[char]));
        }else{
            alert("Incorrect key input, using random key...");
        }
    }

    //keyless
    key = ALPHA.map((value) => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value).map((char) => alphaDict[char]);
    return applySubstitutionKey(text, key); //generates random key using ALPHA
}

function substitutionADecrypt(text = globalText.slice(0,globalText.length)){
    //with key
    if (!key == ''){
        return applySubstitutionKey(text, generateFullKey(key).map((char) => alphaDict[char]));
    }
    //keyless - 0.133s
    for (let i = 0; i < 5; i++){
        text =substitutionCipher(text);
        if (isEnglish(text)){
            return text;
        }
    }
    return substitutionCipher(text);
}

function substitutionMEncrypt(text = globalText.slice(0,globalText.length)){
    // with key
    if (!key == ''){
        let subKey = ALPHA.slice(0).map((char) => alphaDict[char]);
        let thisKey = key.split(",").map((char)=>char.split(":"));
        if(thisKey.every((swap) => swap.length == 2 && swap.every((char)=> char.toUpperCase() in alphaDict))){
            for (pair of thisKey){
                subKey[alphaDict[pair[0].toUpperCase()]] = alphaDict[pair[1].toUpperCase()];
            }
            return applySubstitutionKey(text, subKey);
        };
    }
    return text;
}

function substitutionMDecrypt(text = globalText.slice(0,globalText.length)){
    return substitutionADecrypt(text);
}

function transpositionSEncrypt(text = globalText.slice(0,globalText.length)){
    // with key
    if (!key == ''){
        if (key.split("").every((char) => char.toUpperCase() in alphaDict)){
            let thisKey = key.split("").map((char)=>alphaDict[char.toUpperCase()]);
            if (text.length % thisKey.length ==0){
                return applyTranspositionKey(text, thisKey);
            }else{
                alert("Key length must be a factor of text length, using random key...")
            }  
        }else if (key.split(",").every((char) => parseInt(char) >= 0)){
            let thisKey = key.split(",").map((char)=>parseInt(char));
            if (text.length % thisKey.length ==0){
                return applyTranspositionKey(text, thisKey);
            }else{
                alert("Key length must be a factor of text length, using random key...")
            }  
        }else{
            alert("Incorrect key input, using random key...")
        }
    }

    //keyless
    randNum = rand(5,15);
    key = Array.from(Array(randNum).keys()).map((value) => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value);
    text = [...text, ...Array(randNum - (text.length % randNum)).fill(23)]
    return applyTranspositionKey(text, key); //need to add random generating transpo key
}

function transpositionSDecrypt(text = globalText.slice(0,globalText.length)){
    // with key
    if (!key == ''){
        if (key.split("").every((char) => char.toUpperCase() in alphaDict)){
            let thisKey = key.split("").map((char)=>alphaDict[char.toUpperCase()]);
            if (text.length % thisKey.length ==0){
                return applyTranspositionKey(text, thisKey);
            }else{
                alert("Key length must be a factor of text length, using automatic decrypt...")
            }  
        }else if (key.split(",").every((char) => parseInt(char) >= 0)){
            let thisKey = key.split(",").map((char)=>parseInt(char));
            if (text.length % thisKey.length ==0){
                return applyTranspositionKey(text, thisKey);
            }else{
                alert("Key length must be a factor of text length, using automatic decrypt...")
            }  
        }else{
            alert("Incorrect key input, using automatic decrypt...")
        }
    }

    //keyless 
    let correct = [text, 1000000];
    for (let i = 2; i < 20; i++){
        if (true){//text.length % i == 0){
            let s = transpositionHillClimb(text,i);
            if(isEnglish(s)){
                if (bigramTest(s) < correct[1]){
                    correct =[s, bigramTest(s)]
                }
            }
        }
    }
    return correct[0];
}

function transpositionCEncrypt(text = globalText.slice(0,globalText.length)){
    //keyless
    return col
}

function transpositionCDecrypt(text = globalText.slice(0,globalText.length)){
    //keyless
    let correct = [text, 1000000];
    for (let i =2; i < 20; i++){
        if (text.length % i ==0){
            let s = transpositionHillClimb(columnsToTransposition(text, i), i);
            if (isEnglish(s)) {
                if (bigramTest(s) < correct[1]){
                    correct =[s, bigramTest(s)]
                }
            }
        }
    }
    return correct[0];
}

function vigenereEncrypt(text = globalText.slice(0,globalText.length)){
    // with key
    if (!key == ''){
        if (key.split("").every((char) => char.toUpperCase() in alphaDict)){
            return putVigenereTogether(text, key.split("").map((char) => alphaDict[char.toUpperCase()]));
        }else if(key.split(",").every((char) => parseInt(char) >= 0)){
            return putVigenereTogether(text, key.split(",").map((char)=>parseInt(char)))
        }else{
            alert("Enter key with only letters and no spaces e.g. ABCD" );
        } 
    }
    //keyless
    key = Array(rand(10,15)).fill(0)
    key.map((char, index) => key[index] = rand(0,25));
    return putVigenereTogether(text, key);
}

function vigenereDecrypt(text = globalText.slice(0,globalText.length)){
    // with key
    if (!key == ''){
        if (key.split("").every((char) => char.toUpperCase() in alphaDict)){
            return putVigenereTogether(text, key.split("").map((char) => 26 - mod(alphaDict[char.toUpperCase()],26)));
        }else if(key.split(",").every((char) => parseInt(char) >= 0)){
            return putVigenereTogether(text, key.split(",").map((char)=>26 - mod(parseInt(char),26)))
        }else{
            alert("Enter key with only letters and no spaces e.g. ABCD" );
        } 
    }
    //keyless
    let keyLength = getKeyLength(text);
    let allVals = returnEveryNth(text, keyLength);
    let shifts = [];
    for (let i =0; i < allVals.length; i++){
        scores = []
        for(let x =0; x < 26; x++){
                chi = chiTest(caesarShift(allVals[i], x));
                scores.push([x , chi])
        }
        scores = scores.sort(function(a,b) {return a[1]-b[1]});
        shifts.push(scores[0][0]);
    }
    t = putVigenereTogether(text, shifts);
    return t;
}

function keywordEncrypt(text = globalText.slice(0,globalText.length)){
    return substitutionADecrypt(text);
}

function keywordDecrypt(text = globalText.slice(0,globalText.length)){
    return substitutionAEncrypt(text);
}

function polybiusEncrypt(text = globalText.slice(0, globalText.length)){
    key = ALPHA.map((char)=>alphaDict[char]);//ALPHA.map((value) => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value).map((char) => alphaDict[char]);
    let newText = []
    for(let i = 0; i < text.length; i+=2){
        let charNum = key.indexOf(text[i]);
        newText.push(Math.floor(charNum /5));
        newText.push(charNum % 5);
    }
    return newText;
}

function polybiusDecrypt(text = globalText.slice(0, globalText.length)){
    let newText = [];
    let encryptors = getPolybiusEncryptors(text).sort();
    for (let i = 0; i < text.length -1; i+=2){
        newText.push((encryptors.indexOf(text[i]) * encryptors.length) + encryptors.indexOf(text[i+1]) % 26);
    }
    return substitutionCipher(newText);
}

function morseCodeEncrypt(text=document.getElementById("textIn").split("")){

}

function morseCodeDecrypt(text=document.getElementById("textIn").split("/")){
    console.log(text)
}