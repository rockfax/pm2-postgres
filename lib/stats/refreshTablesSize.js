const pmx = require('pmx')
    , humanize = require('humanize')

module.exports = function refreshTablesSize(metrics, sql) {
  sql`
    SELECT ((sum(relpages)* 8) * 1024) AS size_relations FROM pg_class WHERE relkind IN ('r', 't')
  `
  .then(([x]) => metrics.tablesSize.set(humanize.filesize(x.size_relations)))
  .catch(err => pmx.notify('Table Size Query Error: ' + err))
}
