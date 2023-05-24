const { validationResult } = require('express-validator');
const db = require('../../database/models');

const userApiController = {
  getAllusers: async (req, res) => {
    try {
      const limit = 10;
      const offset = req.query.offset ? parseInt(req.query.offset) : 0;

      const users = await db.User.findAll({
        offset: offset,
        limit: limit
      });
      const count = await db.User.count();

      const nextOffset = offset + limit;
      const previousOffset = offset - limit;

      const userData = {
        count: count,
        next: nextOffset < count ? `http://localhost:3031/api/users?offset=${nextOffset}`: null,
        previous: previousOffset >= 0 ? `http://localhost:3031/api/users?offset=${previousOffset}`: null,
        users: users.map((user) => ([{
          id: user.id,
          name: user.firstName,
          email: user.email,
          detail: `http://localhost:3031/api/users/${user.id}`,
        }])),
      };

      res.json(userData);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
  },

  getUserbyId: async (req, res) => {
    try {
      const user = await db.User.findByPk(req.params.id)

      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      const userData = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: `http://localhost:3031/img/users/${user.image}`,
      };

      res.json(userData);
    } catch (error) {
      res.status(500).json({error: 'Error al obtener el usuario'})
    }
  },
};

module.exports = userApiController;
