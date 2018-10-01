var utils = utils || {};
(function (ctx) {

  ctx.getNumberOfWorkingDays = function (year, month, holidays) {
    var lastDayOfMonth = moment(year + '-' + month, 'YYYY-MM').daysInMonth();

    var numberOfWorkingDays = 0;
    for (var i = 1; i <= lastDayOfMonth; i++) {
      var date = moment(new Date(year, month - 1, i));

      if (!_isWeekend(date) && !_isHoliday(date, holidays)) {
        numberOfWorkingDays++;
      }
    }
    return numberOfWorkingDays;
  }

  function _isHoliday(date, holidays) {
    return _.some(holidays, function (holiday) {
      return moment(holiday.date).isSame(date, 'day');
    });
  }

  function _isWeekend(date) {
    return date.day() === 6 || date.day() === 0;
  }
})(utils || {});