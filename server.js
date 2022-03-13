const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config()

const calculusRoute = require("./routes/calculus.routes")

app.use(express.json());
app.use("/api/calculator", calculusRoute);

app.get("/healthcheck", (req, res) => {
    res.send('running!!!');
});

const start = async () => {
    try {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running at ${process.env.PORT}...🍀`);
        })
    } catch (e) {
        console.log(e);
    }
};

start().catch(console.error)

module.exports = app