const { getSubmissions } = require("../services/topicService");

const fetchStrongTopics = async (req, res) => {
    try {

        const handle = req.params.handle;

        const data = await getSubmissions(handle);

        const submissions = data.result;

        const topicCount = {};

        // Count tags from all submissions
        for (const submission of submissions) {

            const tags = submission.problem.tags;

            for (const tag of tags) {

                topicCount[tag] =
                    (topicCount[tag] || 0) + 1;
            }
        }

        // Important CP topics only
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

        // Keep only important topics
        const filteredTopics = Object.entries(topicCount)
            .filter(([topic]) =>
                importantTopics.includes(topic)
            );

        // Sort by count (ascending)
        filteredTopics.sort((a, b) => a[1] - b[1]);

        // Take weakest 3 topics
        const strongTopics = filteredTopics
            .slice(-3)
            .map(([topic]) => topic);

        res.json({
            strongTopics
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};

module.exports = {
    fetchStrongTopics
};