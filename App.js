const express = require("express");
const app = express();
require("dotenv").config();
const TransactionRoutes = require("./routes/TransactionRoutes");
const TransactorRoutes = require("./routes/TransactorRoutes");
const cors = require("cors");

app.use(cors());
//app.use(express.static("./views/public"));
app.use(express.json());
app.use("/api/transactions", TransactionRoutes);
app.use("/api/transactors", TransactorRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${process.env.PORT}...`);
})