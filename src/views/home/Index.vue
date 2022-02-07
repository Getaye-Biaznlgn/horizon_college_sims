<template>
<div class="position-relative">

<div class="d-flex text-white py-1 justify-content-between top-address">
    <div class="d-flex">
        <span class="small mx-3 d-none d-lg-block"><i class="fas fa-map-marker-alt pe-2"></i>Bahir Dar, Ethiopia</span>
        <span class="small mx-3 "><i class="fas fa-phone pe-2"></i>+251 918 014 740</span>
        <span class="small mx-3 d-none d-lg-block"><i class="fas fa-envelope pe-2"></i>horzion@gmail.com</span>
    </div>
    <div>
        <a href="https://www.facebook.com" target="_blank"  class="small text-white  mx-1 mx-md-2"><i class="fab fa-facebook-square"></i></a>
        <a href="https://www.twitter.com" target="_blank" class="small text-white mx-1 mx-md-2"><i class="fab fa-twitter-square"></i></a>
        <a href="https://www.linkedin.com" target="_blank" class="small text-white mx-1 mx-md-2"><i class="fab fa-linkedin"></i></a>
        <a href="https://www.youtube.com" target="_blank" class="small text-white mx-1 mx-md-2"><i class="fab fa-youtube-square"></i></a>
    </div>
</div>
<nav class="navbar navbar-expand-lg py-0 position-sticky top-0 my-nav  navbar-light bg-light">
  <div class="container-fluid py-0">
    <a class="navbar-brand ms-md-3" href="#">
        <img src="../../assets/logo.png" class="rounded-circle" width="70" height="60" alt="">
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <div class="container">
      <ul class="navbar-nav mb-2 mb-lg-0 d-flex justify-content-around">
        <li class="nav-item">
          <a  @click="navigatTo({name:'Home'})"  class="nav-link fw-bold" role="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">HOME</a>
        </li>
        <li class="nav-item">
          <a @click="navigatTo({name:'About'})" role="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show"  class="nav-link fw-bold">ABOUT US</a>
        </li>
         <li class="nav-item">
          <a @click="navigatTo({name:'AcademicProgram'})" role="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show"  class="nav-link fw-bold">ACADEMIC PROGRAM</a>
        </li>
         <li class="nav-item">
          <a  @click="navigatTo({name:'AcademicCalendar'})" class="nav-link fw-bold" role="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">ACADEMIC CALENDAR</a>
        </li>
         <li class="nav-item">
          <a @click="navigatTo({name:'Admission'})"   class="nav-link fw-bold" role="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">ADMISSION</a>
        </li>
         <li class="nav-item">
          <a  @click="navigatTo({name:'News'})"  class="nav-link fw-bold" role="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">NEWS</a>
        </li>
         <li class="nav-item">
          <a  @click="navigatTo({name:'Event'})"  class="nav-link fw-bold" role="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">EVENT</a>
        </li>
         <li class="nav-item">
          <button @click="applyNow"  class="btn fw-bold rounded bg-warning text-light fw-bold">APPLY NOW </button>
        </li>
      </ul>
        </div>
    </div>
  </div>
</nav>
 
    <router-view/>
    
    <!-- quick links -->
  <section class="d-none d-lg-block">
     <div class="d-flex px-3 py-4 text-white quick-link justify-content-between">
        <div class=" align-self-center">
            <img src="../../assets/logo.png" class="rounded-circle" width="80" height="70" alt="">
             <span class="fw-bold mx-2 lead">HORIZON COLLEGE</span>
             <span class="d-block mt-2">FOR QUALITY WE STRIVE TOGETHER !</span>
        </div>
        <div class="d-flex flex-column">
          <div class="fw-bold fs-5">Quick Links</div> 
         <router-link :to="{name:'AcademicCalendar'}" class="nav-link ps-0  text-white">Academic Caledar</router-link>
         <router-link :to="{name:'StudentHome'}"  class="nav-link ps-0 text-white">Student Information(SIMS)</router-link>
         <router-link :to="{name:'OnlineRegistration'}" class="nav-link ps-0  text-white">Application Form</router-link>
         <router-link :to="{name:'EmployeeMenu'}" class="nav-link ps-0 text-white">Local</router-link>
         <router-link :to="{name:'About'}" class="nav-link ps-0 text-white">About Us</router-link>
        </div>
        <div class="d-flex flex-column">
           <div class="fw-bold fs-5">Contact Us</div>
           <div class="pt-2"><span><i class="fas fa-phone pe-2"></i></span>+251 9801 4740</div>
           <div class="pt-2"><span><i class="fas fa-envelope pe-2"></i></span>horzion@gmail.com</div>
           <div class="pt-2"><span><i class="fas fa-map-marker-alt pe-2"></i></span>Bahir Dar, Ethiopia</div>
        </div>
        <div class="mt-3">
        <a href="https://www.facebook.com" target="_blank"  class=" text-white  mx-1 mx-md-2"><i class="fs-3 fab fa-facebook-square"></i></a>
        <a href="https://www.twitter.com" target="_blank" class=" text-white mx-1 mx-md-2"><i class="fs-3 fab fa-twitter-square"></i></a>
        <a href="https://www.linkedin.com" target="_blank" class=" text-white mx-1 mx-md-2"><i class="fs-3 fab fa-linkedin"></i></a>
        <a href="https://www.youtube.com" target="_blank" class=" text-white mx-1 mx-md-2 "><i class="fs-3 fab fa-youtube-square"></i></a>
        </div>
     </div>
  </section>
<section class="d-lg-none">
   <div class="accordion" id="accordionQuick">
     <div class="accordion-item">
      <h2 class="accordion-header" id="headingQuick">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseQuick" aria-expanded="true" aria-controls="collapseQuick">
          Quick Links
        </button>
      </h2>
      <div id="collapseQuick" class="accordion-collapse bg-accordion collapse" aria-labelledby="headingQuick" data-bs-parent="#accordionQuick">
        <div class="accordion-body">
         <router-link :to="{name:'AcademicCalendar'}" class="nav-link ps-0">Academic Caledar</router-link>
         <router-link :to="{name:'StudentHome'}"  class="nav-link ps-0">Student Information(SIMS)</router-link>
         <router-link :to="{name:'OnlineRegistration'}" class="nav-link ps-0">Application Form</router-link>
         <router-link :to="{name:'EmployeeMenu'}" class="nav-link ps-0">Local</router-link>
         <router-link :to="{name:'About'}" class="nav-link ps-0">About Us</router-link>
      </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingContact">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseContact" aria-expanded="true" aria-controls="collapseQuick">
          Contact Us
        </button>
      </h2>
      <div id="collapseContact" class="accordion-collapse bg-accordion collapse" aria-labelledby="headingContact" data-bs-parent="#accordionContact">
        <div class="accordion-body">
           <div class="pt-2"><span><i class="fas fa-phone pe-2"></i></span>+251 9801 4740</div>
           <div class="pt-2"><span><i class="fas fa-envelope pe-2"></i></span>horzion@gmail.com</div>
           <div class="pt-2"><span><i class="fas fa-map-marker-alt pe-2"></i></span>Bahir Dar, Ethiopia</div>
        </div>
      </div>
    </div>
</div>
   <div class="p-3 d-flex justify-content-evenly quick-link">
        <a href="https://www.facebook.com/HorizoncollegeBdr" target="_blank"  class=" text-white  mx-1 mx-md-2"><i class="fs-3 fab fa-facebook-square"></i></a>
        <a href="https://www.twitter.com" target="_blank" class=" text-white mx-1 mx-md-2"><i class="fs-3 fab fa-twitter-square"></i></a>
        <a href="https://www.linkedin.com" target="_blank" class=" text-white mx-1 mx-md-2"><i class="fs-3 fab fa-linkedin"></i></a>
        <a href="https://www.youtube.com" target="_blank" class=" text-white mx-1 mx-md-2 "><i class="fs-3 fab fa-youtube-square"></i></a>
   </div>
</section>
  <footer >
      <div class="py-3 text-center  main-color text-white">
        Website Designed and Developed by <a href="#">AMBA TECHNOLOGIES</a> . Copyright &copy;{{new Date().toString().split(' ').slice(3,4).join(' ')}} Horizon College 
      </div>
  </footer>
   <div v-if="isItemLoading" class="loading-screen route-loading p-0  bg-white position-fixed top-0 start-0 bottom-0 end-0">
        <div class="loading-spinner">
            <img src="../../assets/preloader.gif"   alt="slow connection">
        </div>
    </div> 
 </div>     
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data(){
     return{

     }
  },
  computed:{
    ...mapGetters(['isItemLoading'])
  },
  methods:{
    applyNow(){
      this.$router.push({name:'OnlineRegistration'})
    },
    navigatTo(to){
      this.$router.push(to)
    },
    
  },
 
}
</script>
<style scoped>
 .top-address{
     background-color: #1c2c5b;
 }
 .active{
   color: #1c2c5b!important;
 }
.my-nav{
  z-index: 10!important;
}
 .main-image{
    height: 400px;
    background-color: #1c2c5b;
 }
 .main-color{
     background-color: #1c2c5b;
 }
.btn-outline:hover{
    background-color: #1c2c5b !important;
}
.find-us{
   background-color: #f1f1f17c;
}
.quick-link{
  background-color:#17459d ;  
}
.bg-accordion{
   background-color:#f1f1f1
}
.loading-spinner{
  position:absolute; 
  top: 10%;
  left: 50%;
  transform:translate(-50%, -50%);
  /* z-index: 1; */
}
.route-loading{
  /* background-color: rgba(0, 0, 0, 0.5);; */
  z-index: 12!important;
}
</style>
<style>
.hr{
     border-top: 2px solid hsla(0, 4%, 64%, 0.602);
 }
</style>