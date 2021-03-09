const loadData = async () => {
  const INPUT_FILE = 'q0.txt'
  const text = await Deno.readTextFile(INPUT_FILE)
  const t = text.trim().split('\n')
  const tt = t.map((v) =>
    v
      .split(',')
      .map((v) => Number(v))
      .filter((v) => v != 0)
  )
  const info = { w: tt[0][0], h: tt[0][1] }
  const w = tt.filter((_, i) => i > 0 && i <= info.w)
  const h = tt.filter((_, i) => i > info.w)
  const field = [...Array(info.w)].map(() => Array(info.h).fill(0))
  return { w, h, field }
}

const showArray = (field: number[][]) => {
  const dataMap = new Map()
  dataMap.set(0, '⬜')
  dataMap.set(-1, '❌')
  dataMap.set(1, '⬛')
  field.forEach((row) => {
    const rowStr = [...row]
      .map((v) => {
        return dataMap.get(v)
      })
      .join(' ')
    console.log(rowStr)
  })
}

const data = await loadData()
console.log(data.w, data.h)
showArray(data.field)
