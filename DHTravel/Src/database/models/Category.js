module.exports = (sequelize, DataTypes) => {

    const alias = 'Category';

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category: {
            type: DataTypes.STRING(45),
            allowNull: false
        }
    };
    
    const config = {
        tableName: 'category',
        timestamps: false,
    };

    const Category = sequelize.define(alias, cols, config);

    Category.associate = (models) => {
        Category.hasMany(models.Product, {
            as: 'product',
            foreignKey: 'category_id'
        })
    };

    return Category;
};