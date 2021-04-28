const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRouter = require('./routes/user')

const app = express();

connectDB()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3030;

app.use('/api/v1/user', userRouter);

app.get('/', (req, res) => {
    res.send('Yes, welcome to the server')
})

app.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`)
});
