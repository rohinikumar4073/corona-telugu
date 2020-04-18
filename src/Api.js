
let baseUrl = 'https://corona.lmao.ninja/v2';

export default {
  getWorldCoronaCases: `${baseUrl}/all`,
  getAllCountriesCoranaCases: `${baseUrl}/countries?sort=cases`,
  historicalData: `${baseUrl}/historical/`
}