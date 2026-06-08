const { getSubmissions } =
require("../services/topicService");

const { getContestHistory } =
require("../services/contestService");

const fetchPlacementScore = async (req, res) => {

    try {

        const handle = req.params.handle;

        // Contest Data
        const contestData =
            await getContestHistory(handle);

        const contests =
            contestData.result.length;

        // Submission Data
        const submissionData =
            await getSubmissions(handle);

        const submissions =
            submissionData.result;

        const problemsSolved =
            submissions.length;

        // Important Topics
        const importantTopics = [
            "implementation",
            "math",
            "greedy",
            "dp",
            "graphs",
            "trees",
            "binary search",
            "strings",
            "number theory",
            "constructive algorithms",
            "data structures",
            "sortings",
            "two pointers",
            "bitmasks",
            "brute force",
            "combinatorics"
        ];

        const solvedTopics =
            new Set();

        for (const submission of submissions) {

            const tags =
                submission.problem.tags;

            for (const tag of tags) {

                if (
                    importantTopics.includes(tag)
                ) {
                    solvedTopics.add(tag);
                }
            }
        }

        const topicCoverage =
            solvedTopics.size;

        // Score Formula
        let score =
            (contests * 1) +
            (problemsSolved * 0.05) +
            (topicCoverage * 2);

        if (score > 100) {
            score = 100;
        }

        let level;

        if (score >= 80) {
            level = "Excellent";
        }
        else if (score >= 60) {
            level = "Good";
        }
        else if (score >= 40) {
            level = "Average";
        }
        else {
            level = "Beginner";
        }

        res.json({
            score: Math.round(score),
            level,
            contests,
            problemsSolved,
            topicCoverage
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};

module.exports = {
    fetchPlacementScore
};