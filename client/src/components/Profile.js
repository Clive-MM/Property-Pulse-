import React, { useState } from "react";

function Profile() {
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [surname, setSurname] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [passportFile, setPassportFile] = useState(null);
  const [identificationFile, setIdentificationFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleCreateProfile = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("JWT token not found in local storage");
      }

      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("middlename", middlename);
      formData.append("surname", surname);
      formData.append("contact", contact);
      formData.append("address", address);
      formData.append("passport_url", passportFile);
      formData.append("identification_card_url", identificationFile);

      const response = await fetch("http://127.0.0.1:5000/profile", {
        method: "POST",
        body: formData,
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create profile");
      }

      setSuccessMessage("Profile created successfully!");
      setErrorMessage("");
      setFirstname("");
      setMiddlename("");
      setSurname("");
      setContact("");
      setAddress("");
      setPassportFile(null);
      setIdentificationFile(null);

      console.log("Profile created successfully!");
    } catch (error) {
      console.error("Error creating profile:", error.message);
      setErrorMessage("Failed to create profile. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <h1>Profile</h1>

      <div id="profile">
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>

          <div className="form-group" style={{marginTop:"2em"}}>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Middle Name"
              value={middlename}
              onChange={(e) => setMiddlename(e.target.value)}
            />
          </div>

          <div className="form-group" style={{marginTop:"2em"}}>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>

          <div className="form-group" style={{marginTop:"2em"}}>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>

          <div className="form-group" style={{marginTop:"2em"}}>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="mb-3" style={{marginTop:".5em"}}>
            <label htmlFor="passportFile" className="form-label">
              Passport
            </label>
            <input
              type="file"
              className="form-control"
              id="passportFile"
              onChange={(e) => setPassportFile(e.target.files[0])}
            />
          </div>

          <div className="mb-3" style={{marginTop:"3em"}}>
            <label htmlFor="identificationFile" className="form-label">
              Identification Card
            </label>
            <input
              type="file"
              className="form-control"
              id="identificationFile"
              onChange={(e) => setIdentificationFile(e.target.files[0])}
            />
          </div>

          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          {successMessage && <p className="text-success">{successMessage}</p>}

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleCreateProfile}
          >
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
