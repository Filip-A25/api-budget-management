const {authenticateDatabase} = require("../config/Database");
const {handleDataValidation} = require("../services/TransactionService");
const {QueryTypes} = require("sequelize");
const {TransactionIncome, transaction_income_sequelize} = require("../models/TransactionIncomeModel");
const {TransactionExpense, transaction_expense_sequelize} = require("../models/TransactionExpenseModel");
const {Category} = require("../models/CategoryModel");

const fetchCompleteTransactions = async (req, res, next) => {
    const query = `SELECT * FROM (
            SELECT 'income' AS type, * FROM transaction_income
            UNION ALL
            SELECT 'expense' AS type, * FROM transaction_expense
        ) AS transaction_combined ORDER BY date DESC;`;
    
    try {
        await authenticateDatabase(transaction_income_sequelize);

        const queryResult = await transaction_income_sequelize.query(query, {
            type: QueryTypes.SELECT
        });

        console.log(queryResult);
        if (!queryResult) return res.status(404).json({success: false, meesage: "Transactions could not be found."});
        res.status(200).json({success: true, data: queryResult});
    } catch (err) {
        res.sendStatus(500);
    }
}

const fetchIncomeTransactions = async (req, res, next) => {
    try {
        await authenticateDatabase(transaction_income_sequelize);

        const queryResult = await TransactionIncome.findAll();

        if (!queryResult) return res.status(404).json({success: false, message: "Transactions could not be found."});
        res.status(200).json({success: true, data: queryResult});
    } catch (err) {
        res.status(500).send(err);
    }
}

const fetchIncomeTransactionsJoined = async (req, res, next) => {
    try {
        await authenticateDatabase(transaction_income_sequelize);

        const queryResult = await TransactionIncome.findAll({
            include: Category
        })

        if (!queryReuslt) return res.status(404).json({success: false, data: "Transactions could not be found."});
        console.log(queryResult);
        res.status(200).json({success: true, data: queryResult});
    } catch (err) {
        res.status(500).send(err);
    }
}

const fetchExpenseTransactionsJoined = async (req, res, next) => {
    try {
        await authenticateDatabase(transaction_expense_sequelize);

        const queryResult = await TransactionExpense.findAll({
            include: Category
        })

        if (!queryReuslt) return res.status(404).json({success: false, data: "Transactions could not be found."});
        console.log(queryResult);
        res.status(200).json({success: true, data: queryResult});
    } catch (err) {
        res.status(500).send(err);
    }
}

const fetchExpenseTransactions = async (req, res, next) => {
    try {
        await authenticateDatabase(transaction_expense_sequelize);

        const queryResult = await TransactionExpense.findAll();

        if (!queryResult) return res.status(404).json({success: false, message: "Transactions could not be found."});
        res.status(200).json({success: true, data: queryResult});
    } catch (err) {
        res.status(500).send(err);
    }
}

const createTransaction = async (req, res, next) => {
    const {date, flow, desc, amount, category, currency, transactor} = req.body;

    if (!date || !flow || !desc || !amount || !category || !currency || !transactor) res.status(401).send("Invalid input.");
    const sequelizeName = Number(flow) === 0 ? transaction_income_sequelize : transaction_expense_sequelize;

    const formattedData = await handleDataValidation({date: date, flow: flow, desc: desc, amount: amount, category: category, transactor: transactor});
    try {
        await authenticateDatabase(sequelizeName);

        if (!req.categoryId || !req.currencyId) return res.status(401).json({success: false, message: "Couldnt fetch details."});
        const transaction = Number(flow) === 0 ? new TransactionIncome() : new TransactionExpense();
        await transaction.createTransaction(formattedData.date, formattedData.desc, formattedData.amount, req.categoryId, req.currencyId, transactor);

        res.status(201).json({success: true, message: "Transaction successfully created."});
    } catch (err) {
        res.sendStatus(500);
    }
}

const updateTransaction = async (req, res, next) => {
    const {id} = req.params;
    const {data, flow} = req.body;

    if (!id || !data) return res.status(401).send("Invalid input.");
    const sequelizeName = Number(flow) === 0 ? transaction_income_sequelize : transaction_expense_sequelize;

    try {
        await authenticateDatabase(sequelizeName);

        const transaction = Number(flow) === 0 ? new TransactionIncome() : new TransactionExpense();
        data.forEach(async query => {
            await transaction.updateTransaction(Number(id), query);
        });

        res.status(201).json({success: true, message: "Transaction successfully updated."});
    } catch (err) {
        res.sendStatus(500);
    }
}

const deleteTransaction = async (req, res, next) => {
    const {id} = req.params;
    const {flow} = req.body;

    if (!id) return res.status(401).send("Invalid input.");
    const sequelizeName = Number(flow) === 0 ? transaction_income_sequelize : transaction_expense_sequelize;

    //const tableType = getTableType(Number(flow));
 
    try {
        await authenticateDatabase(sequelizeName);

        const transaction = Number(flow) === 0 ? new TransactionIncome() : new TransactionExpense();
        await transaction.deleteTransaction(Number(id));

        res.status(201).json({success: true, message: "Transaction successfully deleted"});
    } catch (err) {
        res.sendStatus(500);
    }
}

/*
const fetchTotal = async (req, res, next) => {
    const {flow} = req.body;

    if (!flow) return res.sendStatus(400);
    const tableType = await getTableType(Number(flow));

    if (!tableType || tableType === "") return res.sendStatus(400);
    
    try {
        if (tableType === "transaction_income" || tableType === "transaction_expense") {
            const total = await Transaction.findAndCountAll({
                
            })
        }
    }
    let query;
    if (tableType === "transaction_income" || tableType === "transaction_expense") {
        query = {
            text: "SELECT SUM (amount) FROM $1",
            values: [tableType]
        }
    }
    if (tableType === "transaction_all") {
        query = {
            text: `SELECT SUM (amount) FROM (
                SELECT "income" AS type, * FROM transaction_income
                UNION ALL
                SELECT "expense" AS type, * FROM transaction_expense 
            ) AS transaction_combined`,
            values: []
        }
    }
}
*/

module.exports = {fetchCompleteTransactions, fetchIncomeTransactions, fetchIncomeTransactionsJoined, fetchExpenseTransactionsJoined, fetchExpenseTransactions, createTransaction, updateTransaction, deleteTransaction};