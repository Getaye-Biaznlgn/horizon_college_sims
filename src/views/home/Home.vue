<template>
  <div class="container-fluid main-image position-relative">
     <button @click="applyNow" class="btn btn-outline-warning position-absolute bottom-50 start-25">APPLY NOW</button>
  </div>

  <!-- programs -->
  <section class="container my-4">
    <div class="  d-md-flex mb-4"> 
        <div class="text-center fw-bold fs-5 text-md-start"><span style="white-space: nowrap!important; overflow: hidden;">Our Programs</span></div>
        <div class="ms-2 align-self-center hr w-100"></div>
    </div>
    <div class="row g-5">
        <div class="col-sm-6 col-lg-3 position-relative">
            <img src="../../assets/image5.jpg" class="img-fluid rounded rounded">                    
            <div class="overlay w-100 top-0 start-0 h-100 position-absolute">
                <p class="text-white text start-50 top-50 fw-bold lead position-absolute">Database Adminstration</p>
            </div>
         </div>
         <div class="col-sm-6 col-lg-3 position-relative">
            <img src="../../assets/image2.jpg" class="img-fluid rounded rounded">                    
            <div class="overlay w-100 top-0 start-0 h-100 position-absolute">
                <p class="text-white text start-50 top-50 fw-bold lead position-absolute">Accounting and budget service</p>
            </div>
         </div>
         <div class="col-sm-6 col-lg-3 position-relative">
            <img src="../../assets/image3.jpg" class="img-fluid rounded rounded">                    
            <div class="overlay w-100 top-0 start-0 h-100 position-absolute">
                <p class="text-white text start-50 top-50 fw-bold lead position-absolute">Accounting and Finance</p>
            </div>
         </div>
         <div class="col-sm-6 col-lg-3 position-relative">
            <img src="../../assets/image4.jpg" class="img-fluid rounded rounded">                    
            <div class="overlay w-100 top-0 start-0 h-100 position-absolute">
                <p class="text-white text start-50 top-50 fw-bold lead position-absolute">Management</p>
            </div>
         </div>
    </div>
    <div class="mt-4 d-flex justify-content-center">
       <button @click="$router.push({name:'AcademicProgram'})" class="btn btn-lg btn-outline-primary btn-outline small  text-center">View All Our Programs</button>
    </div>
  </section>
   
   <!-- news and events -->
  <section class="container my-4">
     <div class="row g-5">
         <div class="col-lg-8">
           <div class="d-md-flex justify-content-between align-items-center mb-3">
              <div class="fs-5 fw-bold">News And Updates</div>   
              <router-link :to="{name:'News'}" class="nav-link px-0">Read All News</router-link>
            </div>
             <!--  loop with data -->
            <div  v-for="news in fetchedNews" :key="news.id">
            <hr class="hr">
            <div class="d-md-flex">
               <span class="fw-bld cursor-pointer me-2 px-0">{{getFormatedDate(news.posted_date)}}</span>
               <div>
                  <div class="fw-bold">{{news.title}}</div>
                  <p v-if="!news.isExpanded" class="mb-1 mt-2">{{news.description.slice(0,200)}}... 
                  </p>
                  <p v-else class="mb-1 mt-2">{{news.description}}
                  </p>
                  <a @click="news.isExpanded=!news.isExpanded" role="button" class="nav-link py-0  px-0"><span v-if="!news.isExpanded">Read More</span><span v-else>Read Less</span></a>
               </div>
            </div>
            </div>
            <!--end to loop  -->
            <hr class="hr">
         </div>
          <div class="col-lg-4">
           <div class="d-md-flex justify-content-between align-items-center mb-3">
              <div class="fs-5 fw-bold">Upcomig Events</div>   
              <router-link :to="{name:'Event'}" class="nav-link px-0">View All Events</router-link>
            </div>
            <!-- loop here -->
            <div v-for="event in events" :key="event.id">
            <hr class="hr">
            <div class="d-md-flex">
               <span class="fw-bld me-2 px-0">{{getFormatedDate(event.posted_date)}}</span>
               <div>
                  <div class="fw-bold">{{event.title}}</div>
                  <p class="mb-1 mt-2">{{event.description.slice(0,200)}}
                  </p>
                  <strong class="cursor-pointer py-0 mt-1 d-block px-0">{{event.event_start_time+'--'+event.event_end_time}}</strong>
               </div>
            </div>
            </div>
            <!--end to loop  -->
            <hr class="hr">
         </div>
     </div>
  </section>

  <!-- students on college -->
  <!-- programs -->
  <section class="container my-4">
    <div class="text-center fw-bold fs-5 mb-4 text-md-start">Students On College</div>
    <div class="row g-5">
        <div v-for="gallery in galleries" :key="gallery.id" class="col-sm-6 col-lg-3">
            <img :src="gallery.url" height="200" width="250" class=" rounded rounded">                    
         </div>
    </div>
  </section>
<!-- google map -->
  <section class="container pb-0">
      <div class="bg-light text-center py-3">FIND US</div>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.6563916841346!2d37.37226391407756!3d11.576471891781688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1644d3527cc10dc5%3A0xe7690893986bd5e2!2sHorizon%20Academy!5e0!3m2!1sen!2set!4v1640874259059!5m2!1sen!2set"
       class="w-100 my-0 pb-0" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
  </section>
</template>

<script>
import apiClient from '../../resources/baseUrl'
export default{
   data(){
      return{
        galleries:[],
        current_page:'',
        per_page:'',
        last_page:'',
        events:[],
        fetchedNews:[]
       }
   },
    methods:{
      applyNow(){
      this.$router.push({name:'OnlineRegistration'})
    },
       getFormatedDate(date){
        return new Date(date).toString().split(' ').slice(1,3).join(' ')
       },
       async fetchGallery(pageNumber){
         this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/get_student_galleries?per_page=4&&page="+pageNumber)
            if (response.status === 200) {
              this.galleries=response.data.data
              this.current_page=response.data.current_page
              this.per_page=response.data.per_page
              this.last_page=response.data.last_page
            } else {
              throw 'Failed to fetch news'
            }
        } catch (e) {
            console.log(e.response)
        } finally {
            this.$store.commit('setIsItemLoading', false)
        }
       },
    async fetchNews(){
         this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/get_news?per_page=4&&page=1")
            if (response.status === 200) {
              this.fetchedNews=response.data.data
            } else {
              throw 'Failed to fetch news'
            }
        } catch (e) {
            console.log(e.response)
        } finally {
            this.$store.commit('setIsItemLoading', false)
        }
       },
   async fetchEvents(){
         this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/get_events?per_page=4&&page=1")
            if (response.status === 200) {
              this.events=response.data.data
            } else {
              throw 'Failed to fetch event'
            }
        } catch (e) {
            console.log(e.response)
        } finally {
            this.$store.commit('setIsItemLoading', false)
        }
       },
    },
    created(){
       this.fetchGallery(1)
       this.fetchEvents()
       this.fetchNews()
    }
}
</script>

<style scoped>
.main-image{
    height: 400px;
    background-color: #1c2c5b;
 }
 .main-color{
     background-color: #1c2c5b;
 }
 .text-dark-blue{
   color: #1c2c5b;
 }
.overlay{
    background-color: rgba(255, 255, 255, 0.2);
}
.text {
    transform:translate(-50%, -50%);
}
.btn-outline:hover{
    background-color: #1c2c5b !important;
}
.quick-link{
  background-color:#17459d ;  
}
.bg-accordion{
   background-color:#f1f1f1
}
.cursor-pointer{
  cursor: pointer;
}
</style>