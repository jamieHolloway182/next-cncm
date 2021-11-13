const Settings = ({swap, clear, reverse, copy, input, enc, dec}) => {
    return (
        <div>
            <div id="options">
                <button onClick={swap}>↑</button>
                <button onClick={clear}>Clear</button>
                <button onClick={reverse}>Reverse</button><br/>
                <button onClick={copy}>Copy to Clipboard</button>
                <textarea onInput={input} placeholder="Input key..."></textarea><br/>
                <button onClick={enc}>Encrypt</button>
                <button onClick={dec}>Decrypt</button>
            </div>
            <div>
                hey
                <ul>
                  <li>Caesar</li>
                  <li><a id="affine">Affine</a></li>
                  <li><a id="substitutionA">Substitution (automatic)</a></li>
                  <li><a id="substitutionM">Substitution (manual)</a></li>
                  <li><a id="transpositionS">Transposition (simple)</a></li>
                  <li><a id="transpositionC">Transposition (columnar)</a></li>
                  <li><a id="vigenere">Vigenère</a></li>
                  <li><a id="keyword">Keyword</a></li>
                  <li><a id="polybius">Polybius Square</a></li>
                  <li><a id="determine">Determine cipher</a></li>
                </ul>
              </div>
        </div>
    )
}

export default Settings
