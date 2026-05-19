export const toCustomDateFormat = (matchDate: number): string => {
  return new Date(matchDate)
    .toLocaleString('de', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
    .replace(',', '')
}