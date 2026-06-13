import "./HeroSection.css";
import heroImage from "../assets/hero-image.jpg";
import DashboardPreview from "./DashboardPreview";
function HeroSection(){
    return(
        <section className="hero">
                <div className="hero-left-side">
                    <div className="hero-left">
                        <div className="hero-badge">
                        🚀 For Competitive Programmers
                        </div>
                        <h1>
                            Analyse.
                            <br/>
                            <span>Improve.</span>
                            <br/>
                            Outperform
                            <br/>
                        </h1>
                        <p>
                            Get deep insights into your Codeforces profile,
                            discover weaknesses, and accelerate your growth. 
                            make it some more big description
                        </p>
                        <div className="hero-btns">
                            <button className="analyze-btn">Analyze Your Profile</button>
                            <button className="demo-btn">View Demo</button>
                        </div>
                    </div>
                    <div className="hero-center">
                        <img
                            src={heroImage}
                            alt="Analytics Illustration"
                            className="hero-image"
                        />
                    </div>
                </div>    
                <DashboardPreview/>

        </section>
    );
}
export default HeroSection;