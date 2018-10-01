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
                this.createMonth('Januar', 1),
                this.createMonth('Februar', 2),
                this.createMonth('Mars', 3),
                this.createMonth('April', 4),
                this.createMonth('Mai', 5),
                this.createMonth('Juni', 6),
                this.createMonth('Juli', 7),
                this.createMonth('August', 8),
                this.createMonth('September', 9),
                this.createMonth('Oktober', 10),
                this.createMonth('November', 11),
                this.createMonth('Desember', 12)
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
        },
        createMonth: function (name, monthNumber) {
            return {
                'name': name,
                'numberOfWorkingDays': utils.getNumberOfWorkingDays(this.selectedYear, monthNumber, this.holidays)
            }
        }
    },

    filters: {
        date: function (date, format) {
            return moment(date).format(format);
        }
    }
})