import { useNavigate } from "react-router-dom"
function Hero() {
    const navigate = useNavigate();
    return (

        <section className="hero">

            <div className="hero-left">

                <span className="badge">
                    🚀 New AI Analysis Available
                </span>

                <h1>
                    Master Competitive Programming
                </h1>

                <p>
                    Analyze your Codeforces profile,
                    discover weak topics, track progress,
                    and get personalized recommendations.
                </p>

                <button 
                className="hero-btn"
                onClick={()=> navigate("/dashboard")}
                >
                    Get Started
                </button>

            </div>

            <div className="hero-right">

                <div className="floating-card card1">

                    <h3>📊 Placement Score</h3>

                    <div className="score">
                        87 / 100
                    </div>

                    <p>
                        Excellent
                    </p>

                </div>

                <div className="floating-card card2">

                    <h3>🎯 Weak Topics</h3>

                    <ul>
                        <li>Graphs</li>
                        <li>Dynamic Programming</li>
                        <li>Trees</li>
                    </ul>

                </div>

                <div className="floating-card card3">

                    <h3>💡 Recommendations</h3>

                    <ul>
                        <li>Koko Eating Bananas</li>
                        <li>Aggressive Cows</li>
                    </ul>

                </div>

            </div>

        </section>

    );
}

export default Hero;