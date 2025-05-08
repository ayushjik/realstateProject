import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function scrapeProjects(city) {
    try {
        const url = `https://www.magicbricks.com/new-projects-${city}`;
        console.log('scrapeurl',url)
        const { data } = await axios.get(url, {
            headers: {
              'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
              'Accept-Language': 'en-US,en;q=0.9',
            },});
        const $ = cheerio.load(data);
        const projects = [];

        $('.projdis__prjcard__leftcont').each((i, el) => {
            const name = $(el).find('.mghome__prjblk__prjname').text().trim();
            const location = $(el).find('.mghome__prjblk__locname').text().trim();
            const price = $(el).find('.mghome__prjblk__price').text().trim();
            const builder = $(el).find('.mghome__prjblk__bhk').text().trim();

            if (name && location) {
            projects.push({ name, location, price, builder });
            }
        });

    //   console.log('scrape', projects)

        return projects.slice(0, 5);
    }catch(error){
        console.error('Scrape error:', error.message);
        return [];
    }
}
