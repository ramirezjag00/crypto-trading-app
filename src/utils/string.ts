const sanitizeString = (text = ''): string =>
  text?.replace(/[^0-9a-zA-Z\s]+/g, '').trim()

export { sanitizeString }
