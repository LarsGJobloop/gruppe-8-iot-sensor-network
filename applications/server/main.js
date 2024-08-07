import { createServer } from 'node:http'
import { writeFile, readFile, mkdir, } from 'node:fs/promises'
import { getAllReports, registerNewMeasurment, reportsPath } from './handlers/reportsHandler.js'
import { logger } from './middlewares/logger.js'
import { setCors } from './middlewares/setCors.js'

// Lifecycle Initialization
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

// Main Program Loop
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

// Lifecycle definition
await setupEnvironment()

// Lifecycle start the server
server.listen(3000, "0.0.0.0", () => {
  console.log("Server listning on http://localhost:3000")
})

// Lifecycle shutdown
process.addListener("SIGTERM", () => {
  process.exit()
})
process.addListener("SIGINT", () => {
  process.exit()
})
