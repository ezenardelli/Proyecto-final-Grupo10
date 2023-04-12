module.exports = (sequelize, DataTypes) => {
    
    const alias = 'OrderProduct';

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    };
    
    const config = {
        tableName: 'order_product',
        timestamps: false,
    };

    const OrderProduct = sequelize.define(alias, cols, config);

    return OrderProduct;
};