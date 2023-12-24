import React, { useState } from "react";

interface Step5Data {
  login: string;
  email: string;
  consent: boolean;
  cookieAgreement: boolean;
}

interface Step5Props {
  onNext: (data: Partial<Step5Data>) => void;
  data: Step5Data;
}

const Step5: React.FC<Step5Props> = ({ data, onNext }) => {
  const [consent, setConsent] = useState(false);
  const [cookieAgreement, setCookieAgreement] = useState(false);

  const handleNext = () => {
    if (!consent || !cookieAgreement) {
      alert("Please provide consent and agree to the cookie policy.");
      return;
    }

    onNext({ consent, cookieAgreement });
  };

  return (
    <div>
      <h2>Step 5: Consent to Personal Data Processing</h2>
      <div>
        <label>Login:</label>
        <input type="text" value={data.login} disabled />
      </div>
      <div>
        <label>Email:</label>
        <input type="text" value={data.email} disabled />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          Consent to Personal Data Processing
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={cookieAgreement}
            onChange={(e) => setCookieAgreement(e.target.checked)}
          />
          Site uses cookie agreement
        </label>
      </div>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Step5;
