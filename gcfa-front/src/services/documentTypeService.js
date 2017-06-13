import axios from 'axios';

export function getNextDueDate(sdate, day, month, dyear) {
  return new Date(sdate + dyear, month - 1, dyear);
}

getNextDueDate(2016, 2)
