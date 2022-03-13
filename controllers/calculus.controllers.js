const math = require("mathjs");

const calculusHandler = async (req, res) => {
    const query = req.query.query;
    let result;
    try {
        if (query === "") {
            res.status(400).json({error: true, message: "query is empty"})
        } else {
            const buff = Buffer.from(query, 'base64');
            const str = buff.toString('utf-8');
            result = math.evaluate(str);
            res.status(200).json({error: false, result: result})
        }

    } catch (e) {
        console.log(e);
        res.status(400).json({error: true, message: e.message})
    }
}

module.exports = {calculusHandler}