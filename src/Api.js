
let baseUrl = 'https://disease.sh/v2';

export default {
  getWorldCoronaCases: `${baseUrl}/all`,
  getAllCountriesCoranaCases: `${baseUrl}/countries?sort=cases`,
  historicalData: `${baseUrl}/historical/`,
  getInidanStateCases: `${baseUrl}/gov/india`
}