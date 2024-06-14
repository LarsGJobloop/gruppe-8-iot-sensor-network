import { createServer } from 'node:http'

function getAllReports(request, response) {
  response.end("Here are all the reports\n")  
}

function registerNewMeasurment(request, response) {
  response.end("Report registered\n")
}

function logger(request) {
  const structuredLog = {
    type: "info",
    path: request.url,
    timestamp: new Date().toISOString(),
  }

  console.log(structuredLog)
}

// Create a new server
const server = createServer((request, response) => {
  // Middleware
  logger(request)

  // Routing logic
  const path = request.url

  switch (path) {
    case "/reports":
      getAllReports(request, response)
      break
    case "/measurements":
      registerNewMeasurment(request, response)
      break
    default:
      response.end("Resource not found\n")
      break
  }
})

// Start serveren
server.listen(3000, "localhost", () => {
  console.log("Server listning on http://localhost:3000")
})
