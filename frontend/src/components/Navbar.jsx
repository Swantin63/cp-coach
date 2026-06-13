import "./Navbar.css";
function Navbar(){
    return(
        <nav className="navbar">
            <div className="logo">
                CP Coach
            </div>
            <ul className="nav-menu">
                <li>Features</li>
                <li>How it works</li>
                <li>Dashboard</li>
                <li>FAQ</li>
            </ul>
            <div className="nav-actions">
                <button className="signin-btn">Sign in</button>
                <button className="start-btn">Get Started</button>
            </div>
        </nav>
    );
}
export default Navbar;