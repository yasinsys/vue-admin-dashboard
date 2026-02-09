import * as XLSX from 'xlsx'

export function exportToExcel(users) {
  const data = users.map(u => ({
    ID: u.id,
    Name: u.name,
    Email: u.email,
    'Created At': new Date(u.createdAt).toLocaleString()
  }))

  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Users')

  XLSX.writeFile(workbook, 'users.xlsx')
}
