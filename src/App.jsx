import { useCallback, useState,useEffect,useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

 // useCallback memorise / optimise //
  let passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*_-+=[]{}`~";
    for (let i = 0; i <length; i++) {
      let char = Math.random() * str.length + 1;
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(()=>{ passwordGenerator()},[charAllowed,numberAllowed,length,passwordGenerator])
 
let copyPasswordToClipboard = useCallback(() =>{
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0,20)
  window.navigator.clipboard.writeText(password)
},[password])
  
const passwordRef = useRef(null)
  return (
    <div
      style={{
        // display : 'flex',
        // flexDirection : 'column',

        backgroundColor: "black",
        // width: 200,
        // height: 500,
       
        
      }}
    >
      <h1 className=" flex justify-center mt-5 font-bold  text-3xl text-white">
        password generator
      </h1>
      <div className="bg-gray-800 h-40 w-200 flex shadow overflow-hidden mb-4 mx-auto mt-5 rounded-lg   flex-wrap">
        <input
          className="outline-none h-12 w-150 bg-orange-200 flex  mx-auto mt-7 py-3 px-3 rounded-l-2xl "
          readOnly
          type="text"
          placeholder="password"
          value={password}
          ref={passwordRef}
        />
        <button  onClick= {copyPasswordToClipboard}  className=" bg-blue-700 text-orange h-12 w-17 rounded-r-2xl text-[22px] -mt-12 ml-175">
          Copy
        </button>
        <div
          className="   items-center gap-x-1 inline-block align-text-bottom  mb-15 ml-30"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <input
            type="range"
            value={length}
            min={6}
            max={20}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label style={{ color: "orange" }}> Length:{length}</label>
        </div>
        <div className="flex items-center  gap-x-1 mb-15 ml-3">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numInput" className="text-orange-400">Numbers</label>
        </div>
        <div className="flex items-center  gap-x-1  mb-15 ml-3">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="charInput" className="text-orange-400">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
