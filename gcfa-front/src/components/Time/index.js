import React from 'react';
import Moment from 'react-moment';

function Time(props) {
  const { date, format } = props;
  return <Moment format={format} unix>{date / 1000}</Moment>;
}

export function DueTime(props) {
  const { doc, format, startYear } = props;
  const { day, month, year } = doc;
  const dueDate = new Date(startYear + year, month - 1, day);
  return <Moment format={format}>{dueDate}</Moment>
}

export default Time;
