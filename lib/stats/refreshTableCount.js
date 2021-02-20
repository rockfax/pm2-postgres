const pmx = require('pmx')

module.exports = function refreshTableCount(metrics, sql) {
  sql`
    SELECT count(1) as relations FROM pg_class WHERE relkind IN ('r', 't')
  `
  .then(([x]) => metrics.tableCount.set(x.relations))
  .catch(err =>
    pmx.notify('Table Query Error: ' + err)
  )
}
