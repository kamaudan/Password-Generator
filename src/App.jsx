import { useState } from "react";
import "./App.css";
import usePasswordGenerator from "./hooks/usePasswordGenerator";
import PasswordStrengthIndicator from "./components/PasswordStrengthIndicator";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";

function App() {
  const [length, setLength] = useState();
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);

  const [copied, setCopied] = useState(false);

  const handleCheckboxChange = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckboxData(updatedCheckboxData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  return (
    <div className="container">
      {password && (
        <div className="header">
          <div className="title">{password}</div>
          <Button
            text={copied ? "Copied" : "Copy"}
            customClass="copyBtn"
            onClick={handleCopy}
          />
        </div>
      )}
      <div className="charlength">
        <span>
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input
          type="range"
          min={4}
          max={20}
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>
      <div className="checkboxes">
        {checkboxData.map((checkbox, index) => {
          return (
            <Checkbox
              key={index}
              title={checkbox.title}
              state={checkbox.state}
              onChange={() => handleCheckboxChange(index)}
            />
          );
        })}
      </div>
      <PasswordStrengthIndicator password={password} />

      {errorMessage && <div className="errorMessage">{errorMessage}</div>}

      <Button
        text="Generate Password"
        onClick={() => generatePassword(checkboxData, length)}
        customClass="generateBtn"
      />
    </div>
  );
}

export default App;
