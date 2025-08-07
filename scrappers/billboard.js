import axios from "axios";
import * as cheerio from "cheerio";

const BILLBOARD_BASE_URL = 'https://www.billboard.com/charts';

export async function scrapeBillboardChart(chartName, date){
    const { data } = await axios.get(BILLBOARD_BASE_URL + '/' + chartName + '/' + date);
    const $ = cheerio.load(data);

    const chartItems = [];

    $('.chart-results-list .o-chart-results-list-row').each((i, el) => {
      const rank = $(el).find('.c-label.a-font-basic').first().text().trim();
      const title = $(el).find('h3.c-title').text().trim();
      const artist = $(el).find('span.c-label.a-no-trucate').text().trim();
      const cover = $(el).find('img').attr('src');

      if (title && artist) {
        chartItems.push({ rank, title, artist, cover});
      }
    });

    return chartItems
}