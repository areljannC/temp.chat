import { formatDistance } from 'date-fns'

export const getDateDistanceFromToday = (date = new Date(), today = new Date()) => 
  formatDistance(date, today)