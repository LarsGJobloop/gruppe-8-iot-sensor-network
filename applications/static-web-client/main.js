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
  timestampElement.textContent = lastWeatherReport.reportDate

  // Legg til nye elementer i tablet vårt
  const tableElement = document.getElementById("table-weather-reports")
  // Fjern all underelemnter (children)
  tableElement.innerHTML = ""

  for (const report of weatherReports) {
    const newElement = createNewTableEntry(report)
    tableElement.append(newElement)
  }
}

getLatestReport()
setInterval(getLatestReport, 5 * 1000)


function createNewTableEntry(report) {
  const newRow = document.createElement("tr")

  const timeObject = new Date(report.reportDate)
  const formatedTime = `${timeObject.getHours()}:${timeObject.getMinutes()}:${timeObject.getSeconds()}`

  newRow.innerHTML = `
    <td>kl <span class="timestamp">${formatedTime}</span></td>
    <td><span class="temperature">${report.temperature}</span>°C</td>
  `

  return newRow
}