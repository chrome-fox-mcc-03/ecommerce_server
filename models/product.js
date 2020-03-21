'use strict';
module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.Sequelize.Model
    class Product extends Model {
        static associate(models) {}
    }

    Product.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Product Name Is Required'
                },
                notNull: {
                    args: true,
                    msg: 'Product Name Is Required'
                }
            }
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Image Url Cannot be empty'
                },
                notNull: {
                    args: true,
                    msg: 'Image Url Is Required'
                },
                isUrl: {
                    args: true,
                    msg: 'Image Url Is Required'
                }
            }
        },
        price: {
            type: DataTypes.INTEGER,
            validate: {
                min: {
                    args: 1,
                    msg: 'price cannot be less than 0'
                }
            }
        },
        stock: {
            type: DataTypes.INTEGER
        },
        category: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        }
    }, {
        hooks: {
            beforeCreate: (Product, options) =>{
                if (Product.category !== 'Lokal' || Product.category !== 'Import') Product.category = 'Other'
                if (!Product.stock || Product.stock < 0 ) Product.stock = 0
                if (!Product.description) Product.description = `This is ${Product.name}`
            }
        },
        sequelize,
        modelName: 'Product'
    })
    return Product;
};