new Vue({

    el: '#app',

    data: function () {
        return {
            selectedYear: 0,
            today: '',
            week: '',
            months: [],
            holidays: [],
            totalNumberOfWorkingDaysInYear: 0
        }
    },

    created: function () {
        this.selectedYear = moment().year();
        this.today = moment().format();
        this.week = moment().isoWeek();
    },

    watch: {
        selectedYear: function (year) {
            this.holidays = utils.holiday.getHolidays(this.selectedYear);
            this.months = [
                { 'name': 'Januar', 'numberOfWorkingDays': utils.wdays.getNumberOfWorkingDays(this.selectedYear, 1, this.holidays) },
                { 'name': 'Februar', 'numberOfWorkingDays': utils.wdays.getNumberOfWorkingDays(this.selectedYear, 2, this.holidays) },
                { 'name': 'Mars', 'numberOfWorkingDays': utils.wdays.getNumberOfWorkingDays(this.selectedYear, 3, this.holidays) },
                { 'name': 'April', 'numberOfWorkingDays': utils.wdays.getNumberOfWorkingDays(this.selectedYear, 4, this.holidays) },
                { 'name': 'Mai', 'numberOfWorkingDays': utils.wdays.getNumberOfWorkingDays(this.selectedYear, 5, this.holidays) },
                { 'name': 'Juni', 'numberOfWorkingDays': utils.wdays.getNumberOfWorkingDays(this.selectedYear, 6, this.holidays) },
                { 'name': 'Juli', 'numberOfWorkingDays': utils.wdays.getNumberOfWorkingDays(this.selectedYear, 7, this.holidays) },
                { 'name': 'August', 'numberOfWorkingDays': utils.wdays.getNumberOfWorkingDays(this.selectedYear, 8, this.holidays) },
                { 'name': 'September', 'numberOfWorkingDays': utils.wdays.getNumberOfWorkingDays(this.selectedYear, 9, this.holidays) },
                { 'name': 'Oktober', 'numberOfWorkingDays': utils.wdays.getNumberOfWorkingDays(this.selectedYear, 10, this.holidays) },
                { 'name': 'November', 'numberOfWorkingDays': utils.wdays.getNumberOfWorkingDays(this.selectedYear, 11, this.holidays) },
                { 'name': 'Desember', 'numberOfWorkingDays': utils.wdays.getNumberOfWorkingDays(this.selectedYear, 12, this.holidays) }
            ];
            var totalDays = 0;
            for (var i = 0; i < this.months.length; i++) {
                totalDays += this.months[i].numberOfWorkingDays;
            }
            this.totalNumberOfWorkingDaysInYear = totalDays;
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