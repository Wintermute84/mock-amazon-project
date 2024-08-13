export function isWeekend(date){
  const day = date.format('dddd');
  if(day === 'Saturday'){
    return date.add(2,'days');
  }
  else if(day === 'Sunday'){
    return date.add(1,'days');
  }
  else return date;
}


export function calculateDeliveryDate(today, deliveryOption){
  let date = today;
  let deliveryDays = deliveryOption.deliveryDays;
  while(deliveryDays > 0){
    date = date.add(1,'days');
    date = isWeekend(date);
    deliveryDays--;
  }
  return date;
}