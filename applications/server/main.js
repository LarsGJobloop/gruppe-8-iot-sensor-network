import { ServerResponse, IncomingMessage, createServer } from 'node:http'
import { writeFile, readFile, mkdir, } from 'node:fs/promises'

let reportId = 0
const reportsPath = "./data/reports.json"

async function setupEnvironment() {
    // Create files and directories if they don't exists
    try {
      await readFile(reportsPath)
    } catch (error) {
      // File and/or directory does not exist create them
      try {
        await mkdir("./data")
      } catch (error) {
        console.log("Folder existed")
      }
  
      await writeFile(reportsPath, JSON.stringify([]))
    }
}

// IO (InputOutput) Function
const reports = []
async function appendReport(newReport) {
  // Read current stored data
  const currentReportsRaw = await readFile(reportsPath)
  const currentReports = JSON.parse(currentReportsRaw)

  // Create new data set
  const newReports = [...currentReports, newReport]
  const reportString = JSON.stringify(newReports)

  // Write to file
  await writeFile(reportsPath, reportString, { encoding: "utf-8" })
}

async function loadReports() {}

/**
 * @param {IncomingMessage} request 
 * @param {ServerResponse<IncomingMessage> & {
 *    req: IncomingMessage;
 * }} response 
 */
function getAllReports(request, response) {
  // Convert to network format
  const data = JSON.stringify(reports)
  
  // Send the resulting package
  response.end(data)
}

function registerNewMeasurment(request, response) {
  let data = ""

  request.on("data", (chunk) => {data = data + chunk})

  request.on("end", () => {
    const obj = JSON.parse(data)

    const newReport = {
      reportId: reportId++,
      reportDate: new Date().toISOString(),
      temperature: obj.temperature,
    }

    appendReport(newReport)
    reports.push(newReport)
    response.end("Report registered\n")
  })
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
await setupEnvironment()
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
