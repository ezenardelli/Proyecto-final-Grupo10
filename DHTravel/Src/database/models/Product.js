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
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(100),
        },
        description: {
            type: DataTypes.STRING(300),
            allowNull: false
        },
        origin: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        destination: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        person: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false
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

