Vue.component('monthbox', {
    props: ['name', 'numberOfDays'],
    template: `
        <li>{{name}}<br>
            <span class="badge">{{numberOfDays}}</span>
        </li>`
})