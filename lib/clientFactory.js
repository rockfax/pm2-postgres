const postgres = require('postgres')
    , pmx = require('pmx')

function build(conf) {
  const sql = postgres({
    ...conf,
    idle_timeout: 30
  })

  sql`select 1`.catch(err =>
    pmx.notify('Could not connect to postgres: ' + err)
  )

  return {
    query: (queryString, cb) => sql.unsafe(queryString).then(x => cb(null, x), cb)
  }
}

module.exports.build = build
