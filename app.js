const pmx = require('pmx')
    , pgClientFactory = require('./lib/clientFactory.js')
    , pgStats = require('./lib/stats.js')
    , pgActions = require('./lib/actions.js')

pmx.initModule({

  pid: pmx.resolvePidPaths([
    '/var/run/postgresql/9.4-main.pid',
    '/var/run/postgresql/9.3-main.pid',
    '/var/run/postgresql/9.5-main.pid',
    '/var/lib/pgsql/12/data/postmaster.pid',
    '/var/lib/pgsql/13/data/postmaster.pid',
    '/var/lib/postgresql/14/main/postmaster.pid',
  ]),

  // Options related to the display style on Keymetrics
  widget: {

    // Logo displayed
    logo: 'http://www.inquidia.com/sites/default/files/postgresql_logo%5B1%5D.png',

    // Module colors
    // 0 = main element
    // 1 = secondary
    // 2 = main border
    // 3 = secondary border
    theme: ['#60798c', '#326892', '#ffffff', '#807C7C'],

    // Section to show / hide
    el: {
      probes: true,
      actions: true
    },

    // Main block to show / hide
    block: {
      actions: true,
      issues: true,
      meta: true,

      // Custom metrics to put in BIG
      main_probes: ['Tables', 'Indexes', 'Total Tables Size', 'Backends Active', 'Exclusive Locks']
    }

  }

}, function(_, conf) {
  const pgClient = pgClientFactory.build(conf)

  // Init metrics refresh loop
  pgStats.init(pgClient)

  // Init actions
  pgActions.init(pgClient)
})
