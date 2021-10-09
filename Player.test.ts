import { getPlayerBio } from './Player'
import { getWindow } from './Puppet'
import { getFile } from './Utils'
import { isEqual } from 'lodash'

describe('player profile', () => {
  test("Syracuse is Carmelo Anthony's college", () => {
    const html = getFile('./carmelo-anthony.html')
    const { document } = getWindow(html)
    const {
      education: { college }
    } = getPlayerBio(document)
    const collegeMatch = isEqual(college, ['Syracuse'])
    expect(collegeMatch).toBeTruthy()
  })

  test("Townson Cathloic and Oak Hill Academy are Carmelo Anthony's high scools", () => {
    const html = getFile('./carmelo-anthony.html')
    const { document } = getWindow(html)
    const {
      education: { highSchool }
    } = getPlayerBio(document)

    const hsMatch = isEqual(highSchool, [
      'Towson Catholic in Towson, Maryland',
      'Oak Hill Academy in Mouth of Wilson, Virginia'
    ])
    expect(hsMatch).toBeTruthy()
  })

  test("Emsly A. Laney is Michael Jordan's High School", () => {
    const html = getFile('./michael-jordan.html')
    const { document } = getWindow(html)
    const {
      education: { highSchool }
    } = getPlayerBio(document)

    const hsMatch = isEqual(highSchool, [
      'Emsley A. Laney in Wilmington, North Carolina'
    ])
    expect(hsMatch).toBeTruthy()
  })

  test("UNC is Michael Jordan's College", () => {
    const html = getFile('./michael-jordan.html')
    const { document } = getWindow(html)
    const {
      education: { college }
    } = getPlayerBio(document)

    const hsMatch = isEqual(college, ['UNC'])
    expect(hsMatch).toBeTruthy()
  })

  test('Luka Doncic has no college on record', () => {
    const html = getFile('./luka-doncic.html')
    const { document } = getWindow(html)
    const {
      education: { college }
    } = getPlayerBio(document)

    const hsMatch = isEqual(college, null)
    expect(hsMatch).toBeTruthy()
  })

  test('Luka Doncic has no high school on record', () => {
    const html = getFile('./luka-doncic.html')
    const { document } = getWindow(html)
    const {
      education: { highSchool }
    } = getPlayerBio(document)

    const hsMatch = isEqual(highSchool, null)
    expect(hsMatch).toBeTruthy()
  })

  test('Lebron James has no college on record', () => {
    const html = getFile('./lebron-james.html')
    const { document } = getWindow(html)
    const {
      education: { college }
    } = getPlayerBio(document)

    const hsMatch = isEqual(college, null)
    expect(hsMatch).toBeTruthy()
  })

  test("Saint Vincent-Saint Mary is Lebron James's high school", () => {
    const html = getFile('./lebron-james.html')
    const { document } = getWindow(html)
    const {
      education: { highSchool }
    } = getPlayerBio(document)

    const hsMatch = isEqual(highSchool, [
      'Saint Vincent-Saint Mary in Akron, Ohio'
    ])
    expect(hsMatch).toBeTruthy()
  })
})
