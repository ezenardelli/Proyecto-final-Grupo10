module.exports = (sequelize, DataTypes) => {
    
    const alias = 'User';

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        category: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    };
    
    const config = {
        tableName: 'user',
        timestamps: false,
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = (models) => {
        User.hasMany(models.OrderList, {
            as: 'orderList',
            foreignKey: 'user_id'
        })
    };

    return User;
};

