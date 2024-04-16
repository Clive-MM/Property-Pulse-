import React, { useState, useEffect } from "react";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [surname, setSurname] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [passportFile, setPassportFile] = useState(null);
  const [identificationFile, setIdentificationFile] = useState(null);
  const [creatingProfile, setCreatingProfile] = useState(false);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("JWT token not found in local storage");
      }

      const response = await fetch("http://127.0.0.1:5000/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setProfile(null); // Set profile to null if no profile data exists
        setLoading(false); // Set loading to false
        return;
      }

      const profileData = await response.json();
      setProfile(profileData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error.message);
      setErrorMessage("Failed to fetch profile details. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleCreateProfile = () => {
    setCreatingProfile(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstname":
        setFirstname(value);
        break;
      case "middlename":
        setMiddlename(value);
        break;
      case "surname":
        setSurname(value);
        break;
      case "contact":
        setContact(value);
        break;
      case "address":
        setAddress(value);
        break;
      default:
        break;
    }
  };

  const handleSubmitProfile = async () => {
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
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create profile");
      }

      setSuccessMessage("Profile created successfully!");
      setErrorMessage("");
      fetchProfile(); // Fetch the profile data after creation
      setCreatingProfile(false); // Reset creating profile mode
    } catch (error) {
      console.error("Error creating profile:", error.message);
      setErrorMessage("Failed to create profile. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : errorMessage ? (
        <p>Error: {errorMessage}</p>
      ) : profile ? (
        <div>
          <div>
            <div
              class="card"
              style={{ width: "20rem", lineHeight: "50%", textAlign: "left" }}
            >
              <div class="card-body">
                <div style={{ marginTop: "1em" }}>
                  <p>
                    <strong>First Name: </strong> {profile.firstname}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Middle Name :</strong> {profile.middlename}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Surname: </strong>
                    {profile.surname}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Contact:</strong> {profile.contact}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Address:</strong> {profile.address}
                  </p>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "2em",
              }}
            >
              <div
                className="card"
                style={{ width: "50%", height: "15em", overflow: "hidden" }}
              >
                <div className="card-body">
                  <h5 className="card-title">Passport</h5>
                  <img
                    src={profile.passport_url}
                    className="card-img-top"
                    alt="Passport"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
              <div style={{ width: "1em" }}></div>
              <div
                className="card"
                style={{ width: "50%", height: "15em", overflow: "hidden" }}
              >
                <div className="card-body">
                  <h5 className="card-title">Identification Card</h5>
                  <img
                    src={profile.identification_card_url}
                    className="card-img-top"
                    alt="Identification Card"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : creatingProfile ? (
        <div>
          <h1 className="text-muted">Create Profile</h1>

          <form>
            <div>
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={firstname}
                onChange={handleChange}
              />
            </div>
            <div style={{ marginTop: "1em" }}>
              <input
                type="text"
                name="middlename"
                placeholder="Middle Name"
                value={middlename}
                onChange={handleChange}
              />
            </div>
            <div style={{ marginTop: "1em" }}>
              <input
                type="text"
                name="surname"
                placeholder="Surname"
                value={surname}
                onChange={handleChange}
              />
            </div>
            <div style={{ marginTop: "1em" }}>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={address}
                onChange={handleChange}
              />
            </div>

            <div style={{ marginTop: "1em", marginLeft: "7em" }}>
              <label>Passport</label>
              <input
                type="file"
                onChange={(e) => setPassportFile(e.target.files[0])}
                style={{ margin: ".4em" }}
              />
            </div>
            <div style={{ marginTop: "1em", marginLeft: "11em" }}>
              <label>Identification Card</label>
              <input
                type="file"
                onChange={(e) => setIdentificationFile(e.target.files[0])}
                style={{ margin: ".4em" }}
              />
            </div>

            {successMessage && <p>{successMessage}</p>}
            <div style={{ marginTop: "1em" }}>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleSubmitProfile}
              >
                Create Profile
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <h1 className="text-muted">No Profile Found</h1>
          <button
            type="button"
            onClick={handleCreateProfile}
            className="btn btn-success"
          >
            Create Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
