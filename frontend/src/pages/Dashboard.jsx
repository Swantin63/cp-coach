import { useState } from "react";
import API from "../services/api";
import "./Dashboard.css";

function Dashboard() {

    const [handle, setHandle] = useState("");
    const [profile, setProfile] = useState(null);
    const [placementScore, setPlacementScore] = useState(null);

    const [weakTopics, setWeakTopics] = useState([]);
    const [strongTopics, setStrongTopics] = useState([]);

    const [recommendations, setRecommendations] = useState([]);
    const [weakestTopic, setWeakestTopic] = useState("");

    const fetchProfile = async () => {

        try {

            // Profile
            const profileResponse = await API.get(
                `/profile/${handle}`
            );

            if (profileResponse.data.result) {

                setProfile(
                    profileResponse.data.result[0]
                );

            } else {

                setProfile(
                    profileResponse.data
                );

            }

            // Placement Score
            const scoreResponse = await API.get(
                `/placement-score/${handle}`
            );

            setPlacementScore(
                scoreResponse.data
            );

            // Weak Topics
            const weakTopicResponse = await API.get(
                `/weak-topic/${handle}`
            );

            setWeakTopics(
                weakTopicResponse.data.weakTopics
            );

            // Strong Topics
            const strongTopicResponse = await API.get(
                `/strong-topic/${handle}`
            );

            setStrongTopics(
                strongTopicResponse.data.strongTopics
            );

            // Recommendations
            const recommendationResponse = await API.get(
                `/recommendation/${handle}`
            );

            setWeakestTopic(
                recommendationResponse.data.weakestTopic
            );

            setRecommendations(
                recommendationResponse.data.recommendations
            );

        } catch (error) {

            console.log(error);

            if (error.response) {

                console.log(
                    error.response.data
                );

            }

            alert(
                "Error fetching data"
            );
        }
    };

    return (

        <div className="dashboard">

            <h1 className="dashboard-title">
                CP Coach Dashboard
            </h1>

            <div className="search-box">

                <input
                    type="text"
                    placeholder="Enter Codeforces Handle"
                    value={handle}
                    onChange={(e) =>
                        setHandle(
                            e.target.value
                        )
                    }
                />

                <button
                    onClick={fetchProfile}
                >
                    Analyze
                </button>

            </div>

            {/* PROFILE + PLACEMENT SCORE */}

            <div className="stats-grid">

                {profile && (

                    <div className="card">

                        <h2>
                            👤 Profile
                        </h2>

                        <p>
                            Handle:
                            {" "}
                            {profile.handle}
                        </p>

                        <p>
                            Rating:
                            {" "}
                            {profile.rating}
                        </p>

                        <p>
                            Max Rating:
                            {" "}
                            {profile.maxRating}
                        </p>

                        <p>
                            Rank:
                            {" "}
                            {profile.rank}
                        </p>

                        <p>
                            Country:
                            {" "}
                            {profile.country}
                        </p>

                    </div>

                )}

                {placementScore && (

                    <div className="card">

                        <h2>
                            📊 Placement Score
                        </h2>

                        <div className="big-score">
                            {placementScore.score}
                        </div>

                        <p>
                            Level:
                            {" "}
                            {placementScore.level}
                        </p>

                        <p>
                            Contests:
                            {" "}
                            {placementScore.contests}
                        </p>

                        <p>
                            Problems Solved:
                            {" "}
                            {placementScore.problemsSolved}
                        </p>

                        <p>
                            Topic Coverage:
                            {" "}
                            {placementScore.topicCoverage}
                        </p>

                    </div>

                )}

            </div>

            {/* WEAK + STRONG TOPICS */}

            <div className="stats-grid">

                {weakTopics.length > 0 && (

                    <div className="card">

                        <h2>
                            🎯 Weak Topics
                        </h2>

                        <ul>

                            {
                                weakTopics.map(
                                    (
                                        topic,
                                        index
                                    ) => (

                                        <li
                                            key={index}
                                        >
                                            {topic}
                                        </li>

                                    )
                                )
                            }

                        </ul>

                    </div>

                )}

                {strongTopics.length > 0 && (

                    <div className="card">

                        <h2>
                            💪 Strong Topics
                        </h2>

                        <ul>

                            {
                                strongTopics.map(
                                    (
                                        topic,
                                        index
                                    ) => (

                                        <li
                                            key={index}
                                        >
                                            {topic}
                                        </li>

                                    )
                                )
                            }

                        </ul>

                    </div>

                )}

            </div>

            {/* RECOMMENDATIONS */}

            {recommendations.length > 0 && (

                <div className="card recommendation-card">

                    <h2>
                        💡 Recommended Problems
                    </h2>

                    <p>

                        Weakest Topic:

                        <strong>
                            {" "}
                            {weakestTopic}
                        </strong>

                    </p>

                    <div className="recommendation-grid">

                        {
                            recommendations.map(
                                (
                                    problem,
                                    index
                                ) => (

                                    <div
                                        className="problem-card"
                                        key={index}
                                    >

                                        <h3>
                                            {problem.name}
                                        </h3>

                                        <p>
                                            Difficulty:
                                            {" "}
                                            {problem.difficulty}
                                        </p>

                                    </div>

                                )
                            )
                        }

                    </div>

                </div>

            )}

        </div>

    );
}

export default Dashboard;