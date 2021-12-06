module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user_food', {
        user_id: DataTypes.STRING,
        item_id: DataTypes.STRING,
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            'default': 0,
        },
    }, {
        timestamps: false,
    });
};