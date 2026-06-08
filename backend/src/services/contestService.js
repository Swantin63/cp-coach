const axios = require("axios");

const getContestHistory = async (handle) => {
   const response = await axios.get(
      `https://codeforces.com/api/user.rating?handle=${handle}`
   );

   return response.data;
};

module.exports = { getContestHistory };