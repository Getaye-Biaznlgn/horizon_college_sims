import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export default {
 namespaced:true,
  state:{
    courses:[],
    sections:[],
    //to pass data to slip review page only
    studentForSlip:[],
    studentsForGrade:[],
    //students in accadamic year
    studentInSemesters:[]
  },
   mutations,
   getters,
   actions,
   }

  
