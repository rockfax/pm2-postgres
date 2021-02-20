const pmx = require('pmx')

module.exports = function refreshVersion(metrics, sql) {
  sql`
    SELECT version()
  `
  .then(([x]) => {
    const match = x.version.match(/^PostgreSQL (\d(?:(\.\d\d?)+))/)
    match && metrics.version.set(match[1])
  })
  .catch(err => pmx.notify('Version Query Error: ' + err))
}
