import axios from 'axios';

const getLatestEvents = async () => {
    const query = `
        {
            events(order: "created_at DESC", limit: 100, where: "active=true") {
            id
            slug
            title
            description
            image
            createdAt
            startDate
            endDate
            category
            active
            }
        }
    `;

    const url = 'https://gamma-api.polymarket.com/query'

    const response = await axios.post(url, { query });

    return response.data.data.events;
};

export default getLatestEvents;