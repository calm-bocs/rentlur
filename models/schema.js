const connection = require('../knexfile')
const { Model } = require('objection')
const Knex = require('knex')
//connects the database to objection
const knexConnection = Knex(connection.production)
Model.knex(knexConnection)

//creates the relationship between the two tables
class Property extends Model {
  static get tableName () {
    return 'properties'
  }
  static get relationMappings () {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'properties.user_id',
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
      property: {
        relation: Model.HasManyRelation,
        modelClass: Property,
        join: {
          from: 'users.id',
          to: 'properties.user_id'
        }
      }
    }
  }
}

module.exports = { Property, User }