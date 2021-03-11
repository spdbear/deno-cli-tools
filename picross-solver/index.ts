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

type Field = -1 | 0 | 1

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
      .join('')
    console.log(rowStr)
  })
}

const fillDefinitiveLine = (lineField: Field[], lineInfo: number[]) => {
  const calcSum = (arr: number[]) => {
    return arr.reduce((acc: number, cur: number) => acc + cur, 0) + arr.length - 1
  }
  let pos = 0
  if (calcSum(lineInfo) === lineField.length) {
    lineInfo.forEach((pxNum) => {
      lineField = lineField.fill(1, pos, pxNum + pos)
      pos += pxNum + 1
    })
  }
  return lineField
}

const fillStage = (
  lineFields: Field[][],
  rowInfo: number[][],
  colInfo: number[][]
) => {
  const rowFilledFields = lineFields.map((lineField, index) =>
    fillDefinitiveLine(lineField, rowInfo[index])
  )
  const transpose = (arr: Field[][]) =>
    arr[0].map((_, c) => arr.map((a: Field[]) => a[c]))
  const transposedFields = transpose(rowFilledFields)
  return transpose(
    transposedFields.map((lineField, index) =>
      fillDefinitiveLine(lineField, colInfo[index])
    )
  )
}

const dt = await loadData()
console.log(dt.w, dt.h)
showArray(fillStage(dt.field, dt.w, dt.h))
