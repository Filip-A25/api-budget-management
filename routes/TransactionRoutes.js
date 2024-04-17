const express = require("express");
const router = express.Router();
const {fetchCompleteTransactions, fetchIncomeTransactions, fetchIncomeTransactionsJoined, fetchExpenseTransactionsJoined, fetchExpenseTransactions, createTransaction, updateTransaction, deleteTransaction} = require("../controllers/TransactionController");
const {fetchCategory, fetchCurrency} = require("../middlewares/TransactionMiddleware");

router.route("/fetch-complete").get(fetchCompleteTransactions);
router.route("/fetch-income").get(fetchIncomeTransactions);
router.route("/fetch-income-joined").get(fetchIncomeTransactionsJoined);
router.route("/fetch-expense-joined").get(fetchExpenseTransactionsJoined);
router.route("/fetch-expense").get(fetchExpenseTransactions);
router.route("/create").post(fetchCategory, fetchCurrency, createTransaction);
router.route("/update/:id").patch(updateTransaction);
router.route("/delete/:id").delete(deleteTransaction);

module.exports = router;