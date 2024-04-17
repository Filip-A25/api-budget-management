const {Sequelize, DataTypes, Model} = require("sequelize");
const {connection} = require("../config/Database");

const currency_sequelize = new Sequelize(connection, {
    quoteIdentifiers: false,
    freezeTableName: true
});

class Currency extends Model {}

Currency.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    symbol: {
        type: DataTypes.CHAR(3),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    }
}, {
    sequelize: currency_sequelize,
    modelName: "Currency",
    tableName: "currency",
    timestamps: false
});

module.exports = {Currency, currency_sequelize};