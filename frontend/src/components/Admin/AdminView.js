import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { logOutCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import axios from "axios";
import "./AdminView.css";
function AdminView() {
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();
  const [found, setFound] = useState(true);
  const [user, setUser] = useState(null);
  const [backClick, setBackClick] = useState(true);
  const email = useRef();
  const fullName = useRef();
  const employeeID = useRef();
  const aadhaar = useRef();
  const phoneNumber = useRef();
  const jobTitle = useRef();

  const generateUniqueId = () => {
    const d = new Date();
    const timestamp = d.getTime();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);
    return `id-${timestamp}-${hexadecimalString}`;
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    logOutCall(dispatch);
    history.push("/");
  };

  const handleEmailFilter = async (e) => {
    e.preventDefault();
    const enteredEmail = email.current.value;
    try {
      const res = await axios.get(
        `https://ems-deploy.onrender.com/api/employee/search/email/${enteredEmail}`
      );
      if (res.data !== null) {
        setFound(true);
        setUser(res.data);
        setBackClick(false);
      } else {
        setFound(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleNameFilter = async (e) => {
    e.preventDefault();
    const enteredName = fullName.current.value;
    try {
      const res = await axios.get(
        `https://ems-deploy.onrender.com/api/employee/search/name/${enteredName}`
      );
      if (res.data.length !== 0) {
        setFound(true);
        setUser(res.data);
        console.log(res.data);
        setBackClick(false);
      } else {
        setFound(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleIDFilter = async (e) => {
    e.preventDefault();
    const enteredID = employeeID.current.value;
    try {
      const res = await axios.get(
        `https://ems-deploy.onrender.com/api/employee/search/${enteredID}`
      );
      if (res.data !== null) {
        setFound(true);
        setUser(res.data);
        setBackClick(false);
      } else {
        setFound(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleAadhaarFilter = async (e) => {
    e.preventDefault();
    const enteredAadhaar = aadhaar.current.value;
    try {
      const res = await axios.get(
        `https://ems-deploy.onrender.com/api/employee/search/aadhaar/${enteredAadhaar}`
      );
      if (res.data !== null) {
        setFound(true);
        setUser(res.data);
        setBackClick(false);
      } else {
        setFound(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handlePhoneFilter = async (e) => {
    e.preventDefault();
    const enteredPhone = phoneNumber.current.value;
    try {
      const res = await axios.get(
        `https://ems-deploy.onrender.com/api/employee/search/phone/${enteredPhone}`
      );
      if (res.data !== null) {
        setFound(true);
        setUser(res.data);
        setBackClick(false);
      } else {
        setFound(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleJobFilter = async (e) => {
    e.preventDefault();
    const enteredJob = jobTitle.current.value;
    try {
      const res = await axios.get(
        `https://ems-deploy.onrender.com/api/employee/search/job/${enteredJob}`
      );
      if (res.data.length !== 0) {
        setFound(true);
        setUser(res.data);
        setBackClick(false);
      } else {
        setFound(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {backClick ? (
        <>
          <button onClick={handleLogOut} className="logout-btn">
            Log Out
          </button>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search By Email ID"
              className="search-bar-1"
              ref={email}
            />
            <SearchIcon className="search-icon" onClick={handleEmailFilter} />
            <input
              type="text"
              placeholder="Search By Name"
              className="search-bar-1"
              ref={fullName}
            />
            <SearchIcon className="search-icon" onClick={handleNameFilter} />
            <input
              type="text"
              placeholder="Search By Employee ID"
              className="search-bar-1"
              ref={employeeID}
            />
            <SearchIcon className="search-icon" onClick={handleIDFilter} />

            <input
              type="text"
              placeholder="Search By Aadhaar Number"
              className="search-bar-1"
              ref={aadhaar}
            />
            <SearchIcon className="search-icon" onClick={handleAadhaarFilter} />
            <input
              type="text"
              placeholder="Search By Phone Number"
              className="search-bar-1"
              ref={phoneNumber}
            />
            <SearchIcon className="search-icon" onClick={handlePhoneFilter} />
            <input
              type="text"
              placeholder="Search By Job Title"
              className="search-bar-1"
              ref={jobTitle}
            />
            <SearchIcon className="search-icon" onClick={handleJobFilter} />
          </div>
          {!found && <p className="no-match">No Match Found</p>}
        </>
      ) : (
        <>
          <KeyboardBackspaceIcon
            style={{ color: "white", cursor: "pointer" }}
            className="search-back"
            onClick={() => setBackClick(true)}
          />

          {user.length === undefined && (
            <>
              <div className="profile-container">
                <div className="profile-entries">
                  <p className="profile-detail">
                    <span className="profile-span">Email ID</span>
                  </p>
                  <p className="profile-detail">
                    <span className="profile-span">Full Name</span>
                  </p>
                  <p className="profile-detail">
                    <span className="profile-span">Employee ID</span>
                  </p>
                  <p className="profile-detail">
                    <span className="profile-span">Aadhar Number</span>
                  </p>
                  <p className="profile-detail">
                    <span className="profile-span">Phone Number</span>
                  </p>
                  <p className="profile-detail">
                    <span className="profile-span">Permanent Address</span>
                  </p>
                  <p className="profile-detail">
                    <span className="profile-span">Date Of Birth</span>
                  </p>
                  <p className="profile-detail">
                    <span className="profile-span">Job Title</span>
                  </p>
                  <p className="profile-detail">
                    <span className="profile-span">Joining Date</span>
                  </p>
                </div>
                <div className="profile-values">
                  <p className="profile-detail">
                    <span className="profile-span">{user.email}</span>
                  </p>
                  <p className="profile-detail">
                    <span className="profile-span">{user.name}</span>
                  </p>
                  <p className="profile-detail">
                    <span className="profile-span">{user.employeeID}</span>
                  </p>
                  <p className="profile-detail">
                    <span className="profile-span">{user.aadhaar}</span>
                  </p>
                  <p className="profile-detail">
                    <span className="profile-span">{user.phoneNumber}</span>
                  </p>
                  <p className="profile-detail">
                    <span className="profile-span">
                      {user.permanentAddress}
                    </span>
                  </p>
                  <p className="profile-detail">
                    <span className="profile-span">{user.birthDate}</span>
                  </p>
                  <p className="profile-detail">
                    <span className="profile-span">{user.jobTitle}</span>
                  </p>
                  <p className="profile-detail">
                    <span className="profile-span">{user.joiningDate}</span>
                  </p>
                </div>
              </div>
            </>
          )}
          {user &&
            user.length &&
            user.map((user) => (
              <div
                key={generateUniqueId()}
                className="profile-search-container"
              >
                <div className="profile-container-1">
                  <div className="profile-entries">
                    <p className="profile-detail">
                      <span className="profile-span">Email ID</span>
                    </p>
                    <p className="profile-detail">
                      <span className="profile-span">Full Name</span>
                    </p>
                    <p className="profile-detail">
                      <span className="profile-span">Employee ID</span>
                    </p>
                    <p className="profile-detail">
                      <span className="profile-span">Aadhar Number</span>
                    </p>
                    <p className="profile-detail">
                      <span className="profile-span">Phone Number</span>
                    </p>
                    <p className="profile-detail">
                      <span className="profile-span">Permanent Address</span>
                    </p>
                    <p className="profile-detail">
                      <span className="profile-span">Date Of Birth</span>
                    </p>
                    <p className="profile-detail">
                      <span className="profile-span">Job Title</span>
                    </p>
                    <p className="profile-detail">
                      <span className="profile-span">Joining Date</span>
                    </p>
                  </div>
                  <div className="profile-values">
                    <p className="profile-detail">
                      <span className="profile-span">{user.email}</span>
                    </p>
                    <p className="profile-detail">
                      <span className="profile-span">{user.name}</span>
                    </p>
                    <p className="profile-detail">
                      <span className="profile-span">{user.employeeID}</span>
                    </p>
                    <p className="profile-detail">
                      <span className="profile-span">{user.aadhaar}</span>
                    </p>
                    <p className="profile-detail">
                      <span className="profile-span">{user.phoneNumber}</span>
                    </p>
                    <p className="profile-detail">
                      <span className="profile-span">
                        {user.permanentAddress}
                      </span>
                    </p>
                    <p className="profile-detail">
                      <span className="profile-span">{user.birthDate}</span>
                    </p>
                    <p className="profile-detail">
                      <span className="profile-span">{user.jobTitle}</span>
                    </p>
                    <p className="profile-detail">
                      <span className="profile-span">{user.joiningDate}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </>
      )}
    </>
  );
}

export default AdminView;
