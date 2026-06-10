const { getSubmissions } = require("../services/topicService");

const fetchWeakTopics = async (req, res) => {
    try {
        console.time("weak-topic");
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

        const maxCount =
            Math.max(
                ...filteredTopics.map(
                    ([, count]) => count
                )
            );

        const weakTopics =
            filteredTopics
                .sort((a, b) => a[1] - b[1])
                .slice(0, 3)
                .map(([topic, count]) => ({

                    topic,

                    percentage:
                        Math.round(
                            (count / maxCount) * 100
                        )

                }));

        res.json({
            weakTopics
        }); 
    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

    };

    module.exports = {
        fetchWeakTopics
    };