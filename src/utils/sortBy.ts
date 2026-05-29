export const sortBy = <T>(items: T[], key: keyof T) => {
  // toSorted returns a new array
  return items.toSorted((a, b) => {
    if (a[key] < b[key]) return 1
    if (a[key] > b[key]) return -1
    return 0
  })
}
