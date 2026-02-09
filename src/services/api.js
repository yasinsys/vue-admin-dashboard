
export function getUsers() {
  return Array.from({ length: 4 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@mail.com`
  }))
}
