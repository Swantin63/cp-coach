const { getSubmissions } =
require("../services/topicService");

const fetchTopics = async (req, res) => {
    console.time("topic-controll");
    try {

        const handle =
            req.params.handle;

        const data =
            await getSubmissions(handle);

        const submissions =
            data.result;

        const topicCount = {};

        for (const submission of submissions) {

            const tags =
                submission.problem.tags;

            for (const tag of tags) {

                topicCount[tag] =
                    (topicCount[tag] || 0) + 1;

            }

        }

        const topicArray =
            Object.entries(topicCount)
            .map(([topic, count]) => ({
                topic,
                count
            }));

        const maxCount =
            Math.max(
                ...topicArray.map(
                    t => t.count
                )
            );

        const topicStats =
            topicArray.map(topic => ({

                topic: topic.topic,

                percentage:
                    Math.round(
                        (topic.count / maxCount)
                        * 100
                    )

            }));

        const strongTopics =
            [...topicStats]
            .sort(
                (a, b) =>
                    b.percentage -
                    a.percentage
            )
            .slice(0, 5);

        const weakTopics =
            [...topicStats]
            .sort(
                (a, b) =>
                    a.percentage -
                    b.percentage
            )
            .slice(0, 5);

        res.json({

            strongTopics,

            weakTopics

        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

module.exports = {
    fetchTopics
};