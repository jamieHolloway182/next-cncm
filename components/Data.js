import {useState, useEffect, useRef} from 'react'
import {ALPHA} from '../src/dependencies'
import {observedCount} from '../src/init';
import updateValues from '../src/data'

const Data = ({text, textIn}) => {

    const freqRef = useRef(null);
    const fullLenRef = useRef(null);
    const lenRef = useRef(null);
    const likelyRef = useRef(null);
    const iocRef = useRef(null);
    const chiRef = useRef(null);
    const timeRef = useRef(null);

    const values = updateValues(text);

    const freq = observedCount(text);
    const fullLen = textIn.length;
    const len = text.length;
    const likely = values.likely;
    const ioc = values.IoC;
    const chi = values.Chi;

    useEffect(()=>{
        for (let i = 0; i < 13; i++){
            freqRef.current.insertRow(i+1);
        }
    }, [])

    useEffect(()=>{

        fullLenRef.current.innerHTML = fullLen;
        lenRef.current.innerHTML = len;
        likelyRef.current.innerHTML = likely;
        iocRef.current.innerHTML = ioc;
        chiRef.current.innerHTML = chi;

        for (let i = 0; i < 13; i++){
            freqRef.current.deleteRow(i+1);
            freqRef.current.insertRow(i+1).outerHTML = "<tr><td>"+ALPHA[i]+"</td><td>"+freq[i]+"</td><td>"+ALPHA[i+13]+"</td><td>"+freq[i+13]+"</td></tr>";
        } 
    });

    

    return (
        <div>
            <div>
                Data
            </div>
            <div>
                <table ref={freqRef}>
                    <tr>
                        <th>Letter</th>
                        <th>Frequency</th>
                        <th>Letter</th>
                        <th>Frequency</th>
                    </tr>
                </table>
            </div>
            <div>
                <table >
                    <tr>
                        <th>Letter</th>
                        <th>Frequency</th>
                        <th>Letter</th>
                        <th>Frequency</th>
                    </tr>
                </table>

                <table>
                    <tr>
                        <td>Text Length:</td>
                        <td ref={fullLenRef}>0</td>
                    </tr>
                    <tr>
                        <td>Text Length (No Grammar):</td>
                        <td ref={lenRef}>0</td>
                    </tr>
                    <tr>
                        <td>Most Likely Cipher:</td>
                        <td ref={likelyRef}>Unknown</td>
                    </tr>
                    <tr>
                        <td>IoC:</td>
                        <td ref={iocRef}>0</td>
                    </tr>
                    <tr>
                        <td>Chi: </td>
                        <td ref={chiRef}>0</td>
                    </tr>
                    <tr>
                        <td>Time taken: </td>
                        <td ref={timeRef}>0</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Data
