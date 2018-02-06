import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import NewSurvey from '@/components/NewSurvey/NewSurvey'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/NewSurvey',
      name: 'NewSurvey',
      component: NewSurvey
    }
  ]
})
