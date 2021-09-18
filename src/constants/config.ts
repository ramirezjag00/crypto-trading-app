const BASE_URL = 'https://api.coingecko.com/api/v3/'

const MAX_API_CALL = 50
const MINUTE_TO_MS = 60000
const POLLING_INTERVAL = MINUTE_TO_MS / MAX_API_CALL

export { BASE_URL, POLLING_INTERVAL }
