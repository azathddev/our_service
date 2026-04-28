function ApiResult({ error, result }) {
  if (error) {
    return <p className="error-text">{error}</p>
  }

  if (!result) {
    return null
  }

  return <pre className="result-box">{JSON.stringify(result, null, 2)}</pre>
}

export default ApiResult
