module.exports = (sequelize, DataTypes) => {
    
    const alias = 'Payment';

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        full_name: {
            type: DataTypes.STRING(45),
        },
        credit_number: {
            type: DataTypes.FLOAT(16),
        },
        expire: {
            type: DataTypes.FLOAT(4),
        },
        cvv: {
            type: DataTypes.FLOAT(5),
        },
        id_card: {
            type: DataTypes.FLOAT(15)
        }
    };
    
    const config = {
        tableName: 'payment',
        timestamps: false,
    };

    const Payment = sequelize.define(alias, cols, config);

    Payment.associate = (models) => {
        Payment.hasMany(models.OrderList, {
            as: 'orderList',
            foreignKey: 'payment_id'
        })
    };

    return Payment;
};