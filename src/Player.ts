import { getDocument } from './Puppet'
import { rowsToArray, trimWhitespace } from './Utils'
import { findPlayer } from './Search'

const BASE_URL = 'https://www.basketball-reference.com/'
const CONTRACT_SELECTOR = 'table[id^="contracts_"]'
const BIO_SELECTOR = 'div[itemtype="https://schema.org/Person"]'
const PLAYER_NAME_SELECTOR = 'h1[itemprop="name"]'
const LEADERBOARD_SELECTOR = 'div_leaderboard'
const VALID_TABLE_IDS = [
  'advanced',
  'all_college_stats',
  'all_salaries',
  'all_star',
  'pbp',
  'per_game',
  'per_minute',
  'per_poss',
  'playoffs_advanced',
  'playoffs_pbp',
  'playoffs_per_game',
  'playoffs_per_minute',
  'playoffs_per_poss',
  'playoffs_shooting',
  'playoffs_totals',
  'shooting',
  'sim_career',
  'sim_thru',
  'totals',
  'year-and-career-highs-po',
  'year-and-career-highs'
]

export const getPlayerHonors = (document: Document) => {
  const leaderboard = document.getElementById(LEADERBOARD_SELECTOR)
  if (leaderboard) {
    const sections = Array.from(leaderboard.children)
    const tables = sections.map((section) => section.children[0])
    const honors = tables.map((table) => {
      const children = Array.from(table.children)
      const label = children![0].textContent!.trim()
      const results = Array.from(children[1].children).map((row) => {
        const nodes = row.children[0].childNodes
        const honor = nodes![0].textContent!.trim()
        const rank = nodes[nodes.length - 1]?.textContent?.trim() ?? -1
        return { honor, rank }
      })
      return { label, results }
    })
    return honors
  }

  return []
}

export const getPlayerPage = async (query: string) => {
  return await getDocument(`${BASE_URL}/players/${query}`)
}

export const getPlayerStats = (document: Document, tableID: string) => {
  const table = document.querySelector(`#${tableID}`)
  const hasTable = table !== null

  if (!hasTable) {
    return null
  }

  const tableChildren = Array.from(table.children)
  const tableBody = tableChildren.find((node) => node.tagName === 'TBODY')
  const hasTableBody = tableBody !== undefined

  if (!hasTableBody) {
    throw new Error('Table does not have a table body element')
  }

  const tableRows = Array.from(tableBody.children)
  const stats = tableRows.map(rowsToArray)

  return stats
}

export const getPlayerContract = (document: Document) => {
  const contractTable = document.querySelector(CONTRACT_SELECTOR)
  const hasContractTable = contractTable !== null

  if (!hasContractTable) {
    return null
  }

  const tableChildren = Array.from(contractTable.children)
  const tableBody = tableChildren.find((element) => element.tagName === 'TBODY')
  const tableHead = tableChildren.find((element) => element.tagName === 'THEAD')
  const hasTableBody = tableBody !== undefined
  const hasTableHead = tableHead !== undefined
  const hasTableContents = hasTableBody && hasTableHead

  if (!hasTableContents) {
    throw new Error('Table Body does not exist for player contract')
  }

  const headerRow = tableHead.children[0]
  const headerCells = Array.from(headerRow.children)
  const contractKeys = headerCells.map(
    (cell, index) => cell.textContent ?? `unknownCell_${index + 1}`
  )
  const bodyRow = tableBody.children[0]
  const bodyRowCells = Array.from(bodyRow.children)
  const results = bodyRowCells.reduce((output, cell, index) => {
    const key = contractKeys[index]
    output[key] = cell.textContent

    return output
  }, {} as Record<string, unknown>)

  return results
}

export const getPlayerAccolades = (document: Document) => {
  const accoladesList = document.querySelector('#bling')
  const accoladesItems = Array.from(accoladesList?.children ?? [])
  const accolades = accoladesItems.map((item) => item.textContent)

  return accolades
}

export const getPlayerAge = (str: string) => {
  const ageRegExp = /([0-9]+-[0-9]+d)/g
  const age = str.match(ageRegExp)?.[0] ?? ''
  return age
}

export const getPlayerName = (document: Document) => {
  return document.querySelector(PLAYER_NAME_SELECTOR)?.textContent ?? ''
}

export const getPlayerBirthplace = (str: string) => {
  const endAtRelativesExp = /(?=Born:)(.*)(?=Relatives:)/
  const endAtCollegeExp = /(?=Born:)(.*)(?=College:)/
  const endAtHSExp = /(?=Born:)(.*)(?=High School:)/
  const endAtDraft = /(?=Born:)(.*)(?=College:)/
  const potentialMatchA = str.match(endAtRelativesExp)
  const potentialMatchB = str.match(endAtCollegeExp)
  const potentialMatchC = str.match(endAtHSExp)
  const potentialMatchD = str.match(endAtDraft)
  const matchResults =
    potentialMatchA || potentialMatchB || potentialMatchC || potentialMatchD
  const hasMatch = matchResults !== null

  if (!hasMatch) {
    return ''
  }

  const birthLocation = matchResults[0].split('in')[1]
  const trimmedOutput = birthLocation.trim()

  return trimmedOutput
}

export const getPlayerHighSchool = (str: string) => {
  const regExps = [
    /(?=High School:)(.*)(?=Recruiting Rank)/,
    /(?=High School:)(.*)(?=Draft:)/,
    /(?=High Schools:)(.*)(?=Recruiting Rank:)/,
    /(?=High Schools:)(.*)(?=Draft:)/
  ]

  const matchedString =
    regExps
      .map((regExp) => str.match(regExp))
      .find((match) => match !== null) ?? []
  const hasMatch = matchedString.length > 0

  if (!hasMatch) {
    return null
  }

  const matches = matchedString[0]
  const strsToSplitby = ['High School: ', 'High Schools: ']
  const highSchool = strsToSplitby.map((str) => matches.split(str)[1])
  const results = highSchool?.[1]
    ?.split(',')
    ?.reduce((output, str, index, input) => {
      const isOdd = index % 2 === 1
      const prevVal = input[index - 1]
      const canJoin = isOdd
      if (canJoin) {
        output[index - 1] = `${prevVal},${str}`.trim()
        return output
      }

      return output
    }, [] as string[])
    .filter((val) => val) ?? [highSchool[0].trim()]
  return results
}

// why? some players have a slightly different description
// thus, we need a slightly different regular expression
export const altGetPlayerCollege = (str: string) => {
  const collegeRegExp = /(?=College:)(.*)(?=High Schools:)/
  const matchedString = str.match(collegeRegExp)
  const hasMatch = matchedString !== null

  if (!hasMatch) {
    return null
  }

  const matches = matchedString[0]
  const college = matches.split('College: ')[1]

  return [college.trim()]
}

export const getPlayerCollege = (str: string) => {
  const collegeRegExp = /(?=College:)(.*)(?=High School:)/
  const matchedString = str.match(collegeRegExp)
  const hasMatch = matchedString !== null

  if (!hasMatch) {
    return null
  }

  const matches = matchedString[0]
  const college = matches.split('College: ')[1]

  return [college.trim()]
}

export const getPlayerPosition = (str: string) => {
  const positionRegExp = /(?=Position:).*(?=▪)/
  const matchedStr = str.match(positionRegExp)
  const hasMatch = matchedStr !== null

  if (!hasMatch) {
    return null
  }

  const parsedPositionA = matchedStr[0].split('Position: ')[1]
  const positions = parsedPositionA.split(' and ')
  const trimmedPositions = positions.map((position) => position.trim())

  return trimmedPositions
}

export const getPlayerAttributes = (str: string) => {
  const attrRegExp = /(?=Shoots).*(?=\) [BT])/
  const heightRegExp = /\d*(?=cm)/
  const weightRegExp = /\d*(?=kg)/
  const handRegExp = /(?=Shoots: ).*(?=[0-9]-)/
  const matchedStr = str.match(attrRegExp)
  const hasMatch = matchedStr !== null

  if (!hasMatch) {
    return null
  }

  const parsedAttributes = matchedStr[0]
  const weight = parsedAttributes!.match(weightRegExp)![0]
  const height = parsedAttributes!.match(heightRegExp)![0]
  const handStr = parsedAttributes!.match(handRegExp)![0]
  const hand = handStr.split('Shoots: ')[1].trim()

  return { hand, height, weight }
}

export const getPlayerNicknames = (str: string) => {
  const nicknameRegExp = /\(((?!born)(?!Age:)(?![0-9])(?!Full)[^)]+)\)/
  const noParensRegExp = /([^(^)])/g
  const nicknameStr = str.match(nicknameRegExp)
  const hasNickname = nicknameStr !== null
  const parsedNickname = hasNickname
    ? nicknameStr[0]!.match(noParensRegExp)!.join('')
    : ''
  const nicknameArr = hasNickname ? parsedNickname.split(',') : []

  return nicknameArr
}

export const getPlayerDraft = (str: string) => {
  const draftRegExp = /(?=Draft:)(.*)(?=NBA Debut:)/
  const draftPosRegExp = /(?=\().*(?=pick)/
  const draftStr = str.match(draftRegExp)
  const wasDrafted = draftStr !== null

  if (!wasDrafted) {
    return null
  }

  const splitStr = wasDrafted ? draftStr[0].split(',') : []
  const draftClass = splitStr[3].trim()
  const draftYear = parseInt(draftClass, 0)
  const draftTeam = splitStr[0].split('Draft: ')[1].trim()
  const draftRound = parseInt(splitStr[1].trim(), 0)
  const draftPos =
    splitStr.length > 0
      ? parseInt(splitStr[1]!.match(draftPosRegExp)![0][1].trim(), 0)
      : ''

  return {
    team: draftTeam,
    year: draftYear,
    position: { round: draftRound, position: draftPos }
  }
}

export const getPlayerBirthdate = (str: string) => {
  const dateRegExp = /([A-Z][a-z]+ +[0-9]+, +[0-9]+)/
  const dateOfBirth = str.match(dateRegExp)?.[0] ?? ''

  return dateOfBirth
}

export const getPlayerBio = (document: Document) => {
  const bioElement = document.querySelector(BIO_SELECTOR)
  const bioString = bioElement?.textContent ?? ''
  const trimmedBioString = trimWhitespace(bioString)
  const accolades = getPlayerAccolades(document)
  const age = getPlayerAge(trimmedBioString)
  const name = getPlayerName(document)
  const birthplace = getPlayerBirthplace(trimmedBioString)
  const highSchool = getPlayerHighSchool(trimmedBioString)
  const college =
    getPlayerCollege(trimmedBioString) || altGetPlayerCollege(trimmedBioString)
  const position = getPlayerPosition(trimmedBioString)
  const attributes = getPlayerAttributes(trimmedBioString)
  const nicknames = getPlayerNicknames(bioString)
  const draft = getPlayerDraft(trimmedBioString)
  const dob = getPlayerBirthdate(trimmedBioString)
  const education = { college, highSchool }
  return {
    accolades,
    attributes,
    age,
    birthplace,
    draft,
    education,
    name,
    nicknames,
    position,
    dob
  }
}

export const playerStatTableToObject = (tableIDs: string[]) => {
  const ids = tableIDs.reduce((output, id) => {
    const matchedID = VALID_TABLE_IDS.find((validID) => validID === id)
    const hasMatch = matchedID !== undefined
    if (!hasMatch) {
      return output
    }
    return [...output, id]
  }, [] as string[])
  return ids
}

type Options = {
  tableIDs?: string[]
  bio?: boolean
  contract?: boolean
  honors?: boolean
}

export const getPlayer = async (
  query: string,
  options: Options = {
    tableIDs: ['per_game'],
    bio: true,
    contract: false,
    honors: true
  }
) => {
  const document = await findPlayer(query)

  const baseOutput = {
    bio: options.bio ? getPlayerBio(document) : null,
    contract: options.contract ? getPlayerContract(document) : null,
    honors: getPlayerHonors(document)
  } as Record<string, unknown>

  const results = (options?.tableIDs ?? []).reduce((output, category) => {
    output[category] = getPlayerStats(document, category)
    return output
  }, baseOutput)

  return results
}
