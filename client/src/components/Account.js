import React, { useState, useEffect } from "react";

function Account() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        firstname: "",
        middlename: "",
        surname: "",
        contact: "",
        address: "",
        passport_url: "",
        identification_card_url: ""
    });

    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem("access_token");
            if (!token) {
                throw new Error("JWT token not found in local storage");
            }

            const response = await fetch("http://127.0.0.1:5000/profile", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch profile details");
            }

            const profileData = await response.json();
            setProfile(profileData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching profile:", error.message);
            setError("Failed to fetch profile details. Please try again.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const handleEditMode = () => {
        setEditMode(true);
        setFormData({
            firstname: profile.firstname,
            middlename: profile.middlename,
            surname: profile.surname,
            contact: profile.contact,
            address: profile.address,
            passport_url: profile.passport_url,
            identification_card_url: profile.identification_card_url
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleProfileUpdate = async () => {
        try {
            const token = localStorage.getItem("access_token");
            if (!token) {
                throw new Error("JWT token not found in local storage");
            }

            const response = await fetch("http://127.0.0.1:5000/edit_profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to update profile");
            }

            setEditMode(false);
            fetchUserProfile();
        } catch (error) {
            console.error("Error updating profile:", error.message);
        }
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : !profile ? (
                <p>No profile found</p>
            ) : (
                <div>
                    {editMode ? (
                        <div>
                            <h1>Edit Profile</h1>
                            <form onSubmit={handleProfileUpdate}>
                                <label>First Name:</label>
                                <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} required />
                                <label>Middle Name:</label>
                                <input type="text" name="middlename" value={formData.middlename} onChange={handleChange} required />
                                <label>Surname:</label>
                                <input type="text" name="surname" value={formData.surname} onChange={handleChange} required />
                                <label>Contact:</label>
                                <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />
                                <label>Address:</label>
                                <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                                <label>Passport URL:</label>
                                <input type="text" name="passport_url" value={formData.passport_url} onChange={handleChange} required />
                                <label>Identification Card URL:</label>
                                <input type="text" name="identification_card_url" value={formData.identification_card_url} onChange={handleChange} required />
                                <button type="submit">Update Profile</button>
                            </form>
                        </div>
                    ) : (
                        <div>
                            <h1>Profile Details</h1>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">First Name: {profile.firstname}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Middle Name: {profile.middlename}</h6>
                                    <p className="card-text">Surname: {profile.surname}</p>
                                    <p className="card-text">Contact: {profile.contact}</p>
                                    <p className="card-text">Address: {profile.address}</p>
                                </div>
                            </div>
                            <div className="card mt-3">
                                <div className="card-body">
                                    <h5 className="card-title">Passport</h5>
                                    <img src={profile.passport_url} className="card-img-top" alt="Passport" />
                                </div>
                            </div>
                            <div className="card mt-3">
                                <div className="card-body">
                                    <h5 className="card-title">Identification Card</h5>
                                    <img src={profile.identification_card_url} className="card-img-top" alt="Identification Card" />
                                </div>
                            </div>
                            <button onClick={handleEditMode}>Edit Profile</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Account;
