import React from "react";
import { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { logOutCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import "./Profile.css";
import axios from "axios";

function Profile() {
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();
  const [user, setUser] = useState({});
  const [update, setUpdate] = useState(false);
  const params = useParams();
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`https://ems-deploy.onrender.com/api/employee/${params.id}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [params.id]);

  const handleLogOut = (e) => {
    e.preventDefault();
    logOutCall(dispatch);
    history.push("/");
  };
  const wantsToUpdate = (e) => {
    e.preventDefault();
    localStorage.clear();
    localStorage.setItem("email", user.email);
    localStorage.setItem("name", user.name);
    localStorage.setItem("employeeID", user.employeeID);
    localStorage.setItem("aadhaar", user.aadhaar);
    localStorage.setItem("phoneNumber", user.phoneNumber);
    localStorage.setItem("permanentAddress", user.permanentAddress);
    localStorage.setItem("jobTitle", user.jobTitle);
    localStorage.setItem("birthdate", user.birthDate);
    localStorage.setItem("joiningdate", user.joiningDate);
    localStorage.setItem("userId", params.id);
    setUpdate(true);
  };
  return (
    <>
      <button onClick={handleLogOut} className="logout-btn">
        Log Out
      </button>
      {!update ? (
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
                <span className="profile-span">{user.permanentAddress}</span>
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
          <button className="update-btn" onClick={wantsToUpdate}>
            Update Profile
          </button>
        </>
      ) : (
        <>
          <Redirect to="/employeeRegistration" />
        </>
      )}
    </>
  );
}

export default Profile;
