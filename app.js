new Vue({

  el: '#app',

  data: function () {
    return {
      selectedYear: 0,
      today: '',
      week: '',
      months: [],
      holidays: [],
      totalNumberOfWorkingDaysInYear: 0,
      summerTime: {
        start: '',
        end: ''
      },
      specialDays: []
    }
  },

  created: function () {
    this.selectedYear = moment().year();
    this.today = moment().format();
    this.week = moment().isoWeek();
  },

  watch: {
    selectedYear: function (year) {
      this.holidays = _.orderBy(utils.getHolidays(this.selectedYear), ['date'], ['asc']);
      this.months = [
        { 'name': 'Januar', 'numberOfWorkingDays': utils.getNumberOfWorkingDays(this.selectedYear, 1, this.holidays) },
        { 'name': 'Februar', 'numberOfWorkingDays': utils.getNumberOfWorkingDays(this.selectedYear, 2, this.holidays) },
        { 'name': 'Mars', 'numberOfWorkingDays': utils.getNumberOfWorkingDays(this.selectedYear, 3, this.holidays) },
        { 'name': 'April', 'numberOfWorkingDays': utils.getNumberOfWorkingDays(this.selectedYear, 4, this.holidays) },
        { 'name': 'Mai', 'numberOfWorkingDays': utils.getNumberOfWorkingDays(this.selectedYear, 5, this.holidays) },
        { 'name': 'Juni', 'numberOfWorkingDays': utils.getNumberOfWorkingDays(this.selectedYear, 6, this.holidays) },
        { 'name': 'Juli', 'numberOfWorkingDays': utils.getNumberOfWorkingDays(this.selectedYear, 7, this.holidays) },
        { 'name': 'August', 'numberOfWorkingDays': utils.getNumberOfWorkingDays(this.selectedYear, 8, this.holidays) },
        { 'name': 'September', 'numberOfWorkingDays': utils.getNumberOfWorkingDays(this.selectedYear, 9, this.holidays) },
        { 'name': 'Oktober', 'numberOfWorkingDays': utils.getNumberOfWorkingDays(this.selectedYear, 10, this.holidays) },
        { 'name': 'November', 'numberOfWorkingDays': utils.getNumberOfWorkingDays(this.selectedYear, 11, this.holidays) },
        { 'name': 'Desember', 'numberOfWorkingDays': utils.getNumberOfWorkingDays(this.selectedYear, 12, this.holidays) }
      ];
      var totalDays = 0;
      for (var i = 0; i < this.months.length; i++) {
        totalDays += this.months[i].numberOfWorkingDays;
      }
      this.totalNumberOfWorkingDaysInYear = totalDays;
      this.summerTime.start = utils.getStartOfSummerTime(this.selectedYear);
      this.summerTime.end = utils.getEndOfSummerTime(this.selectedYear);
      this.specialDays = _.orderBy(utils.getSpecialDays(this.selectedYear), ['date'], ['asc']);
    }
  },

  methods: {
    decreaseYear: function () {
      this.selectedYear--;
    },
    increaseYear: function () {
      this.selectedYear++;
    }
  },

  filters: {
    date: function (date, format) {
      return moment(date).format(format);
    }
  }
})