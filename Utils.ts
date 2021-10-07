type Dict = Record<string, string | number>
export const cellToKeyValPair = (output: Dict, cell: Element) => {
  const statHeader = cell.getAttribute('data-stat')
  const hasStatHeader = statHeader !== null

  if (!hasStatHeader) {
    throw new Error('The "data-stat" attribute does not exist in this table')
  }

  const statText = cell.textContent
  const statValue = Number(statText)
  const statTextIsANumber = !isNaN(statValue)

  if (!statTextIsANumber) {
    output[statHeader] = statText
  }

  if (statTextIsANumber) {
    output[statHeader] = statValue
  }

  return output
}

export const rowsToArray = (row: Element) => {
  const cells = [...row.children]
  const seasonStats = cells.reduce(cellToKeyValPair, {})

  return seasonStats
}

export const trimWhitespace = (str: string) => {
  const wsRemovalRegExp = /\s{2,}/g
  const trimmedStr = str.replace(wsRemovalRegExp, ' ')

  return trimmedStr
}

export function nameCheck(normalizedQuery: string) {
  function callback(playerItem: Element) {
    const playerName = playerItem.textContent
    const normalizedPlayerName = playerName.toLowerCase()
    const isMatch = normalizedPlayerName.includes(normalizedQuery)

    if (!isMatch) {
      return false
    }

    return true
  }

  return callback
}

export const getPlayerPageURL = (
  isActive: boolean,
  children: HTMLCollection
) => {
  if (!isActive) {
    return children[0].getAttribute('href')
  }

  return children[0].children[0].getAttribute('href')
}
