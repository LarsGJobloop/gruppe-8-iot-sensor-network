const serverAddress = "http://localhost:3000/measurements"

function logTemperature() {
  const report = {
    sensorId: 0,
    measurementDate: new Date().toISOString(),
    temperature: 15
  }

  console.log("Logging new report")
  console.log(report)
  
  fetch(serverAddress, {
    method: "POST",
    body: JSON.stringify(report)
  })
}

setInterval(logTemperature, 5 * 1000)

process.addListener("SIGTERM", () => {
  process.exit()
})
process.addListener("SIGINT", () => {
  process.exit()
})
