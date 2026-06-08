const { getContestHistory } =
require("../services/contestService");

const fetchContestHistory = async (req,res) => {

   const handle = req.params.handle;

   const data = await getContestHistory(handle);

   res.json(data);
};

module.exports = { fetchContestHistory };