const pmx = require('pmx')

module.exports = function refreshBackendMetrics(metrics, sql) {
  sql`
    SELECT count(*) - ( SELECT count(*) FROM pg_stat_activity WHERE
    state = 'idle' ) AS backends_active, ( SELECT count(*) FROM
    pg_stat_activity WHERE state = 'idle' ) AS backends_idle
    FROM pg_stat_activity
  `.then(([x]) => {
    metrics.backendsActive.set(x.backends_active)
    metrics.backendsIdle.set(x.backends_idle)
  })
  .catch(err => pmx.notify('Backend Query Error: ' + err))
}
