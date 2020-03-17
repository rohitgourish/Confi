const { Pool } = require('pg')
const pool = new Pool({
  host                    : 'localhost',
  user                    : 'postgres',
  password                : 'root',
  database                : 'organization',
  port                    : 5432,
})
module.exports.pool = pool;