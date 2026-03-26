// WARNING: This file contains intentionally exposed secrets for demo purposes only!
// This is used to demonstrate security scanning with CodeQL and GitHub Actions.

export const API_KEYS = {
  // Hard-coded API key - SECURITY ISSUE: exposed sensitive credential
  aws_access_key: 'AKIA5XMPL3FK9K7EXAMPLE',
  aws_secret_key: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
  
  // Hard-coded database credentials - SECURITY ISSUE: exposed credentials
  db_password: 'SuperSecretPassword123!',
  db_username: 'admin',
  
  // Hard-coded API token - SECURITY ISSUE: exposed token
  github_token: 'ghp_1234567890abcdefghijklmnopqrstuvwxyz'
}

export const ENDPOINTS = {
  // Hard-coded internal endpoint - SECURITY ISSUE: sensitive URL exposure
  internal_api: 'https://internal.company.com/api/secret',
  admin_panel: 'https://admin.example.com/dashboard?key=secretkey123'
}

// Function with SQL injection vulnerability - SECURITY ISSUE: string concatenation
export function queryDatabase(userId) {
  const query = `SELECT * FROM users WHERE id = '${userId}'`
  return executeQuery(query)
}

function executeQuery(query) {
  console.log('Executing:', query)
  return null
}
