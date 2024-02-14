const User = (schema, types) => {
    return schema.define('user', {
        email: { type: types.STRING, allowNull: false },
        password: { type: types.STRING, allowNull: false },
        type: { type: types.STRING, allowNull: false }
    }, {
        freezeTableName: true
    });
};

module.exports = User;