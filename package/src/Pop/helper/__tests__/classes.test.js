// @ts-check

import classes from "./../classes"

describe("classes", () => {
  it("returns null for empty array", () => {
    expect(classes([])).toBeNull()
  })

  it("returns null for array with empty string", () => {
    expect(classes([""])).toBeNull()
  })

  it("returns null for array with null", () => {
    expect(classes([null])).toBeNull()
  })
  it("returns null for array with undefined", () => {
    expect(classes([undefined])).toBeNull()
  })
  it("returns null for array with just empty strings", () => {
    expect(classes(["", "", ""])).toBeNull()
  })
  it("returns null for array with just nulls", () => {
    expect(classes([null, null, null])).toBeNull()
  })
  it("returns null for array with just undefined", () => {
    expect(classes([undefined, undefined, undefined])).toBeNull()
  })
  it("returns null for array with just undefined, empty strings or null", () => {
    expect(classes([undefined, "", null, undefined, "", null])).toBeNull()
  })

  it("returns removes null", () => {
    expect(classes([null, "hello"])).toEqual(["hello"])
  })

  it("returns removes undefined", () => {
    expect(classes([undefined, "hello"])).toEqual(["hello"])
  })

  it("returns removes empty string", () => {
    expect(classes(["", "hello"])).toEqual(["hello"])
  })

  it("removes undefined, empty strings and null from array", () => {
    expect(classes([undefined, "", null, "hello", undefined, "", null])).toEqual(["hello"])
  })
})
