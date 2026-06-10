const { getContestHistory } =
require("../services/contestService");

const fetchContestHistory = async (req,res) => {
   console.time("contest-history");
   const handle = req.params.handle;

   const data = await getContestHistory(handle);

   res.json(data);
};

module.exports = { fetchContestHistory };