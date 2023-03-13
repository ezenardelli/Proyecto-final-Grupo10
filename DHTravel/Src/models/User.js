const fs = require('fs');
const path = require('path');

const User = {

    filename: path.join(__dirname, '../database/users.json'),

    getAllUsers: () => {
        return JSON.parse(fs.readFileSync(User.filename, 'utf-8'))
    },

    findAll: () => {
        return this.getAllUsers
    },

    newId: () => {
        const allUsers = User.getAlluser();
        if (allUsers.length) {
            return (allUsers[allUsers.length - 1].id) + 1;
        } else {
            return 1;
        }
    },

    create: (data) => {
        const users = User.getAlluser();
        const newUser = {
            id: User.newId(),
            ...data
        }
        users.push(newUser);
        fs.writeFile(User.filename, JSON.stringify(users, null, ' '), (err) => {
            if (err) {
                return false
            }
        });
        return newUser;
    },

    delete: (id) => {
        let allUsers = this.getAllUsers();
        let newListUsers = allUsers.filter(user => user.id !== id);
        fs.writeFileSync(User.filename, JSON.stringify(newListUsers, null, ' '));
        return true
    },

    findByPk: (id) => {
        return User.getAlluser().find((e) => e.id == id);
    },
    
    findByField: (field, text) => {
        return User.getAlluser().find((e) => e[field] == text);
    },
}
console.log(User.delete(107));
module.exports = User;
