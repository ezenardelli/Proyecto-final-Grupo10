module.exports = (sequelize, DataTypes) => {
    
    const alias = 'OrderList';

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        payment_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };
    
    const config = {
        tableName: 'orderList',
        timestamps: false,
    };

    const OrderList = sequelize.define(alias, cols, config);

    OrderList.associate = (models) => {
        OrderList.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id'
        })
    };

    OrderList.associate = (models) => {
        OrderList.belongsTo(models.Payment, {
            as: 'payment',
            foreignKey: 'payment_id'
        });
        
        OrderList.belongsToMany(models.Product, {
            as: 'product',
            through: 'order_product',
            foreignKey: 'order_product_id',
            otherKey: 'product_order_id',
            timestamps: false
        })
    };

    return OrderList;
};