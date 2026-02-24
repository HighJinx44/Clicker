function format(number) {
  return Number((Math.round(number*10)/10).toFixed(1));
}

export default format;