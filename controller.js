
(function () {
    'use strict';
	
    angular
        .module('app')
	    .controller('controller', controller);
        
        controller.$inject = ['holidayService'];
        
        function controller(holidayService) {
            var vm = this;
            
            vm.decreaseYear = decreaseYear;
            vm.holidays = undefined;          
            vm.increaseYear = increaseYear;
            vm.months = [];            
            vm.selectedYear = undefined;
            vm.specialDays = [];
            vm.summerTime = undefined;            
            vm.today = moment().format();
			vm.totalNumberOfWorkingDaysInYear = undefined;
            vm.week = moment().isoWeek();
            
            function init() {
                vm.selectedYear = moment().year();                            
                setNumberOfWorkingDays();
                setSpecialDays();
            }
            
            function setNumberOfWorkingDays(){
                // vm.holidays = holidayService.getHolidays(vm.selectedYear);

                vm.months = [];
                vm.months.push({'name' : 'Januar', 'numberOfWorkingDays': utils.holiday.getNumberOfWorkingDays(1, holidays)});
                vm.months.push({'name' : 'Februar', 'numberOfWorkingDays': utils.holiday.getNumberOfWorkingDays(2, holidays)});
                vm.months.push({'name' : 'Mars', 'numberOfWorkingDays': utils.holiday.getNumberOfWorkingDays(3, holidays)});
                vm.months.push({'name' : 'April', 'numberOfWorkingDays': utils.holiday.getNumberOfWorkingDays(4, holidays)});
                vm.months.push({'name' : 'Mai', 'numberOfWorkingDays': utils.holiday.getNumberOfWorkingDays(5, holidays)});
                vm.months.push({'name' : 'Juni', 'numberOfWorkingDays': utils.holiday.getNumberOfWorkingDays(6, holidays)});
                vm.months.push({'name' : 'Juli', 'numberOfWorkingDays': utils.holiday.getNumberOfWorkingDays(7, holidays)});
                vm.months.push({'name' : 'August', 'numberOfWorkingDays': utils.holiday.getNumberOfWorkingDays(8, holidays)});
                vm.months.push({'name' : 'September', 'numberOfWorkingDays': utils.holiday.getNumberOfWorkingDays(9, holidays)});
                vm.months.push({'name' : 'Oktober', 'numberOfWorkingDays': utils.holiday.getNumberOfWorkingDays(10, holidays)});
                vm.months.push({'name' : 'November', 'numberOfWorkingDays': utils.holiday.getNumberOfWorkingDays(11, holidays)});
                vm.months.push({'name' : 'Desember', 'numberOfWorkingDays': utils.holiday.getNumberOfWorkingDays(12, holidays)});      

				var totalDays = 0;
				for(var i = 0; i< vm.months.length; i++){
					totalDays += vm.months[i].numberOfWorkingDays;
				}
				vm.totalNumberOfWorkingDaysInYear = totalDays;			
            }
            
            function setSpecialDays(){
                vm.specialDays = holidayService.getSpecialDays(vm.selectedYear);
                vm.summerTime = {
                    start : holidayService.getStartOfSummerTime(vm.selectedYear),
                    end : holidayService.getEndOfSummerTime(vm.selectedYear)
                }                   
            }
            
            function decreaseYear(){
                vm.selectedYear--;
                setNumberOfWorkingDays();
                setSpecialDays();
            }
            
            function increaseYear(){
                vm.selectedYear++;
                setNumberOfWorkingDays();
                setSpecialDays();
            }            
            
            init();      
        }
})();