import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";

export interface FormData {
  login: string;
  password: string;
  subscription: "Free" | "Monthly" | "Yearly";
  firstName: string;
  lastName: string;
  middleName?: string;
  birthdate?: string;
  email: string;
  gender: "male" | "female";
  isAdult: boolean;
  creditCardNumber: string;
  consent: boolean;
  cookieAgreement: boolean;
}

const WizardForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    login: "",
    password: "",
    subscription: "Free",
    firstName: "",
    lastName: "",
    email: "",
    gender: "male",
    isAdult: false,
    creditCardNumber: "",
    consent: false,
    cookieAgreement: false,
  });

  const handleNext = (data: Partial<FormData>) => {
    setFormData({ ...formData, ...data });
    setStep(step + 1);

    if (step === 6) console.log("Final form data:", formData);
  };

  return (
    <div>
      {step === 1 && <Step1 onNext={handleNext} />}
      {step === 2 && <Step2 onNext={handleNext} />}
      {step === 3 && <Step3 onNext={handleNext} />}
      {step === 4 && <Step4 onNext={handleNext} />}
      {step === 5 && <Step5 data={formData} onNext={handleNext} />}
      {step === 6 && <Step6 data={formData} />}
    </div>
  );
};

export default WizardForm;
