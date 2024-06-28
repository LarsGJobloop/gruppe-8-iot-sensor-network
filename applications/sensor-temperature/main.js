const serverAddress = "http://localhost:3000/measurements"

function getRandomNumber(min, max) {
  const range = max - min
  return ((Math.random() * range) + min)
}

async function logTemperature() {
  const report = {
    sensorId: 0,
    measurementDate: new Date().toISOString(),
    temperature: getRandomNumber(15, 25).toFixed(2),
  }

  console.log("Logging new report")
  console.log(report)
  
  try {
    await fetch(serverAddress, {
      method: "POST",
      body: JSON.stringify(report)
    })
  } catch (error) {
    console.log("Failed to post report to server")
  }
}

setInterval(logTemperature, 5 * 1000)

process.addListener("SIGTERM", () => {
  process.exit()
})
process.addListener("SIGINT", () => {
  process.exit()
})
