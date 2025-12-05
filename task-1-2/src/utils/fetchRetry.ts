export async function retryWithDelay<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delay: number = 1000,
): Promise<T> {
  let lastError: Error

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error

      if (attempt === maxAttempts) {
        throw lastError
      }

      const waitTime = delay * Math.pow(2, attempt - 1)
      console.warn(`Attempt ${attempt} failed. Retrying in ${waitTime}ms...`)

      await new Promise((resolve) => setTimeout(resolve, waitTime))
    }
  }

  throw lastError!
}
