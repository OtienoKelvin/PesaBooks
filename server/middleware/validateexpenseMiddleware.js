
module.exports = (req, res, next) => {
    const { business_id, category, amount, date, note } = req.body;
    if (!business_id || !category || !amount || !date || !note) {
        return res.status(400).json("Missing required fields");
    }
    next();
};
