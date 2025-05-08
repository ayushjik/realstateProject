import axios from 'axios';

export default async function geocodeLocation(location) {
    console.log('geoLocation', location)
    try{
        const resp = await axios.get('http://api.positionstack.com/v1/forward', {
            params: {
              access_key: process.env.POSITIONSTACK_API_KEY,
              query: location,
              limit:1
            }
          });
          console.log('resp',resp.data?.data)
          const data = resp.data?.data?.[0] || {};
          console.log('geologicaldata',data?.latitude, data?.longitude)
          return {
            latitude: data?.latitude || 0,
            longitude: data?.longitude || 0
          }
    }catch(error) {
        console.error('Geocode error for location:', location, error.message);
        return { latitude: 0, longitude: 0 };
      }
  
}
