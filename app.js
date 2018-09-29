new Vue({

    el: '#app',

    data: {
        months: [],
        selectedYear: 0
    },

    created: function () {
        this.selectedYear = moment().year()
    },

    methods: {
        decreaseYear: function () {
            this.selectedYear--;
        },
        increaseYear: function () {
            this.selectedYear++;
        }
    }
})