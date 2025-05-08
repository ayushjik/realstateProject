import axios from 'axios';

export default async function geocodeAllLocations(projects) {
  try {
    const requests = projects.map(async (loc) => {
      try {
        const resp = await axios.get('http://api.positionstack.com/v1/forward', {
          params: {
            access_key: process.env.POSITIONSTACK_API_KEY,
            query: loc.location,
            limit: 5
          }
        });
        console.log(resp.data?.data)
        const hits = resp.data?.data?.[0] || [];

        return {
          ...loc,
          latitude: hits.latitude  || 0,
          longitude: hits.longitude || 0
        };

      } catch (err) {
        console.error(`❌ Error geocoding "${loc.location}":`, err.message);
        return [{
          ...loc,
          latitude: 0,
          longitude: 0
        }];
      }
    });
    const nestedResults = await Promise.all(requests);

    const flatResults = nestedResults.flat();

    console.log('✅ All geocoded entries:', flatResults);
    return flatResults;

  } catch (err) {
    console.error('Unexpected error in geocoding:', err.message);
    return projects.map(loc => ({
      ...loc,
      latitude: 0,
      longitude: 0
    }));
  }
}
