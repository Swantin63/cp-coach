import { useState } from "react";
import API from "../services/api";
import { FaTrophy } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { FaFlag } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaBullseye } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import { MdOutlineWarningAmber } from "react-icons/md";
import { GiBiceps } from "react-icons/gi";
import { BsLightbulb } from "react-icons/bs";

import "./Dashboard.css";

function Dashboard() {
    const [loading,setLoading] = useState(false);
    const [handle, setHandle] = useState("");
    const [profile, setProfile] = useState(null);
    const [placementScore, setPlacementScore] = useState(null);

    const [weakTopics, setWeakTopics] = useState([]);
    const [strongTopics, setStrongTopics] = useState([]);

    const [recommendations, setRecommendations] = useState([]);
    const [weakestTopic, setWeakestTopic] = useState("");

    const fetchProfile = async () => {

        try {
            setLoading(true);
            const [
                    profileResponse,
                    scoreResponse,
                    weakTopicResponse,
                    strongTopicResponse,
                    recommendationResponse
                ] = await Promise.all([

                    API.get(`/profile/${handle}`),
                    API.get(`/placement-score/${handle}`),
                    API.get(`/weak-topic/${handle}`),
                    API.get(`/strong-topic/${handle}`),
                    API.get(`/recommendation/${handle}`)
                ]);            

            if (profileResponse.data.result) {

                setProfile(
                    profileResponse.data.result[0]
                );

            } else {

                setProfile(
                    profileResponse.data
                );

            }

        setPlacementScore(
            scoreResponse.data
        );

        setWeakTopics(
            weakTopicResponse.data.weakTopics
        );

        setStrongTopics(
            strongTopicResponse.data.strongTopics
        );

        setWeakestTopic(
            recommendationResponse.data.weakestTopic
        );

        setRecommendations(
            recommendationResponse.data.recommendations
        );    


        }

        catch (error) {

            console.log(error);

            alert("Error fetching data");

        }
        finally{
            setLoading(false)
        }

    };

    return (

        <div className="dashboard">

            {/* HEADER */}

            <div className="dashboard-header">

                <h1 className="dashboard-title">
                    CP Coach Dashboard
                </h1>

                <p className="dashboard-subtitle">
                    Analyze your Codeforces profile and
                    discover your weak topics.
                </p>

            </div>

            {/* SEARCH */}

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
                    disabled={loading}
                >
                    {loading ? "Analyzing..." : "Analyze"}
                </button>

            </div>
            {/* SUMMARY SECTION */}

            <div className="summary-grid">

                {
                    loading ? (
                        <>
                            <div className="skeleton-card"></div>
                            <div className="skeleton-card"></div>
                            <div className="skeleton-card"></div>
                            <div className="skeleton-card"></div>
                        </>
                    ) : (
                        profile && (
                            <>
                                <div className="summary-card">
                                    <FaTrophy className="summary-icon"/>
                                    <p>Contest Rating</p>
                                    <h2>{profile.rating}</h2>
                                    <span>
                                        Max: {profile.maxRating}
                                    </span>
                                </div>

                                <div className="summary-card">
                                    <FaGlobe className="summary-icon"/>
                                    <p>Global Rank</p>
                                    <h2>{profile.rank}</h2>
                                </div>

                                <div className="summary-card">
                                    <FaFlag className="summary-icon"/>
                                    <p>Country</p>
                                    <h2>{profile.country}</h2>
                                </div>

                                <div className="summary-card">
                                    <FaStar className="summary-icon"/>
                                    <p>Contribution</p>
                                    <h2>{profile.contribution}</h2>
                                </div>
                            </>
                        )
                    )
                }

            </div>
            {/* TOP GRID */}

            <div className="stats-grid">
            {
                loading ? (
                    <div className="card skeleton-large-card skeleton-profile"></div>
                ):(

                    profile && (

                        <div className="card profile-card">
                            <h2 className="card-title">
                                <FaUser></FaUser>
                                Profile Overview
                            </h2>

                            <div className="profile-row">
                                <span>Handle</span>
                                <strong>
                                    {profile.handle}
                                </strong>
                            </div>

                            <div className="profile-row">
                                <span>Rating</span>
                                <strong>
                                    {profile.rating}
                                </strong>
                            </div>

                            <div className="profile-row">
                                <span>Max Rating</span>
                                <strong>
                                    {profile.maxRating}
                                </strong>
                            </div>

                            <div className="profile-row">
                                <span>Rank</span>
                                <strong>
                                    {profile.rank}
                                </strong>
                            </div>

                            <div className="profile-row">
                                <span>Country</span>
                                <strong>
                                    {profile.country}
                                </strong>
                            </div>

                        </div>
                    )
                    )
                }
                {
                    loading ? (
                        <div className="card skeleton-large-card skeleton-placement"></div>
                    ):(    
                        placementScore && (

                            <div className="card">

                                <h2 className="card-title">
                                    <FiTarget/>
                                    Placement Score
                                </h2>
                                <div className="score-layout">

                                    <div className="score-left">

                                        <div
                                            className="score-circle"
                                            style={{
                                                background: `conic-gradient(
                                                    #4dd0e1 0deg,
                                                    #4dd0e1 ${placementScore.score * 3.6}deg,
                                                    #222 ${placementScore.score * 3.6}deg,
                                                    #222 360deg
                                                )`
                                            }}
                                        >
                                            <div className="score-inner">
                                                <div>
                                                    <div className="score-value">
                                                        {placementScore.score}
                                                    </div>
                                                    <div className="score-max">
                                                        /100
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="score-badge">
                                            <FaStar/> 
                                            {placementScore.level}
                                        </div>
                                    </div>
                                    <div className="score-details">
                                        <div className="metric-card">
                                            <div className="metric-left">
                                                <FaTrophy/>
                                                <span>Contests</span>
                                                <strong>{placementScore.contests}</strong>
                                            </div>
                                            
                                        </div>
                                        <div className="metric-card">
                                            <div className="metric-left">
                                                <FaBook/>
                                                <span>Problems Solved</span>
                                                <strong>{placementScore.problemsSolved}</strong>
                                            </div>
                                        </div>
                                            
                                        <div className="metric-card">
                                            <div className="metric-left">
                                                <FaBullseye/>
                                                <span>Topic Coverage</span>
                                                <strong>{placementScore.topicCoverage}</strong>
                                            </div>
                                        </div>
                                            
                                    </div>
                                </div>               
                            </div>
                        )
                        )
                    }
            </div>

            {/* SECOND GRID */}

            <div className="stats-grid">
                {
                    loading ? (

                        <div className="card skeleton-large-card skeleton-topics"></div>

                    ) : (
                                weakTopics.length > 0 && (

                                    <div className="card">

                                        <h2 className="card-title">
                                            <MdOutlineWarningAmber className="weak-icon"/>
                                            Weak Topics
                                        </h2>

                                        {

                                            weakTopics.map(
                                                (
                                                    topic,
                                                    index
                                                ) => (

                                                    <div
                                                        className="topic-bar-card"
                                                        key={index}
                                                    >
                                                        <div className="topic-header">
                                                            <span>
                                                                {topic.topic}
                                                            </span>
                                                            <strong>
                                                                {topic.percentage}%
                                                            </strong>

                                                        </div>
                                                        <div className="progress-bar">
                                                            <div 
                                                                className="weak-fill"
                                                                style={{
                                                                    width:
                                                                    `${topic.percentage}%`
                                                                }}    
                                                            >
                                                            </div>
                                                        </div>
                                                    </div>               
                                                )
                                            )
                                        }

                                </div>

                            )
                        )
                        }
                {
                    loading ? (

                        <div className="card skeleton-large-card skeleton-topics"></div>

                    ) : (
                                strongTopics.length > 0 && (

                                    <div className="card">

                                        <h2 className="card-title">
                                            <GiBiceps className="strong-icon"/>
                                            Strong Topics
                                        </h2>

                                        {

                                            strongTopics.map(
                                                (
                                                    topic,
                                                    index
                                                ) => (

                                                    <div
                                                        className="topic-bar-card"
                                                        key={index}
                                                    >

                                                        <div className="topic-header">

                                                            <span>
                                                                {topic.topic}
                                                            </span>

                                                            <strong>
                                                                {topic.percentage}%
                                                            </strong>

                                                        </div>

                                                        <div className="progress-bar">

                                                            <div
                                                                className="strong-fill"
                                                                style={{
                                                                    width:
                                                                    `${topic.percentage}%`
                                                                }}
                                                            />

                                                        </div>

                                                    </div>

                                                )
                                            )
                                        }

                                    </div>

                                )
                            )
                            }

            </div>

            {/* RECOMMENDATIONS */}

            {
                loading ? (

                    <div className="card skeleton-large-card"></div>

                ) : (

                    recommendations.length > 0 && (


                                <div className="card recommendation-card">

                                    <h2 className="card-title">
                                        <BsLightbulb/>
                                        Recommended Problems
                                    </h2>

                                    <p>

                                        Weakest Topic :

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

                                                        <div className="problem-top">

                                                            <h3>
                                                                {problem.name}
                                                            </h3>

                                                            <span className="problem-rating">
                                                                {problem.difficulty}
                                                            </span>

                                                        </div>

                                                        <div className="problem-bottom">

                                                            <div className="problem-tags">

                                                                <span className="tag">
                                                                    {problem.topic}
                                                                </span>

                                                                <span className="tag">
                                                                    {problem.platform}
                                                                </span>

                                                            </div>

                                                            <span className="arrow">
                                                                →
                                                            </span>

                                                        </div>

                                                    </div>
                                                ))
                                        }
                                    </div>
                                </div>
                            )
                        )
                        }
        </div>
    );
}

export default Dashboard;