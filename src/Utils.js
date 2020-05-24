export default class {
  static convertToIndianMetrics (number) {
    let numberString = String(parseInt(number));
    let lengthOfTheString = numberString.length;
    if (lengthOfTheString < 4) {
      return numberString;
    }
    let returnString = '';
    for (let i = 0; i < lengthOfTheString; i++) {
      let currentDigit = numberString[lengthOfTheString - i - 1];
      if (i < 3) {
        returnString = `${currentDigit}${returnString}`;
      } else if (i === 3) {
        returnString = `${currentDigit},${returnString}`;
      } else if (i % 2 == 0) {
        returnString = `${currentDigit}${returnString}`;
      } else {
        returnString = `${currentDigit},${returnString}`;
      }
    }
    return returnString;
  }
  static converToInidanFormat (property) {
    let date = property.split('/');
    if (date.length === 3)
      return `${date[1]}/${date[0]}/${date[2]}`;
    return property
  }
  static convertToLakhs (d) {
    return (d / 1e5).toFixed(1);
  }
}

