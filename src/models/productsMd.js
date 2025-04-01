const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  product_id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  category_id: {
    type: DataTypes.INTEGER(11),
    allowNull: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: true,
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  },
  is_available: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: true
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW
  },
  points_earned: {
    type: DataTypes.INTEGER(11),
    allowNull: true,
    defaultValue: 0
  }
}, {
  tableName: 'products',
  timestamps: false,
  underscored: true 
});

Product.associate = function(models) {
  Product.belongsTo(models.Category, {
    foreignKey: 'category_id',
    as: 'category' 
  });
};

module.exports = Product;