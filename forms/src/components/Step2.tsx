import React, { useState } from "react";

interface Step2Data {
  subscription: "Free" | "Monthly" | "Yearly";
}

interface Step2Props {
  onNext: (data: Step2Data) => void;
}

const Step2: React.FC<Step2Props> = ({ onNext }) => {
  const [subscription, setSubscription] = useState<
    Step2Data["subscription"] | ""
  >("");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!subscription) {
      setError("Please choose a subscription type.");
      return;
    }

    setError("");
    onNext({ subscription });
  };

  return (
    <div>
      <h2>Step 2: Choose Subscription Type</h2>
      <div>
        <label>Subscription Type:</label>
        <select
          value={subscription}
          onChange={(e) =>
            setSubscription(e.target.value as Step2Data["subscription"])
          }
        >
          <option value="">Select...</option>
          <option value="Free">Free</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Step2;
