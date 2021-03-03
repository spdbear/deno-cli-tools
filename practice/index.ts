const index = 1
const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
const json = res.json()
const data = await json
console.log(`No.${index}: ${data.name}`)
