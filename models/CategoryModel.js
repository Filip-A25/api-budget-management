const {Sequelize, DataTypes, Model} = require("sequelize");
const {connection} = require("../config/Database");

const category_sequelize = new Sequelize(connection, {
    quoteIdentifiers: false,
    freezeTableName: true
});

class Category extends Model {}

Category.init({
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
    }
}, {
    sequelize: category_sequelize,
    modelName: "Category",
    tableName: "category",
    timestamps: false
});

module.exports = {Category, category_sequelize};