const { getSubmissions } = require("../services/topicService");

const fetchTopics = async (req, res) => {

    try {

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

        res.json(topicCount);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};

module.exports = {
    fetchTopics
};