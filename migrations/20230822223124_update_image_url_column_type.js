
export function up(knex) {
    return Promise.all([
        knex.schema.alterTable('event', (table) => {
            table.text('image_url').alter();
        })
            .then(() => {
                console.log('Column image_url was updated to text type.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};

export function down(knex) {
    return Promise.all([
        knex.schema.alterTable('event', (table) => {
            table.string('image_url').alter();
        })
            .then(() => {
                console.log('Column image_url was updated to string type.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};
