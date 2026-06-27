import "./Editprofile.css";
import { useState } from "react"
export default function EditProfile() {

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({
            userName,
            email,
            phone
        });
    };

    return (
        <div className="edit-profile-container">

            <div className="edit-profile-card">

                <h1>Edit Profile</h1>

                <form
                    className="edit-profile-form"
                    onSubmit={handleSubmit}
                >

                    <div className="avatar">
                        {userName
                            ? userName[0].toUpperCase()
                            : "A"}
                    </div>

                    <div className="input-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) =>
                                setUserName(e.target.value)
                            }
                            placeholder="Enter username"
                        />
                    </div>

                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="Enter email"
                        />
                    </div>

                    <div className="input-group">
                        <label>Phone</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) =>
                                setPhone(e.target.value)
                            }
                            placeholder="Enter phone number"
                        />
                    </div>

                    <button
                        type="submit"
                        className="save-btn"
                    >
                        Save Changes
                    </button>

                </form>

            </div>

        </div>
    );
}