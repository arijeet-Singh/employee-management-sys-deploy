import React from "react";
import { useState, useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import axios from "axios";
import "./Registration.css";
function Registration() {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const email = useRef();
  const fullName = useRef();
  const employeeId = useRef();
  const aadhar = useRef();
  const permanentAddress = useRef();
  const phoneNumber = useRef();
  const birthDate = useRef();
  const jobTitle = useRef();
  const joiningDate = useRef();

  const [characters, setCharacters] = useState(
    localStorage.getItem("permanentAddress").length
  );
  const [emailValue, setEmailValue] = useState(localStorage.getItem("email"));

  let username = localStorage.getItem("name");
  let x;
  if (username === "undefined") {
    x = "";
  } else {
    x = username;
  }
  const [nameValue, setNameValue] = useState(x);
  const [eidValue, setEidValue] = useState(localStorage.getItem("employeeID"));
  const [aadharValue, setAadhaarValue] = useState(
    localStorage.getItem("aadhaar")
  );
  const [phoneValue, setPhoneValue] = useState(
    localStorage.getItem("phoneNumber")
  );
  const [permanentValue, setPermanentValue] = useState(
    localStorage.getItem("permanentAddress")
  );
  const [jobValue, setJobValue] = useState(localStorage.getItem("jobTitle"));
  const [birthValue, setBirthValue] = useState(
    localStorage.getItem("birthdate")
  );
  const [joiningValue, setJoiningValue] = useState(
    localStorage.getItem("joiningdate")
  );

  const [btnText, setBtnText] = useState("Update Profile");

  const handleRegister = async (e) => {
    e.preventDefault();
    const enteredEmail = email.current.value;
    const enteredName = fullName.current.value;
    const enteredEmployeeID = employeeId.current.value;
    const enteredAadhar = aadhar.current.value;
    const enteredPermanentAddress = permanentAddress.current.value;
    const enteredPhoneNumber = phoneNumber.current.value;
    const enteredBirthDate = birthDate.current.value;
    const enteredJobTitle = jobTitle.current.value;
    const enteredJoiningDate = joiningDate.current.value;

    let emailFlag,
      eidFlag,
      aadhaarFlag,
      permanentAddressFlag,
      phoneFlag,
      birthDateFlag,
      joiningDateFlag;

    // EMAIL ID VERIFICATION

    let pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!pattern.test(enteredEmail)) {
      setEmailValue("Invalid Email ID");
    } else {
      emailFlag = 1;
    }

    // EMPLOYEE ID VERIFICATION
    if (enteredEmployeeID.length !== 6) {
      setEidValue("Employee ID is 6 Characters Long");
    } else {
      eidFlag = 1;
    }

    //AADHAAR VERIFICATION
    let regexp = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
    if (!regexp.test(enteredAadhar)) {
      setAadhaarValue("Invalid Aadhar Number.");
    } else {
      aadhaarFlag = 1;
    }

    //PERMANENT ADDRESS VALIDATION
    if (enteredPermanentAddress.length < 30) {
      permanentAddressFlag = 1;
    } else {
      setPermanentValue("Only 100 Characters Allowed");
    }

    // BIRTH DATE VALIDATION
    let bday = enteredBirthDate;
    bday = bday.split("-");
    let bday_in_milliseconds = new Date(
      parseInt(bday[0], 10),
      parseInt(bday[1], 10) - 1,
      parseInt(bday[2], 10)
    ).getTime();
    let now = new Date().getTime();
    if (now > bday_in_milliseconds) {
      if (now - bday_in_milliseconds > 568080000000) {
        birthDateFlag = 1;
      } else {
        alert(
          "Employee cannot be under 18 years of age. Enter valid birth date."
        );
      }
    } else {
      alert("Enter Valid Birth Date");
    }

    // PHONE NUMBER VERIFICATION
    if (enteredPhoneNumber.length === 10) {
      phoneFlag = 1;
    } else {
      setPhoneValue("Enter valid Phone Number");
    }

    // JOINING DATE VERIFICATION
    let joining = enteredJoiningDate;
    joining = joining.split("-");
    let joining_in_milliseconds = new Date(
      parseInt(joining[0], 10),
      parseInt(joining[1], 10) - 1,
      parseInt(joining[2], 10)
    ).getTime();
    let today = new Date().getTime();
    if (
      joining_in_milliseconds !== bday_in_milliseconds &&
      joining_in_milliseconds - bday_in_milliseconds > 568080000000
    ) {
      if (today >= joining_in_milliseconds) {
        joiningDateFlag = 1;
      } else {
        alert("Enter valid Joining Date");
      }
    } else {
      alert("Enter valid Joining Date");
    }

    if (
      emailFlag &&
      eidFlag &&
      aadhaarFlag &&
      birthDateFlag &&
      phoneFlag &&
      joiningDateFlag &&
      permanentAddressFlag
    ) {
      const body = {
        email: enteredEmail,
        name: enteredName,
        employeeID: enteredEmployeeID,
        aadhaar: enteredAadhar,
        permanentAddress: enteredPermanentAddress,
        phoneNumber: enteredPhoneNumber,
        birthDate: enteredBirthDate,
        jobTitle: enteredJobTitle,
        joiningDate: enteredJoiningDate,
      };
      try {
        const res = await axios.put(
          `https://ems-deploy.onrender.com/api/employee/registration/${user._id}`,
          body
        );
        if (res.status === 200) {
          setBtnText("Profile Updated");
          localStorage.clear();
          history.push(`/employee/${user._id}`);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const goBack = (e) => {
    e.preventDefault();
    localStorage.clear();
    history.push(`/employee/${user._id}`);
  };
  return (
    <>
      <KeyboardBackspaceIcon
        className="back"
        onClick={goBack}
        sx={{ color: "white" }}
      />
      <div className="registration-form-container">
        <form className="registration-form">
          <article className="email-name-article">
            <input
              className="form-input"
              type="email"
              placeholder="Email ID"
              ref={email}
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              required
            />
            <input
              className="form-input"
              type="text"
              placeholder="Full Name"
              ref={fullName}
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              required
            />
          </article>
          <input
            className="form-input"
            type="text"
            placeholder="Employee ID (6 Alphanumeric Characters)"
            ref={employeeId}
            value={eidValue}
            onChange={(e) => setEidValue(e.target.value)}
            required
          />
          <br />
          <input
            className="form-input"
            type="text"
            placeholder="12-Digit Aadhar Number (Without Spaces)"
            ref={aadhar}
            value={aadharValue}
            onChange={(e) => setAadhaarValue(e.target.value)}
            required
          />
          <br />

          <input
            className="form-input"
            type="text"
            placeholder="Permanent Address (Max 30 Characters)"
            ref={permanentAddress}
            value={permanentValue}
            onChange={(e) => {
              setCharacters(e.target.value.length);
              setPermanentValue(e.target.value);
            }}
            required
          />
          <div className="characters">{characters}/30</div>
          <br />
          <input
            className="form-input"
            type="text"
            placeholder="Phone Number (Without Country Code)"
            ref={phoneNumber}
            value={phoneValue}
            onChange={(e) => setPhoneValue(e.target.value)}
            required
          />
          <br />
          <input
            className="form-input date"
            type="text"
            placeholder="Birth Date (DD/MM/YYYY)"
            onFocus={(e) => (e.target.type = "date")}
            ref={birthDate}
            value={birthValue}
            onChange={(e) => setBirthValue(e.target.value)}
            required
          />
          <br />
          <input
            className="form-input"
            type="text"
            placeholder="Job Title"
            ref={jobTitle}
            value={jobValue}
            onChange={(e) => setJobValue(e.target.value)}
            required
          />
          <br />
          <input
            className="form-input"
            type="text"
            placeholder="Joining Date (DD/MM/YYYY)"
            onFocus={(e) => (e.target.type = "date")}
            ref={joiningDate}
            value={joiningValue}
            onChange={(e) => setJoiningValue(e.target.value)}
            required
          />
          <br />
          <button onClick={handleRegister} className="registration-button">
            {btnText}
          </button>
        </form>
      </div>
    </>
  );
}

export default Registration;
