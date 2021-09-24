import dayjs from 'dayjs'

const unixDate = (): number => dayjs(new Date()).unix()

const fullDateTime = (unix: number): string =>
  dayjs.unix(unix).format('YYYY-MM-DD HH:mm:ss')

export { unixDate, fullDateTime }
