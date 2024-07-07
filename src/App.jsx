import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [pass, setPass] = useState("");
  const [copied, setCopied] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let passs = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllow) str += "0123456789";
    if (charAllow) str += "!@#$%^&*-=+_{}[]()";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      passs += str.charAt(char);
    }
    setPass(passs);
  }, [length, numAllow, charAllow]);

  const copyPassToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      window.navigator.clipboard.writeText(pass).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }, [pass]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllow, charAllow, passwordGenerator]);

  return (
    <>
      <br />

      <div className="w-full flex-col flex items-center max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
        <h4 className="text-3xl mt-2 mb-2">Password Generator</h4>
        <div className="flex gap-3 w-full">
          <input
            type="text"
            value={pass}
            placeholder="Password"
            readOnly
            ref={passwordRef}
            className="w-[30vw] h-11 mb-4 rounded-md text-xl pl-2"
          />
          <button 
            onClick={copyPassToClipboard}
            className="border-2 h-11 w-[7vw] rounded-md bg-blue-900 text-zinc-50"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        <div className="flex text-sm w-full gap-4">
          <div className="flex gap-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="w cursor-pointer"
              onChange={(e) => { setLength(Number(e.target.value)) }}
            />
            <label>Length: {length}</label>
          </div>

          <div className="flex gap-1">
            <input
              type="checkbox"
              checked={numAllow}
              id="numberInput"
              onChange={() => {
                setNumAllow(prev => !prev);
              }}
            />
            <label htmlFor="numberInput"> Number</label>
          </div>

          <div className="flex gap-1">
            <input
              type="checkbox"
              checked={charAllow}
              id="charInput"
              onChange={() => {
                setCharAllow(prev => !prev);
              }}
            />
            <label htmlFor="charInput"> Character</label>
          </div>
        </div>
      </div>

      {/* <br /><br /><br />
     useeffect: huk he jo first time loadhota he  or <br />
      usestate(()={},[here])  --- inside parameters me kuchh bhi chhedkhani hoti he to phir se load hojata he  */}
    </>
  );
}

export default App;
