<template>
<div class="row">
  <div class="col-sm col-md-2 pe-0 sidbar-wrapper position-relative">
     <div class="header d-flex justify-content-between py-3 shadow-sm text-white px-2 md-px-3 mx-0">
        <span class=" pb-1 fw-bold">Horizon College</span>
        <span role="button" @click="toggleMenu" id="menubar" class="d-sm-none me-2">
            <i class="fas fa-bars fw-bold fs-1"></i>
         </span>
     </div> 
       <div class="student-sidebar"  ref="sidebar" id="sidebar">
         <sidebar @linkClicked='toggleMenu'></sidebar>
        </div>
  </div>
  <div class="col-sm col-md-10 content px-0 ">
     <div class="bg-white py-sm-4 py-md-3 px-3 shadow-sm fw-bold d-flex justify-content-between">
       <span>My Course</span> 
       <div class="dropdown">
       <a class="btn  dropdown-toggle p-0 m-0"  role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
         {{student?.name}}
       </a>
       <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
         <li><span role="button" @click="logout" class="dropdown-item">Logout</span></li>
       </ul>
     </div>
  </div>
     <div class="router-view">
        <router-view />
        
     </div>
  </div>
</div>
  <div v-if="isItemLoading" class="loading-screen route-loading p-0  position-absolute top-0 start-0 w-100 h-100">
      <div class="loading-spinner position-relative">
         <img src="../../assets/loading.gif" width="80" height="80"  alt="slow connection">
      </div>
    </div>  
</template>
<script>
import Sidebar from '../../components/student/Sidebar.vue'
import apiClient from '../../resources/baseUrl'
import {mapGetters} from 'vuex'
export default {
   components:{Sidebar},
   data(){
      return{
          sidebarShown:false
      }
   },
   computed:{
      ...mapGetters({student:'studentAuth/student',isItemLoading:'isItemLoading'})
   },
  
   methods:{
      toggleMenu(){
         var element = document.getElementById('menubar')
         var style = window.getComputedStyle(element)
         var display = style.getPropertyValue('display');
         if(display==='none')
           return;
          
           this.sidebarShown=!this.sidebarShown
           let vm=this
           if(this.sidebarShown){
              vm.$refs.sidebar.style.display='block'
           }else{
              vm.$refs.sidebar.style.display='none'
          }
      },
      myEventHandler() {
         if(Number(window.innerWidth)>590){
            this.$refs.sidebar.style.display='block'
         }
       },
        async logout () {
            try {
              var response = await apiClient.post('/api/logout')
              if (response.status === 200) {
                apiClient.defaults.headers.common['Authorization'] =null
                this.$store.dispatch('studentAuth/setStudentToken','')
                this.$store.dispatch('studentAuth/setStudent')
                this.$store.dispatch('studentAuth/setIsStudentAuthenticated', false)
                 
                localStorage.removeItem('student') 
                localStorage.removeItem('studentToken')  
               this.$router.push({name:'StudentLogin'})


               }else{
                throw 'faild'
              }
            } catch (e) {
              console.log(e)
              throw e
            }
          },

   },
   created(){
      window.addEventListener("resize", this.myEventHandler);
   },
   unmounted() {
      window.removeEventListener("resize", this.myEventHandler);
   },
   beforeCreate(){
     if(localStorage.getItem('studentToken')){
         let token=localStorage.getItem('studentToken')
         this.$store.dispatch('studentAuth/setStudentToken', token)
         this.$store.dispatch('studentAuth/setIsStudentAuthenticated', true)
         apiClient.defaults.headers.common['Authorization'] =`Bearer ${token}`
     } 
     if(localStorage.getItem('student')){
        let user=localStorage.getItem('student')
        console.log('user data',user)
        this.$store.dispatch('studentAuth/setStudent', JSON.parse(user))
     }
  
   }
}
</script>
<style scoped>
.header{
   background-color: #088dc5;
}
.content{
   background-color: #f5f6fa;
}

.student-sidebar{
    background-color: #3081b4;
    min-height: 100vh;
}
.loading-spinner{
  top: 10%;
  left: 47%;
}
.route-loading{
  background-color: rgba(0, 0, 0, 0.5);;
}

@media (max-width: 576px) {
 .student-sidebar {
  position: absolute;  
  z-index: 2;
  display: none;
 }
 .router-view{
   overflow-x:scroll !important;
   min-height: 90vh;
  }
.content{
   background-color: #fff;
  }
.loading-spinner{
  left: 35%;
 }
}
</style>

<style>
table {
  border-collapse: collapse;
  width: 100%;
}
th{
  text-align: left;
  padding: 8px;
  background-color: #3081b4;
}
tr,td,th{
  border: 2px solid hsla(228, 33%, 97%, 0.637)
}
td{
  text-align: left;
  padding: 8px;
  vertical-align: top;
}
</style>
