import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {

  // State variables for the password generator
  const [password, setPassword] = useState("");            // generated password
  const [passwordLength, setPasswordLength] = useState(12); // default length 12
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copySuccess, setCopySuccess] = useState("");      // message after copying
 
 // Function to generate a random password based on selected options
  const generatePassword = () => {
    let charset = "";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers)   charset += "0123456789";
    if (includeSymbols)   charset += "!@#$%^&*()";
    
    if (charset === "") {
      // No character set selected; we can alert or return early
      alert("Please select at least one character type.");
      return;
    }
    
    let newPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset.charAt(randomIndex);
    }
    setPassword(newPassword);
  };

  // Function to copy the generated password to clipboard
  const copyToClipboard = () => {
    if (!password) return;  // nothing to copy if password is empty
    navigator.clipboard.writeText(password)
      .then(() => {
        setCopySuccess("Password copied to clipboard!");
        // Clear the success message after 2 seconds
        setTimeout(() => setCopySuccess(""), 2000);
      })
      .catch(err => {
        console.error("Could not copy password", err);
      });
  };

  return (
    <div className="App" style={{ maxWidth: "400px", margin: "2rem auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center" }}>Random Password Generator</h2>
      
      {/* Input for password length */}
      <div className="input-group">
        <label>Password Length: </label>
        <input 
          type="number" 
          min="8" max="32" 
          value={passwordLength} 
          onChange={(e) => setPasswordLength(parseInt(e.target.value) || 0)} 
        />
      </div>

      {/* Checkbox options */}
      <div className="options">
        <label>
          <input 
            type="checkbox" 
            checked={includeUppercase} 
            onChange={() => setIncludeUppercase(!includeUppercase)} 
          /> Uppercase
        </label><br/>
        <label>
          <input 
            type="checkbox" 
            checked={includeLowercase} 
            onChange={() => setIncludeLowercase(!includeLowercase)} 
          /> Lowercase
        </label><br/>
        <label>
          <input 
            type="checkbox" 
            checked={includeNumbers} 
            onChange={() => setIncludeNumbers(!includeNumbers)} 
          /> Numbers
        </label><br/>
        <label>
          <input 
            type="checkbox" 
            checked={includeSymbols} 
            onChange={() => setIncludeSymbols(!includeSymbols)} 
          /> Symbols
        </label>
      </div>

      {/* Generate button */}
      <button onClick={generatePassword} style={{ marginTop: "10px", padding: "8px 12px" }}>
        Generate Password
      </button>

      {/* Display generated password and copy button */}
      {password && (
        <div className="output" style={{ marginTop: "15px" }}>
          <p><b>Generated Password:</b></p>
          <input type="text" readOnly value={password} style={{ width: "100%" }} />
          <button onClick={copyToClipboard} style={{ marginTop: "5px" }}>Copy to Clipboard</button>
        </div>
      )}

      {/* Success message */}
      {copySuccess && (
        <p style={{ color: "green", marginTop: "5px" }}>{copySuccess}</p>
      )}
    </div>
  );
}

export default App;
