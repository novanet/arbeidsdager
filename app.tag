<app>
    <div class="container">
        <div class="row">
            <div class="jumbotron" style="margin-top:5px;text-align:center;">
                <a href="http://www.novanet.no"><img src="novanet-logo.svg" class="logo"></a>
                <h1>Arbeidsdager</h1>
                <p>
                    <ul class="pager">
                        <li><a class="btn" onclick="{decreaseYear}">-</a></li>
                        <li style="
                                font-size:24px;vertical-align: middle;padding-left:10px;padding-right:10px;">{selectedYear}</li>
                        <li><a class="btn" onclick="{increaseYear}">+</a></li>
                    </ul>
                    <ul class="nav nav-pills">
                        <li role="presentation" each="{month in months}">
                            {month.name}<br>
                            <span class="badge">{month.numberOfWorkingDays}</span>
                        </li>
                    </ul>
                    <br />
                    <br />
                    <div class="row" style="margin:auto;width:90%;">
                        <div class="col-lg-4">
                            <ul style="text-align:left;list-style-type:none;"><strong>I dag:</strong>
                                <li>{today }</li>
                            </ul>
                            <ul style="text-align:left;list-style-type:none;"><strong>Ukenummer:</strong>
                                <li>{week}</li>
                            </ul>
                            <ul style="text-align:left;list-style-type:none;">
                                <strong>Totalt antall arbeidsdager</strong>
                                <li>{totalNumberOfWorkingDaysInYear}</li>
                            </ul>
                        </div>
                        <div class="col-lg-4">
                            <ul style="text-align:left;list-style-type:none;"><strong>Helligdager i
                                    {selectedYear}:</strong>
                                <!-- <li each="{h in holidays | orderBy:'date'}">{h.date | date:'dd.MM'} -
                                    {h.name}</li> -->
                                <!-- <li each="{h in holidays | orderBy:'date'}">{h.date} - -->
                                <li each="{h in holidays}">{h.date} -
                                    {h.name}</li>
                            </ul>
                        </div>
                        <div class="col-lg-4">
                            <ul style="text-align:left;list-style-type:none;" if="{summerTime}"><strong>Sommertid
                                    starter</strong>
                                <!-- <li>{summerTime.start | date:'dd.MM'} - kl.02:00</li> -->
                                <li>{summerTime.start} - kl.02:00</li>
                            </ul>
                            <ul style="text-align:left;list-style-type:none;"><strong>Sommertid slutter</strong>
                                <!-- <li>{summerTime.end | date:'dd.MM'} - kl.03:00</li> -->
                                <li>{summerTime.end} - kl.03:00</li>
                            </ul>
                            <ul style="text-align:left;list-style-type:none;"><strong>Andre spesielle dager i
                                    {selectedYear}:</strong>
                                <!-- <li each="s in specialDays | orderBy:'date'">{s.date | date:'dd.MM'} - -->
                                <li each="{s in specialDays }">{s.date} -
                                    {s.name}</li>
                            </ul>
                        </div>
                    </div>
                </p>
            </div>
        </div>
    </div>
    <style>
        .nav-tabs>li,
        .nav-pills>li {
            margin: 12px;
            float: none;
            display: inline-block;
            *display: inline;
            /* ie7 fix */
            zoom: 1;
            /* hasLayout ie7 trigger */
        }

        .nav-tabs,
        .nav-pills {
            text-align: center;
        }

        .pager li>a {
            min-width: 40px;
            outline: none;
        }

        .badge {
            padding: 40px;
            font-size: 48px;
        }

        .logo {
            margin-left: 28px;
            width: 88px;
        }

        @media screen and (min-width: 480px) {
            .logo {
                position: relative;
                float: left;
                left: 200px;
                margin-left: -200px;
            }
        }
    </style>
    <script>
        this.months = []
        this.summerTime = {
            start: '',
            end: ''
        }
        this.selectedYear = moment().year();
        this.today = moment().format('DD.MM.YYYY');
        this.week = moment().isoWeek();

        this.createMonths = () => (
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
            ]
        )

        this.createMonth = (name, monthNumber) => {
            return {
                name: name,
                numberOfWorkingDays: utils.getNumberOfWorkingDays(this.selectedYear, monthNumber, this.holidays)
            }
        }

        this.workingDaysInYear = () => (this.months.reduce((prev, cur) => (prev + cur.numberOfWorkingDays), 0))

        this.decreaseYear = () => {
            this.selectedYear--;
        }

        this.increaseYear = () => {
            this.selectedYear++;
        }

        this.on('mount', () => {
            this.update()
        })

        this.on('update', () => {
            this.months = this.createMonths()
            this.totalNumberOfWorkingDaysInYear = this.workingDaysInYear()
            this.specialDays = _.orderBy(utils.getSpecialDays(this.selectedYear), ['date'], ['asc']);
            this.summerTime = {
                start: utils.getStartOfSummerTime(this.selectedYear),
                end: utils.getEndOfSummerTime(this.selectedYear)
            };
            this.holidays = _.orderBy(utils.getHolidays(this.selectedYear), ['date'], ['asc']);
        })
    </script>
</app>