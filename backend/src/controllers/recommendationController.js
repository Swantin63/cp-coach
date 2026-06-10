const { getSubmissions } =
require("../services/topicService");

const {
    problemBank
} = require("../services/recommendationService");

const fetchRecommendations = async (req, res) => {

    try {
        console.time("recommendation");
        const handle = req.params.handle;

        const data = await getSubmissions(handle);

        const submissions = data.result;

        const topicCount = {};

        for (const submission of submissions) {

            const tags = submission.problem.tags;

            for (const tag of tags) {

                topicCount[tag] =
                    (topicCount[tag] || 0) + 1;
            }
        }

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

        const filteredTopics =
            Object.entries(topicCount)
            .filter(([topic]) =>
                importantTopics.includes(topic)
            );

        filteredTopics.sort(
            (a, b) => a[1] - b[1]
        );

        const weakestTopic =
            filteredTopics[0][0];

        const recommendations =
            problemBank[weakestTopic] || [];

        res.json({
            weakestTopic,
            recommendations
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};

module.exports = {
    fetchRecommendations
};