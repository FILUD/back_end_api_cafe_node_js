const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Inventory = sequelize.define('Inventory', {
    inventory_id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    product_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
            model: 'products',
            key: 'product_id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER(11),
        allowNull: true
    },
    last_restock_date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
    min_stock_level: {
        type: DataTypes.INTEGER(11),
        allowNull: true
    },
}, {
    tableName: 'inventory',
    timestamps: false
});

Inventory.associate = function(models) {
    Inventory.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'product'
    });
};

module.exports = Inventory;