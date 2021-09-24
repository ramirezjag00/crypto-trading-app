import dayjs from 'dayjs'

const unixDate = (): number => dayjs(new Date()).unix()

export { unixDate }
