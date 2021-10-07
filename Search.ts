import { getDocument } from './Puppet'
import { nameCheck, getPlayerPageURL } from './Utils'

const BASE_URL = 'https://www.basketball-reference.com/'
const PLAYER_LIST_SELECTOR = 'th[data-stat="player"]'

export const getPlayerDocument = async (matchedPlayer: Element) => {
  const { children } = matchedPlayer
  const firstTag = children[0]
  const tagName = firstTag.tagName.toLowerCase()
  const isActive = tagName === 'strong'
  const endpoint = getPlayerPageURL(isActive, children)
  const playerURL = `${BASE_URL}${endpoint}`
  const playerPage = await getDocument(playerURL)
  return playerPage
}

export const findPlayer = async (query: string) => {
  const hasQuery = query.length > 0

  if (!hasQuery) {
    throw new Error('Please provide a player name. (Last Name, First Name)')
  }

  const parsedQuery = query.split(',')
  const surname = parsedQuery[0]
  const fullName = parsedQuery.reverse().join(' ')
  const normalizedName = fullName.toLowerCase().trim()
  const firstChar = surname[0].toLowerCase()
  const searchQuery = `${BASE_URL}/players/${firstChar}`
  const document = await getDocument(searchQuery)
  const playerList = document.querySelectorAll(PLAYER_LIST_SELECTOR)
  const playerArray = [...playerList]
  const matchedPlayer = playerArray.find(nameCheck(normalizedName))
  const hasMatch = matchedPlayer !== undefined

  if (!hasMatch) {
    throw new Error('No Player Found')
  }
  const playerPage = await getPlayerDocument(matchedPlayer)
  return playerPage
}
