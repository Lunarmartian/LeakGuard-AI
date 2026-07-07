export const CATEGORIES = [
  { value: 'all', label: 'All Findings', icon: '🔍' },
  { value: 'email', label: 'Email Address', icon: '📧' },
  { value: 'phone', label: 'Phone Number', icon: '📞' },
  { value: 'aws', label: 'AWS Access Key', icon: '🔑' },
  { value: 'aws-secret', label: 'AWS Secret Key', icon: '🗝️' },
  { value: 'github-token', label: 'GitHub Token', icon: '🐙' },
  { value: 'azure-id', label: 'Azure Identifier', icon: '☁️' },
  { value: 'azure-secret', label: 'Azure Secret', icon: '🔒' },
  { value: 'credit-card', label: 'Credit Card Number', icon: '💳' },
  { value: 'bank-account', label: 'Bank Account Number', icon: '🏦' },
  { value: 'ip-address', label: 'IP Address', icon: '🌐' },
  { value: 'domain', label: 'Domain Name', icon: '🌍' },
  { value: 'url', label: 'URL / Website', icon: '🔗' },
  { value: 'password', label: 'Password', icon: '🔐' },
  { value: 'api-key', label: 'API Key', icon: '🗝️' },
  { value: 'jwt', label: 'JWT Token', icon: '🎫' },
  { value: 'private-key', label: 'Private Key', icon: '🔏' },
  { value: 'ssh-key', label: 'SSH Key', icon: '🖥️' },
  { value: 'database-string', label: 'Database Connection String', icon: '🗄️' },
  { value: 'mongodb', label: 'MongoDB Connection', icon: '🍃' },
  { value: 'postgresql', label: 'PostgreSQL Connection', icon: '🐘' },
  { value: 'mysql', label: 'MySQL Connection', icon: '🐬' },
  { value: 'docker-secret', label: 'Docker Secret', icon: '🐳' },
  { value: 'kubernetes-secret', label: 'Kubernetes Secret', icon: '☸️' },
  { value: 'linkedin', label: 'LinkedIn Profile', icon: '💼' },
  { value: 'username', label: 'Username', icon: '👤' },
  { value: 'filename', label: 'File Name', icon: '📄' },
]

export function labelForCategory(value) {
  return CATEGORIES.find((category) => category.value === value)?.label
}

export function iconForType(type) {
  return CATEGORIES.find((category) => category.label === type)?.icon || '🔎'
}
