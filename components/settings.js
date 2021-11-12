const settings = ({swap, clear, reverse, copy, input, enc, dec}) => {
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
        </div>
    )
}

export default settings
