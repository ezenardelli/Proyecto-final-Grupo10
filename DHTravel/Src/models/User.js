const fs = require('fs');
const path = require('path');

const User = {

    filename: path.join(__dirname, '../database/users.json'),

    getAllUsers: () => {
        return JSON.parse(fs.readFileSync(User.filename, 'utf-8'))
    },

    findAll: () => {
        return User.getAllUsers;
    },

    newId: () => {
        const allUsers = User.getAllUsers();
        if (allUsers.length) {
            return (allUsers[allUsers.length - 1].id) + 1;
        } else {
            return 1;
        }
    },

    create: (data) => {
        const users = User.getAllUsers();
        const newUser = {
            id: User.newId(),
            ...data
        }
        users.push(newUser);
        fs.writeFile(User.filename, JSON.stringify(users, null, 4), (err) => {
            if (err) {
                return false
            }
        });
        return newUser;
    },

    delete: (id) => {
        let allUsers = User.getAllUsers();
        let newListUsers = allUsers.filter(user => user.id !== id);
        fs.writeFileSync(User.filename, JSON.stringify(newListUsers, null, 4));
        return true
    },

    findByPk: (id) => {
        return User.getAllUsers().find((e) => e.id == id);
    },
    
    findByField: (field, text) => {
        return User.getAllUsers().find((e) => e[field] == text);
    },
};

module.exports = User;
