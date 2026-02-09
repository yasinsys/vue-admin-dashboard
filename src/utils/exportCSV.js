export function exportToCSV(users) {
  const headers = ['ID', 'Name', 'Email', 'Created At']

  const rows = users.map(u => [
    u.id,
    u.name,
    u.email,
    new Date(u.createdAt).toLocaleString()
  ])

  const csvContent =
    [headers, ...rows]
      .map(row => row.map(v => `"${v}"`).join(','))
      .join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')

  link.href = URL.createObjectURL(blob)
  link.download = 'users.csv'
  link.click()
}
