import { useState, useRef , useEffect} from "react";

import "./App.css";

function App() {
  const [pass, setPass] = useState("");
  const [passLenght, setPassLenght] = useState(8);
  const [num, setNum] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const passRef = useRef(null);
  const stringData =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy" +
      (num == true ? "0123456789" : "") ||
    (specialChar == true ? "@#$%^&*()-_=+:;,.?" : "");
  function generatepass() {
    let rn;
    let password = "";
    for (let i = 0; i <= passLenght; i++) {
      rn = Math.floor(Math.random() * stringData.length);
      password += stringData[rn];
    }
    setPass(password);  
  }
  useEffect(() => {
      
    generatepass();
  }, []); // Empty dependency array means it only runs once after the component is mounted


    return (
    <div className="container">
      <div className="card">
        <div className="top">
          <div className="textarea">
            <input
              type="text"
              placeholder="password text"
              disabled
              className="passwordField"
              ref={passRef}
              value={pass}
            />
            <span
              className="copybtn"
              onClick={(e) => {
                let content = passRef.current.value;
                navigator.clipboard
                  .writeText(content)
                  .then(function () {
                    console.log("String copied to clipboard:", content);
                  })
                  .catch(function (err) {
                    console.error("Failed to copy string: ", err);
                  });
              }}
            >
              Copy
            </span>
          </div>
        </div>

        <div className="bottom">
          <span className="length">
            <input
              type="range"
              name="lenght"
              id="lenght"
              max="25"
              min="6"
              value={passLenght}
              onChange={(element) => {
                setPassLenght(element.target.value);
                generatepass();
              }}
            />
            <label htmlFor="lenght"> lenght : {passLenght}</label>
          </span>
          <span className="checkboxes">
            <span>
              <input
                type="checkbox"
                id="numbercheck"
                className="numbercheck"
                onChange={(element) => {
                  setNum(!num);
                  generatepass();
                }}
              />
              <label htmlFor="numbercheck"> Number</label>
            </span>
            <span>
              <input
                type="checkbox"
                id="specialCharCheck"
                className="specialCharCheck"
                onChange={(element) => {
                  setSpecialChar(!specialChar);
                  generatepass();
                }}
              />
              <label htmlFor="specialCharCheck"> Special </label>
            </span>
          </span>
          <button className="regeneratorBtn" onClick={generatepass}>
            Regenerate{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
