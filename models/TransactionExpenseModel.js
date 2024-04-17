const {Sequelize, DataTypes, Model} = require("sequelize");
const {connection} = require("../config/Database");
const {Category} = require("./CategoryModel");
const {Currency} = require("./CurrencyModel");

const transaction_expense_sequelize = new Sequelize(connection, {
    quoteIdentifiers: false,
    freezeTableName: true
});

class TransactionExpense extends Model {
    async createTransaction(date, description, amount, category, currency, payee) {
        try {
            return await TransactionExpense.create({
                date: date,
                description: description,
                amount: amount,
                category: category,
                currency: currency,
                payee: payee
            })
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }

    async updateTransaction(id, data) {
        try {
            return await TransactionExpense.update(data, {
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
            await TransactionExpense.destroy({
                where: {
                    id: id
                }
            })
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }

    static associate(models) {
        TransactionExpense.belongsTo(Category, {foreignKey: "category"});
        TransactionExpense.belongsTo(Currency, {foreignKey: "currency"});
    }

    get categoryName() {
        return this.Currency ? this.Currency.name : null;
    }
}

TransactionExpense.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    category: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    currency: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    payee: {
        type: DataTypes.STRING(120),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    sequelize: transaction_expense_sequelize,
    modelName: "TransactionExpense",
    tableName: "transaction_expense",
    timestamps: false
})

module.exports = {TransactionExpense, transaction_expense_sequelize};