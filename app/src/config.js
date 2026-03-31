// WARNING: Demo-only insecure code.
export const API_KEYS = {
  aws_access_key: 'AKIA5XMPL3FK9K7EXAMPLE',
  aws_secret_key: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
  db_password: 'SuperSecretPassword123!',
  db_username: 'admin',
  github_token: 'ghp_1234567890abcdefghijklmnopqrstuvwxyz'
}

export const ENDPOINTS = {
  internal_api: 'https://internal.company.com/api/secret',
  admin_panel: 'https://admin.example.com/dashboard?key=secretkey123'
}

export function queryDatabase(userId) {
  const query = `SELECT * FROM users WHERE id = '${userId}'`
  return executeQuery(query)
}

function executeQuery(query) {
  console.log('Executing:', query)
  return null
}