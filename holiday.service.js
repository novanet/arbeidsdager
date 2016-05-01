(function () {
	'use strict';

	angular
        .module('app')
        .factory('holidayService', holidayService);

	holidayService.$inject = [];

    // XX.XX: Palmesøndag
    // XX.XX: Skjærtorsdag
    // XX.XX: Langfredag
    // XX.XX: 1. påskedag
    // XX.XX: 2. påskedag
    // 01.05: Offentlig høytidsdag
    // 05.05: Kristi Himmelfartsdag
    // XX.XX: 1. pinsedag
    // XX.XX: 2. pinsedag
    // 17.05: Grunnlovsdag
    // 25.12: 1. juledag
    // 26.12: 2. juledag
    // 01.01: 1. nyttårsdag

	function holidayService() {                                		
        return {
		    getHolidays : _.memoize(getHolidays)
		};
		
		function getHolidays(year) {
            var easterSunday = getEasterSunday(year);           
            
            var holidays = [];
            
            // 01.05: Offentlig høytidsdag        
            holidays.push({'date' : moment(new Date(year, 4, 1)).format('YYYY-MM-DD'), 'name' : 'Offentlig høytidsdag'});               
            
            // 17.05: Grunnlovsdag
            holidays.push({'date' : moment(new Date(year, 4, 17)).format('YYYY-MM-DD'), 'name' : 'Grunnlovsdag'});
            
            // 25.12: 1. juledag
            holidays.push({'date' : moment(new Date(year, 11, 25)).format('YYYY-MM-DD'), 'name' : '1. juledag'});
            
            // 26.12: 2. juledag
            holidays.push({'date' : moment(new Date(year, 11, 26)).format('YYYY-MM-DD'), 'name' : '2. juledag'});
            
            // 01.01: 1. nyttårsdag        
            holidays.push({'date' : moment(new Date(year, 0, 1)).format('YYYY-MM-DD'), 'name' : '1. nyttårsdag'});
            
            // XX.XX: Palmesøndag
            holidays.push({'date' : easterSunday.clone().add(-7, 'days').format('YYYY-MM-DD'), 'name' : 'Palmesøndag'});
            
            // XX.XX: Skjærtorsdag
            holidays.push({'date' : easterSunday.clone().add(-3, 'days').format('YYYY-MM-DD'), 'name' : 'Skjærtorsdag'});
            
            // XX.XX: Langfredag
            holidays.push({'date' : easterSunday.clone().add(-2, 'days').format('YYYY-MM-DD'), 'name' : 'Langfredag'});
            
            // XX.XX: 1. påskedag
            holidays.push({'date' : easterSunday.format('YYYY-MM-DD'), 'name' : '1. påskedag'});
            
            // XX.XX: 2. påskedag        
            holidays.push({'date' : easterSunday.clone().add(1, 'days').format('YYYY-MM-DD'), 'name' : '2. påskedag'});
            
            // XX.XX: Kristi Himmelfartsdag        
            holidays.push({'date' : easterSunday.clone().add(39, 'days').format('YYYY-MM-DD'), 'name' : 'Kristi Himmelfartsdag'});
            
            // XX.XX: 1. pinsedag
            holidays.push({'date' : easterSunday.clone().add(49, 'days').format('YYYY-MM-DD'), 'name' : '1. pinsedag'});
            
            // XX.XX: 2. pinsedag
            holidays.push({'date' : easterSunday.clone().add(50, 'days').format('YYYY-MM-DD'), 'name' : '2. pinsedag'});
            
            return holidays;
        }                  
        
        function getEasterSunday (year) {
                var a = year % 19;
                var b = Math.floor(year/100); 
                var c = year % 100;
                var d = Math.floor(b/4); 
                var e = b % 4;
                var f = Math.floor((b+8)/25);   
                var g = Math.floor((b-f+1)/3);
                var h = (19*a+b-d-g+15) % 30;      
                var i = Math.floor(c/4); 
                var k = c % 4;
                var l = (32 + 2*e + 2* i - h - k) % 7;
                var m = Math.floor((a+11*h+22*l)/451);
                var n = Math.floor((h+l-7*m+114)/31); 
                var p = (h+l-7*m+114) % 31;
                p++;
                return moment(new Date(year, n-1, p));                                
            }        
	}
})();