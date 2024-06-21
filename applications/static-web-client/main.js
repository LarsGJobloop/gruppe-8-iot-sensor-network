// JSDoc can be used to document the various types
// to help you when developing
// https://jsdoc.app/tags-typedef

/**
 * The shape of a weather report from the Web API
 * 
 * @typedef {{
 * sensorId: number,
 * measurementDate: string,
 * temperature: number
 * }} WeatherReport
 */

async function getLatestReport() {
  // Hent data
  const response = await fetch("http://localhost:3000/reports")

  /**
   * @type {Array<WeatherReport>}
   */
  const weatherReports = await response.json()
  const lastWeatherReport = weatherReports[weatherReports.length - 1]
  
  // Bruk dataen til å oppdatere html (Dokumentet DOMet)
  const temperatureElement = document.getElementById("temperature")
  temperatureElement.textContent = lastWeatherReport.temperature
  
  const timestampElement = document.getElementById("time")
  timestampElement.textContent = lastWeatherReport.measurementDate
}

getLatestReport()
setInterval(getLatestReport, 5 * 1000)
