const pmx = require('pmx')

module.exports = function refreshIndexCount(metrics, sql) {
  sql`
    SELECT count(1) as indexes FROM pg_class WHERE relkind = 'i'
  `
  .then(([x]) => metrics.indexCount.set(x.indexes))
  .catch(err => pmx.notify('Index Query Error: ' + err))
}
