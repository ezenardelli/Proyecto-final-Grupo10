module.exports = (sequelize, DataTypes) => {
    
    const alias = 'Product';

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(45),
        },
        image: {
            type: DataTypes.STRING(100),
        },
        description: {
            type: DataTypes.STRING(200),
        },
        origin: {
            type: DataTypes.STRING(45),
        },
        destination: {
            type: DataTypes.STRING(45),
        },
        person: {
            type: DataTypes.STRING(45),
        },
        date: {
            type: DataTypes.DATE,
        },
        price: {
            type: DataTypes.FLOAT,
        },
        category_id: {
            type: DataTypes.INTEGER,
        }
    };
    
    const config = {
        tableName: 'product',
        timestamps: false,
    };

    const Product = sequelize.define(alias, cols, config);

    Product.associate = (models) => {
        Product.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'category_id'
        })
        Product.belongsToMany(models.OrderList, {
            as: 'orderList',
            through: 'order_product',
            foreignKey: 'product_order_id',
            otherKey: 'order_product_id',
            timestamps: false
        })
    };

    return Product;
};

