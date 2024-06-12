import { createServer } from 'node:http'

// Create a new server
const server = createServer((request, response) => {
  response.end("Hello World\n")
})

// Start serveren
server.listen(3000, "localhost", () => {
  console.log("Server listning on http://localhost:3000")
})
