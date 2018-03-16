import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Demo from '@/components/Demo'
import NewSurvey from '@/components/NewSurvey/NewSurvey'
import DetailsSurvey from '@/components/DetailsSurvey/DetailsSurvey'
import edit from '@/components/Edit/edit'
// import Demo from '@/components/Demo'
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
    },
    {
      path: '/DetailsSurvey',
      name: 'DetailsSurvey',
      component: DetailsSurvey,

    },{
      path: '/Edit',
      name: 'edit',
      component: edit,

    },
    {
      path: '/Demo',
      name: 'demo',
      component:Demo
    },
  ]
})
