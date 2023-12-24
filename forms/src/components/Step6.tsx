import React from "react";
import { FormData } from "./WizardForm";

interface Step6Props {
  data: FormData;
}

const Step6: React.FC<Step6Props> = ({ data }) => {
  return (
    <div>
      <h2>Final Step: Review Your Information</h2>
      <div>
        <label>Login: </label>
        <span>{data.login}</span>
      </div>
      <div>
        <label>Password: </label>
        <span>{data.password}</span>
      </div>
      <div>
        <label>Subscription Type: </label>
        <span>{data.subscription}</span>
      </div>
      <div>
        <label>First Name: </label>
        <span>{data.firstName}</span>
      </div>
      <div>
        <label>Last Name: </label>
        <span>{data.lastName}</span>
      </div>
      <div>
        <label>Middle Name: </label>
        <span>{data.middleName || "-"}</span>
      </div>
      <div>
        <label>Birthdate: </label>
        <span>{data.birthdate || "-"}</span>
      </div>
      <div>
        <label>Email: </label>
        <span>{data.email}</span>
      </div>
      <div>
        <label>Gender: </label>
        <span>{data.gender}</span>
      </div>
      <div>
        <label>Adult: </label>
        <span>{data.isAdult ? "Yes" : "No"}</span>
      </div>
      <div>
        <label>Credit Card Number: </label>
        <span>{data.creditCardNumber}</span>
      </div>
      <div>
        <label>Consent: </label>
        <span>{data.consent ? "Given" : "Not Given"}</span>
      </div>
      <div>
        <label>Cookie Agreement: </label>
        <span>{data.cookieAgreement ? "Agreed" : "Not Agreed"}</span>
      </div>
    </div>
  );
};

export default Step6;
