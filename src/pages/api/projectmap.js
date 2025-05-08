import geocodeLocation from '@/lib/geocode';
import scrapeProjects from '@/lib/scrape';

export default async function handler(req, res) {
  const city = req.query.city;
  console.log(city, req.query)
  if (!city) return res.status(400).json({ error: 'City is required' });

  try {
    const scrapedProject = await scrapeProjects(city)
    console.log('scrapedProject',scrapedProject)
    if (scrapedProject.length === 0) {
        return res.status(404).json({ error: 'No projects found' });
      }
    const geoLogicalCoords = await Promise.all(
        scrapedProject.map(async (p) => {
          const coords = await geocodeLocation(p.location);
          return {
            ...p,...coords
          };
        })
      );
  

    console.log('geoLogicalCoords', geoLogicalCoords)


    // const url = `https://www.magicbricks.com/new-projects-${city}`;
    // const html = await axios.get(url).then(r => r.data);
    // const $ = cheerio.load(html);
    // const projects = [];

    // $('.m-srp-card').each((i, el) => {
    //   const name = $(el).find('.project-title').text().trim();
    //   const location = $(el).find('.locality').text().trim();
    //   const price = $(el).find('.price').text().trim();
    //   const builder = $(el).find('.builder-name').text().trim();
    //   if (name && location) {
    //     projects.push({ name, location, price, builder });
    //   }
    // });

    // const geoResults = await Promise.all(projects.slice(0, 10).map(async p => {
    //   const geo = await axios.get('http://api.positionstack.com/v1/forward', {
    //     params: {
    //       access_key: process.env.POSITIONSTACK_API_KEY,
    //       query: `${p.location}, ${city}`,
    //       limit: 1,
    //     }
    //   }).then(res => res.data.data[0]);
    //   return { ...p, latitude: geo?.latitude || 0, longitude: geo?.longitude || 0 };
    // }));

    res.status(200).json(geoLogicalCoords);
  } catch (err) {
    res.status(500).json({ error: 'Scraping failed' });
  }
}
