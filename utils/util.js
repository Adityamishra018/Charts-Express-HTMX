import moment from 'moment';
import gis from 'async-g-i-s';

const options = {
  searchTerm: '',
  filterOutDomains: [
    'pinterest.com',
    'deviantart.com'
  ]
}

export function getGivenOrLastSaturdayToISO(dateString) {
  const givenDate = new Date(dateString);
  const startOfWeek = new Date();

  startOfWeek.setDate(startOfWeek.getDate() - (startOfWeek.getDay() + 1));
  if (givenDate > startOfWeek) return startOfWeek.toISOString().split('T')[0];

  return givenDate.toISOString().split('T')[0];
}

export function getPreviousThursdayToStamp(date) {
  const momentDate = moment(date);
  momentDate.day(4);

  if (momentDate.isAfter(moment(date), 'day')) {
    momentDate.subtract(1, 'week');
  } else if (momentDate.isSame(moment(date), 'day') && momentDate.day() !== 4) {
    momentDate.subtract(1, 'week');
  }
  return momentDate.toISOString().split('T')[0].replace(/-/g, '');
}

export async function PopulateCovers(list) {
  let searchTerm = '';
  let resp;

  for (let index = 0; index < list.length; ++index) {

    searchTerm = list[index].title + " " + list[index].artist;
    if (list[index].title === '')
      searchTerm += " artist image -site:instagram.com -site:threads.net -site:facebook.com"
    else
      searchTerm += " cover art -site:instagram.com -site:threads.net -site:facebook.com"

    resp = await gis(searchTerm)
  }
}
