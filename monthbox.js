Vue.component('monthbox', {
    props: ['name', 'numberOfDays'],
    template: `
        <li :title="name + ' har ' + numberOfDays + ' arbeidsdager'">{{name}}<br>
            <span class="badge">{{numberOfDays}}</span>
        </li>`
})