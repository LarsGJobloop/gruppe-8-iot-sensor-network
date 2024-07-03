import { writeFile, readFile } from 'node:fs/promises'

// Configuration
export const reportsPath = "/app/data/reports.json"

// TODO Needs to be fixed
let reportId = 0

// Request Handler
/**
 * @param {IncomingMessage} request 
 * @param {ServerResponse<IncomingMessage> & {
*    req: IncomingMessage;
* }} response 
*/
export async function getAllReports(request, response) {
 // Convert to network format
 const data = await loadReports()
 
 // Send the resulting package
 response.end(data)
}

export function registerNewMeasurment(request, response) {
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
   response.end("Report registered\n")
 })
}

// IO (InputOutput) Function
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

async function loadReports() {
  const data = await readFile(reportsPath)
  return data
}