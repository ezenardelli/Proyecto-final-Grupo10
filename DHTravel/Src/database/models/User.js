module.exports = (sequelize, DataTypes) => {
    
    const alias = 'Users';

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING(45),
        },
        lastName: {
            type: DataTypes.STRING(45),
        },
        email: {
            type: DataTypes.STRING(45),
        },
        category: {
            type: DataTypes.STRING(45),
        },
        password: {
            type: DataTypes.STRING(45),
        },
        image: {
            type: DataTypes.STRING(45),
        }
    };
    
    const config = {
        tableName: 'user',
        timestamps: false,
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = (models) => {
        User.belongsTo(models.OrderList, {
            as: 'orderList',
            foreignKey: 'user_id'
        })
    };

    return User;
};

