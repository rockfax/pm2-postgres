const pmx = require('pmx')

module.exports = function refreshTransactionMetrics(metrics, sql) {
  sql`
    SELECT sum(xact_commit) AS transactions_committed,
    sum(xact_rollback) AS transactions_rollback, sum(blks_read) AS blocks_read,
    sum(blks_hit) AS blocks_hit, sum(tup_returned) AS tuples_returned,
    sum(tup_fetched) AS tuples_fetched, sum(tup_inserted) AS tuples_inserted,
    sum(tup_updated) AS tuples_updated, sum(tup_deleted) AS tuples_deleted
    FROM pg_stat_database
  `
  .then(([x]) => {
    metrics.transactionsCommitted.set(x.transactions_committed)
    metrics.transactionsRollback.set(x.transactions_rollback)
    metrics.tuplesFetched.set(x.tuples_fetched)
    metrics.tuplesInserted.set(x.tuples_inserted)
    metrics.tuplesUpdated.set(x.tuples_updated)
    metrics.tuplesDeleted.set(x.tuples_deleted)
  })
  .catch(err => pmx.notify('Transaction Query Error: ' + err))
}
