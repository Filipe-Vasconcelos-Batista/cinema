import { Kysely, SqliteDatabase } from 'kysely'

/** Migration used to initialize empty database tables for the test database. */
export async function up(db: Kysely<SqliteDatabase>) {
  await db.schema
    .createTable('screening')
    .ifNotExists()
    .addColumn('id', 'integer', (c) => c.primaryKey().autoIncrement().notNull())
    .addColumn('movie_id', 'integer', (c) =>
      c.notNull().references('movies.id')
    )
    .addColumn('time', 'text', (c) => c.notNull())
    .addColumn('total_tickets', 'integer', (c) => c.notNull())
    .addColumn('taken_tickets', 'integer', (c) => c.notNull())
    .execute()

  await db.schema
    .createTable('users')
    .ifNotExists()
    .addColumn('id', 'integer', (c) => c.primaryKey().autoIncrement().notNull())
    .execute()

  await db.schema
    .createTable('screening_seats')
    .ifNotExists()
    .addColumn('screening_id', 'integer', (c) =>
      c.notNull().references('screening.id')
    )
    .addColumn('user_id', 'integer', (c) => c.notNull().references('users.id'))
    .execute()
}
export async function down(db: Kysely<SqliteDatabase>) {
  await db.schema.dropTable('screening_seats').execute()
  await db.schema.dropTable('users').execute()
  await db.schema.dropTable('screening').execute()
}
