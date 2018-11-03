const connection = require('../knexfile')
const { Model } = require('objection')
const Knex = require('knex')

//connects the database to objection
const knexConnection = Knex(connection.development)
Model.knex(knexConnection)
//check out the docs on https://vincit.github.io/objection.js/#getting-started
//creates the relationship between the two tables and lets you access objection methods
class Favorite extends Model {
  static get tableName () {
    return 'favorites'
  }
  static get relationMappings () {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'favorites.user_id',
          to: 'users.id'
        }
      }
    }
  }
}

class User extends Model {
  static get tableName () {
    return 'users'
  }

  static get relationMappings () {
    return {
      favorite: {
        relation: Model.HasManyRelation,
        modelClass: Favorite,
        join: {
          from: 'users.id',
          to: 'favorites.user_id'
        }
      }
    }
  }
}

module.exports = { Favorite, User }