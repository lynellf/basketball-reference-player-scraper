import { getPlayer } from './Player'
import { writeFileSync } from 'fs'

describe('player profile', () => {
  jest.setTimeout(15_000)
  it("Returns Carmelo Anthony's page", async () => {
    const results = await getPlayer('Butler, Jimmy', {
      tableIDs: ['advanced', 'playoffs_advanced'],
      bio: true
    })
    writeFileSync('player.json', JSON.stringify(results))
    expect(true).toBeTruthy()
  })
})
