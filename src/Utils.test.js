import Utils from './Utils';


test('Test for conversion working fine', function () {
  let convertedNumber = Utils.convertToIndianMetrics(200000);
  expect(convertedNumber).toBe('2,00,000');
  convertedNumber = Utils.convertToIndianMetrics(300);
  expect(convertedNumber).toBe('300')
  convertedNumber = Utils.convertToIndianMetrics(4300);
  expect(convertedNumber).toBe('4,300')
  convertedNumber = Utils.convertToIndianMetrics(54300);
  expect(convertedNumber).toBe('54,300')
  convertedNumber = Utils.convertToIndianMetrics(12354300);
  expect(convertedNumber).toBe('1,23,54,300')
});
test('Test for the date', function () {
  let convertData = Utils.converToInidanFormat('2132');
  expect(convertData).toBe('2132');
})