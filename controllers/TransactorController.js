const {Client} = require("pg");
const {connection} = require("../config/Database");
const {getFormattedEmail, getFormattedName} = require("../services/TransactorService");
const {transaction_income_sequelize} = require("../models/TransactionIncomeModel");
const {transaction_expense_sequelize} = require("../models/TransactionExpenseModel");
const {currency_sequelize} = require("../models/CurrencyModel");
const {category_sequelize} = require("../models/CategoryModel");

const createTransactor = async (req, res, next) => {
    const {name, email} = req.body;

    if (!name) return res.status(401).json({success: false, message: "Invalid input."});

    const formatEmail = await getFormattedEmail(email);
    const formatName = await getFormattedName(name);

    
}

module.exports = {createTransactor};