const pmx = require('pmx')
    , _ = require('lodash')

function initActions(sql) {
  pmx.action('List DBs', function(reply) {
    sql`SELECT datname FROM pg_database WHERE datistemplate = false;`
    .then(rows => reply(_.pluck(rows, 'datname')))
    .catch(reply)
  })

  pmx.action('Show Settings', function(reply) {
    sql`SHOW ALL`.then(reply, reply)
  })
}

function init(sql) {
  initActions(sql)
}

module.exports.init = init
