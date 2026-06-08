const axios = require("axios");

const getProfile = async (handle) => {

    const response = await axios.get(
        `https://codeforces.com/api/user.info?handles=${handle}`
    );

    return response.data;
};

module.exports = {
    getProfile
};