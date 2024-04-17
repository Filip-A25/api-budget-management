const {Sequelize, DataTypes, Model} = require("sequelize");
const {connection} = require("../config/Database");
const {Category} = require("./CategoryModel");
const {Currency} = require("./CurrencyModel");

const transaction_income_sequelize = new Sequelize(connection, {
    quoteIdentifiers: false,
    freezeTableName: true
});

class TransactionIncome extends Model {
    async createTransaction(date, description, amount, category, currency, payer) {
        try {
            return await TransactionIncome.create({
                date: date,
                description: description,
                amount: amount,
                category: category,
                currency: currency,
                payer: payer
            })
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }

    async updateTransaction(id, data) {
        try {
            return await TransactionIncome.update(data, {
                where: {
                    id: id
                }
            })
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }

    async deleteTransaction(id) {
        try {
            await TransactionIncome.destroy({
                where: {
                    id: id
                }
            })
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }

    static associate() {
        TransactionIncome.belongsTo(Category, {foreignKey: "category"});
        TransactionIncome.belongsTo(Currency, {foreignKey: "currency"});
    }

    get categoryName() {
        return this.Currency ? this.Currency.name : null;
    }
}

TransactionIncome.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validation: {
            notEmpty: true
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validation: {
            notEmpty: true
        }
    },
    amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validation: {
            notEmpty: true
        }
    },
    category: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validation: {
            notEmpty: true
        }
    },
    currency: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validation: {
            notEmpty: true
        }
    },
    payer: {
        type: DataTypes.STRING(120),
        allowNull: false,
        validation: {
            notEmpty: true
        }
    }
}, {
    sequelize: transaction_income_sequelize,
    modelName: "TransactionIncome",
    tableName: "transaction_income",
    timestamps: false
});

module.exports = {transaction_income_sequelize, TransactionIncome};