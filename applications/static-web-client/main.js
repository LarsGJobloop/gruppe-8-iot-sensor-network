// Hent data
const response = await fetch("http://localhost:3000/reports")
const data = await response.json()

// Log data til konsollen
console.log(response)
console.log(data)

// Bruk dataen til å oppdatere html (Dokumentet DOMet)
const element = document.getElementById("tempurature")
console.dir(element)
element.textContent = data.temperature
