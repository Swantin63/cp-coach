const { getSubmissions } =
require("../services/topicService");

const { getContestHistory } =
require("../services/contestService");

const fetchPlacementScore = async (req, res) => {

    try {
        console.time("Placement");
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

        const solvedTopics = new Set();

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

        /* ==========================
           NORMALIZED SCORE
        ========================== */

        const contestScore =
            Math.min(
                (contests / 300) * 30,
                30
            );

        const problemScore =
            Math.min(
                (problemsSolved / 5000) * 40,
                40
            );

        const topicScore =
            Math.min(
                (topicCoverage / 16) * 30,
                30
            );

        const score =
            Math.round(
                contestScore +
                problemScore +
                topicScore
            );

        /* ==========================
           LEVEL
        ========================== */

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
            score,
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