import "./Header.css";
import { useNavigate } from "react-router-dom";
import { FaUserCircle  } from "react-icons/fa"

export default function Header() {
    const navigate = useNavigate();

    return (
        <header className="header">
            <div
                className="logo"
                onClick={() => navigate("/")}
            >
                AYAT
            </div>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search products..."
                />
            </div>

            <div className="header-actions">
                <button
                    onClick={() => navigate("/user/userprofile/cart")}
                >
                    Cart
                </button>

                <button
                    className = "profile-icon-button"
                    onClick={() => navigate("/user/userprofile")}
                >
                    <FaUserCircle/>
                </button>
            </div>
        </header>
    );
}