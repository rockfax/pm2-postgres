var pmx = require('pmx');

module.exports = function refreshTransactionMetrics(metrics, pgClient) {
  var queryString = "SELECT sum(xact_commit) AS transactions_committed,"
    + " sum(xact_rollback) AS transactions_rollback, sum(blks_read) AS blocks_read,"
    + " sum(blks_hit) AS blocks_hit, sum(tup_returned) AS tuples_returned,"
    + " sum(tup_fetched) AS tuples_fetched, sum(tup_inserted) AS tuples_inserted,"
    + " sum(tup_updated) AS tuples_updated, sum(tup_deleted) AS tuples_deleted"
    + " FROM pg_stat_database;";
  pgClient.query(queryString, function (err, rows) {
    if (err) {
      return pmx.notify("Transaction Query Error: " + err);
    }

    // Transactions Committed
    metrics.transactionsCommitted.set(rows[0].transactions_committed);

    // Transactions Rollback
    metrics.transactionsRollback.set(rows[0].transactions_rollback);

    // Tuples Fetched
    metrics.tuplesFetched.set(rows[0].tuples_fetched);

    // Tuples Inserted
    metrics.tuplesInserted.set(rows[0].tuples_inserted);

    // Tuples Updated
    metrics.tuplesUpdated.set(rows[0].tuples_updated);

    // Tuples Deleted
    metrics.tuplesDeleted.set(rows[0].tuples_deleted);
  });
};
