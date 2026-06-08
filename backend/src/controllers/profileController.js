const {
    getProfile
} = require("../services/codeforcesService");

const fetchProfile = async (req, res) => {

    try {

        const handle = req.params.handle;

        const data = await getProfile(handle);

        res.json(data);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

module.exports = {
    fetchProfile
};