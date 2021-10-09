import { getPlayerBio, getPlayerHonors } from '../src/Player'
import { getWindow } from '../src/Puppet'
import { getFile } from '../src/Utils'
import { isEqual } from 'lodash'

describe('player profile', () => {
  test("Carmelo Anthony's Education", () => {
    const html = getFile('./__test__/carmelo-anthony.html')
    const { document } = getWindow(html)
    const {
      education: { college, highSchool }
    } = getPlayerBio(document)
    const collegeMatch = isEqual(college, ['Syracuse'])
    const hsMatch = isEqual(highSchool, [
      'Towson Catholic in Towson, Maryland',
      'Oak Hill Academy in Mouth of Wilson, Virginia'
    ])
    expect(hsMatch).toBeTruthy()
    expect(collegeMatch).toBeTruthy()
  })

  test("Michael Jordan's education", () => {
    const html = getFile('./__test__/michael-jordan.html')
    const { document } = getWindow(html)
    const {
      education: { highSchool, college }
    } = getPlayerBio(document)

    const hsMatch = isEqual(highSchool, [
      'Emsley A. Laney in Wilmington, North Carolina'
    ])
    const collegeMatch = isEqual(college, ['UNC'])
    expect(hsMatch).toBeTruthy()
    expect(collegeMatch).toBeTruthy()
  })

  test("Luka Doncic's education", () => {
    const html = getFile('./__test__/luka-doncic.html')
    const { document } = getWindow(html)
    const {
      education: { highSchool, college }
    } = getPlayerBio(document)

    const hsMatch = isEqual(highSchool, null)
    const collegeMatch = isEqual(college, null)
    expect(hsMatch).toBeTruthy()
    expect(collegeMatch).toBeTruthy()
  })

  test("Lebron James' education", () => {
    const html = getFile('./__test__/lebron-james.html')
    const { document } = getWindow(html)
    const {
      education: { college, highSchool }
    } = getPlayerBio(document)

    const collegeMatch = isEqual(college, null)
    const hsMatch = isEqual(highSchool, [
      'Saint Vincent-Saint Mary in Akron, Ohio'
    ])
    expect(hsMatch).toBeTruthy()
    expect(collegeMatch).toBeTruthy()
  })

  test("Carmelo Anthony's honors", () => {
    const html = getFile('./__test__/carmelo-anthony.html')
    const { document } = getWindow(html)
    const honors = getPlayerHonors(document)
    const hasFourtyHonors = honors.length === 40
    expect(hasFourtyHonors).toBeTruthy()
  })
})
