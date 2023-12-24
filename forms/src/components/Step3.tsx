import React, { useState } from "react";

interface Step3Data {
  firstName: string;
  lastName: string;
  middleName?: string;
  birthdate?: string;
  email: string;
  gender: "male" | "female";
  isAdult: boolean;
}

interface Step3Props {
  onNext: (data: Step3Data) => void;
}

const Step3: React.FC<Step3Props> = ({ onNext }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState<Step3Data["gender"]>("male");
  const [isAdult, setIsAdult] = useState(false);
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!firstName || !lastName || !email || !gender || !isAdult) {
      setError("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    onNext({
      firstName,
      lastName,
      middleName,
      birthdate,
      email,
      gender,
      isAdult,
    });
  };

  return (
    <div>
      <h2>Step 3: Enter Personal Information</h2>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label>Middle Name:</label>
        <input
          type="text"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
        />
      </div>
      <div>
        <label>Birthdate:</label>
        <input
          type="text"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          placeholder="Optional"
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Gender:</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value as Step3Data["gender"])}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isAdult}
            onChange={(e) => setIsAdult(e.target.checked)}
          />
          I am older than 18
        </label>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Step3;
