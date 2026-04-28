const API_BASE_URL = 'http://localhost:8000/api'

export async function apiRequest(path, options = {}) {
  const { headers: customHeaders = {}, ...requestOptions } = options

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...requestOptions,
    headers: {
      'Content-Type': 'application/json',
      ...customHeaders,
    },
  })

  const isJson = response.headers.get('content-type')?.includes('application/json')
  const payload = isJson ? await response.json() : null

  if (!response.ok) {
    const message = payload?.message || payload?.error || 'Request failed'
    throw new Error(message)
  }

  return payload
}
