import * as moment from 'moment'

const format = (date: Date, outputFormat = 'DD.MM.YYYY'): string => {
  const currentDate = moment(date).format('YYYY-MM-DD HH:mm:ss')

  return moment.utc(currentDate).local().format(outputFormat)
}

export default format
