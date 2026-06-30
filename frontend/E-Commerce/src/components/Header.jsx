import "./Header.css";
import { useNavigate } from "react-router-dom";
import { FaUserCircle  } from "react-icons/fa"
import { useContext , useState } from "react"
import { SearchContext } from "../context/SearchProvider";

export default function Header() {
    const navigate = useNavigate();
    
    const { search,setSearch } = useContext(SearchContext)

    const handleSearch = (event)=>{
        setSearch(event.target.value)
    }

    const handleSearchButton = async ()=>{
        const query = search.trim();
        if(!query) return;
        navigate(`/home/search?search=${ encodeURIComponent(query)}`)
    }

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
                    value={ search }
                    onChange={ handleSearch }
                    onKeyDown={ (e)=>{ 
                        if(e.key === "Enter" ){
                            handleSearchButton();
                        }
                     } }
                />
                <button className="search-btn" onClick={ handleSearchButton }>Search</button>
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