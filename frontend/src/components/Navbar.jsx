import { useNavigate } from "react-router-dom";
function Navbar() {
    const navigate = useNavigate();
    return (
    <nav>

        <h2>CP Coach</h2>

        <div className="nav-links">

            <span className="nav-link">
                Features
            </span>

            <span 
            className="nav-link"
            onClick={()=> navigate("/dashboard")}
            >
                Dashboard
            </span>

            <span className="nav-link">
                Roadmap
            </span>

        </div>
    </nav>
    );
}

export default Navbar;