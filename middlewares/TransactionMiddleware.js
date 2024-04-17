const {Category, category_sequelize} = require("../models/CategoryModel");
const {Currency, currency_sequelize} = require("../models/CurrencyModel");
const {authenticateDatabase, closeDatabase} = require("../config/Database");

const fetchCategory = async (req, res, next) => {
    const {category} = req.body;

    try {
        await authenticateDatabase(category_sequelize);

        const categoryFetch = await Category.findAll({
            attributes: ["id"],
            where: {
                name: category
            }
        });
        console.log(categoryFetch);
        await closeDatabase(category_sequelize);
        
        req.categoryId = Number(categoryFetch[0].dataValues.id);
        next();
    } catch (err) {
        next(err);
    }
}

const fetchCurrency = async (req, res, next) => {
    const {currency} = req.body;

    try {
        await authenticateDatabase(currency_sequelize);

        const currencyFetch = await Currency.findAll({
            attributes: ["id"],
            where: {
                symbol: currency
            }
        });
        console.log(currencyFetch);
        await closeDatabase(currency_sequelize);

        req.currencyId = Number(currencyFetch[0].dataValues.id); 
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = {fetchCategory, fetchCurrency};