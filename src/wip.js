
function playfairDecrypt(){

}

function removePlayfairKey(text, key){
    key = generateFullKey(key.toLocaleUpperCase());
    for (let i = 0; i < text.length -1; i+=2) {
        bigram = text[i] + text[i+1];
        point1 = key.indexOf(bigram[0]);
        point2 = key.indexOf(bigram[1]);
        if (point1 %5 == point2%5){
            text[i] = ALPHA[(point1 - 5) % 25];
            text[i+1] = ALPHA[(point2 - 5) % 25];
        }else if(Math.floor(point1 / 5) == Math.floor(point2 / 5)){
            text[i] = ALPHA[(Math.floor(point1 / 5)*5) + mod((point1 -1),5)];
            text[i+1] = ALPHA[(Math.floor(point2 / 5)*5) + mod((point2 -1),5)];
        }else{
            text[i] = ALPHA[point2%5 + (Math.floor(point1 / 5) *5)];
            text[i+1] = ALPHA[point1%5 + (Math.floor(point2 / 5) *5)];
        }
    }
    return text;
}

function playfairEncrypt(){
    key = document.getElementById("encryptInputBox").value.toLocaleUpperCase();
    if (key.length <= 25){
        output(applyPlayfairKey(globalText, key));
    }else{
        alert("playfair encryption key must be 25 or less long");
    }
}

function applyPlayfairKey(text, key){
    key = generateFullKey(key.toLocaleUpperCase());
    for (let i = 0; i < text.length -1; i+=2){
        if (text[i] == text[i+1]){
            text.splice(i+1, 0, "X");
        }
    }
    if (text.length % 2 == 1){
        text.push("X");
    }
    for (let i = 0; i < text.length -1; i+=2) {
        bigram = text[i] + text[i+1];
        point1 = key.indexOf(bigram[0]);
        point2 = key.indexOf(bigram[1]);
        
        if (point1 %5 == point2%5){
            text[i] = key[(point1 + 5) % 25];
            text[i+1] = key[(point2 + 5) % 25];
        }else if(Math.floor(point1 / 5) == Math.floor(point2 / 5)){
            text[i] = key[(Math.floor(point1 / 5)*5) + ((point1 +1)%5)];
            text[i+1] = key[(Math.floor(point2 / 5)*5) + ((point2 +1)%5)];
        }else{
            text[i] = key[point2%5 + (Math.floor(point1 / 5) *5)];
            text[i+1] = key[point1%5 + (Math.floor(point2 / 5) *5)];
        }
    }
    return text;
}