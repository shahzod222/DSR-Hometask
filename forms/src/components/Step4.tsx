import React, { useState } from "react";
import Cleave from "cleave.js/react";

interface Step4Data {
  creditCardNumber: string;
}

interface Step4Props {
  onNext: (data: Step4Data) => void;
}

const Step4: React.FC<Step4Props> = ({ onNext }) => {
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!creditCardNumber) {
      setError("Credit card number is required.");
      return;
    }

    setError("");
    onNext({ creditCardNumber });
  };

  return (
    <div>
      <h2>Step 4: Enter Credit Card Information</h2>
      <div>
        <label>Credit Card Number:</label>
        <Cleave
          options={{ creditCard: true }}
          value={creditCardNumber}
          onChange={(e) => setCreditCardNumber(e.target.value)}
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Step4;
