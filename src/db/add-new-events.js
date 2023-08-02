import knex from '../../connection.js';

const checkAndAddNewEvents = async (events) => {

    try {

        const activeEvents = events.filter((event) => event.active);

        const newEvents = await Promise.all(activeEvents.map(async (event) => {
            const eventExists = await knex('event').where('provider_id', event.id).first();
            if (!eventExists) {
                return event;
            }
        }));

        const filteredEvents = newEvents.filter((event) => event);

        if (filteredEvents.length > 0) {

            const eventsToInsert = filteredEvents.map((event) => ({
                provider_id: event.id,
                slug: event.slug,
                title: event.title,
                description: event.description,
                provider_created_at: new Date(event.createdAt),
                image_url: event.image,
                start_date: event.startDate && new Date(event.startDate),
                end_date: event.endDate && new Date(event.endDate),
            }));

            await knex('event').insert(eventsToInsert);
        }

        return filteredEvents;
    }
    catch (err) {
        console.log(err);
    }
};

export default checkAndAddNewEvents;