
export function up(knex) {
    return Promise.all([
        knex.schema.createTable('event', (table) => {
            table.increments('id').primary();
            table.integer('provider_id');
            table.string('slug');
            table.string('title').collate('utf8mb4_unicode_ci');
            table.text('description').collate('utf8mb4_unicode_ci');
            table.timestamp('provider_created_at');
            table.string('image_url');
            table.timestamp('start_date');
            table.timestamp('end_date');
            table.boolean('active').defaultTo(true);
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
            .then(() => {
                console.log('Table event was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};

export function down(knex) {
    return Promise.all([
        knex.schema.dropTable('event')
            .then(() => {
                console.log('Table event was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};
