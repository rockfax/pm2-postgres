const pmx = require('pmx')
    , refreshTableCount = require('./stats/refreshTableCount')
    , refreshIndexCount = require('./stats/refreshIndexCount')
    , refreshTransactionMetrics = require('./stats/refreshTransactionMetrics')
    , refreshTablesSize = require('./stats/refreshTablesSize')
    , refreshBackendMetrics = require('./stats/refreshBackendMetrics')
    , refreshLockCount = require('./stats/refreshLockCount')
    , refreshVersion = require('./stats/refreshVersion')

const metrics = {}
    , REFRESH_RATE = 10000
    , probe = pmx.probe()

function initMetrics() {
  metrics.version = probe.metric({
    name: 'PostgreSQL Version',
    value: 'N/A'
  })
  metrics.tableCount = probe.metric({
    name: 'Tables',
    value: 'N/A'
  })
  metrics.indexCount = probe.metric({
    name: 'Indexes',
    value: 'N/A'
  })
  metrics.transactionsCommitted = probe.metric({
    name: 'Transactions Committed',
    value: 'N/A'
  })
  metrics.transactionsRollback = probe.metric({
    name: 'Transactions Rollback',
    value: 'N/A'
  })
  metrics.tuplesFetched = probe.metric({
    name: 'Tuples Fetched',
    value: 'N/A'
  })
  metrics.tuplesInserted = probe.metric({
    name: 'Tuples Inserted',
    value: 'N/A'
  })
  metrics.tuplesUpdated = probe.metric({
    name: 'Tuples Updated',
    value: 'N/A'
  })
  metrics.tuplesDeleted = probe.metric({
    name: 'Tuples Deleted',
    value: 'N/A'
  })
  metrics.tablesSize = probe.metric({
    name: 'Total Tables Size',
    value: 'N/A'
  })
  metrics.backendsActive = probe.metric({
    name: 'Backends Active',
    value: 'N/A'
  })
  metrics.backendsIdle = probe.metric({
    name: 'Backends Idle',
    value: 'N/A',
    alert: {
      mode: 'threshold-avg',
      value: 8,
      msg: 'Too many Idle Backends',
      cmp: '>'
    }
  })
  metrics.accessShareLockCount = probe.metric({
    name: 'Access Share Locks',
    value: 'N/A'
  })
  metrics.exclusiveLockCount = probe.metric({
    name: 'Exclusive Locks',
    value: 'N/A',
    alert: {
      mode: 'threshold-avg',
      value: 500,
      msg: 'Too many Exclusive Locks',
      cmp: '>'
    }
  })
}

// Refresh metrics
function refreshMetrics(sql) {
  refreshTableCount(metrics, sql)
  refreshIndexCount(metrics, sql)
  refreshTransactionMetrics(metrics, sql)
  refreshTablesSize(metrics, sql)
  refreshBackendMetrics(metrics, sql)
  refreshLockCount(metrics, sql)
}

function init(sql) {
  initMetrics()
  setInterval(refreshMetrics.bind(null, sql), REFRESH_RATE)
  refreshVersion(metrics, sql)
}

module.exports.init = init
