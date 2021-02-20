var pmx = require('pmx');

module.exports = function refreshIndexCount(metrics, pgClient) {
  var queryString = "SELECT count(1) as indexes FROM pg_class WHERE relkind = 'i';";
  pgClient.query(queryString, function (err, rows) {
    if (err) {
      return pmx.notify("Index Query Error: " + err);
    }

    // # of Indexes
    metrics.indexCount.set(rows[0].indexes);
  });
};
