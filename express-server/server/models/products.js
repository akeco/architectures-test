'use strict';
module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    title: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  Products.associate = function(models) {
    // associations can be defined here
  };
  return Products;
};