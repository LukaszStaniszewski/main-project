const getErrorMessage = (error: unknown) => {
   if (error instanceof Error) return `🔥 ${error.message} 🔥`
   return String(error)
}

export default getErrorMessage