const pmx = require('pmx')
    , _ = require('lodash')

module.exports = function refreshLockCount(metrics, sql) {
  sql`
    SELECT mode, count(mode) AS count FROM pg_locks GROUP BY mode ORDER BY mode
  `
  .then(xs => {
    metrics.accessShareLockCount.set(
      _.get(_.find(xs, { mode: 'AccessShareLock' }), 'count', 'N/A')
    )
    metrics.exclusiveLockCount.set(
      _.get(_.find(xs, { mode: 'ExclusiveLock' }), 'count', 'N/A')
    )
  })
  .catch(err =>
    pmx.notify('Lock Query Error: ' + err)
  )
}
