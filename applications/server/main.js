import { ServerResponse, IncomingMessage, createServer } from 'node:http'

const report = {
  reportId: 0,
  reportDate: new Date().toISOString(),
  temperature: 17,
}

/**
 * @param {IncomingMessage} request 
 * @param {ServerResponse<IncomingMessage> & {
 *    req: IncomingMessage;
 * }} response 
 */
function getAllReports(request, response) {
  // Convert to network format
  const data = JSON.stringify(report)
  
  // Send the resulting package
  response.end(data)
}

function registerNewMeasurment(request, response) {
  response.end("Report registered\n")
}

/**
 * @param {IncomingMessage} request 
 */
function logger(request) {
  const structuredLog = {
    type: "info",
    path: request.url,
    method: request.method,
    timestamp: new Date().toISOString(),
  }

  console.log(structuredLog)
}

function setCors(response) {
  response.setHeader("Access-Control-Allow-Origin", '*')
}

// Create a new server
const server = createServer((request, response) => {
  // Middleware
  logger(request)

  // Routing logic
  const path = request.url
  const method = request.method

  if (
    path === "/reports" &&
    method === "GET"
  ) {
    setCors(response)
    getAllReports(request, response)
    
  } else if (
    path === "/measurements" &&
    method === "POST"
  ) {
    registerNewMeasurment(request, response)

  } else {
    response.writeHead(404)
    response.end("Resource not found\n")
  }
})

// Start serveren
server.listen(3000, "0.0.0.0", () => {
  console.log("Server listning on http://localhost:3000")
})

// Lytt etter avslutnings meldinger
process.addListener("SIGTERM", () => {
  process.exit()
})
process.addListener("SIGINT", () => {
  process.exit()
})
