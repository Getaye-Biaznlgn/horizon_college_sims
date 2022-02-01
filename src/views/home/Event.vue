<template>
    <div class="container my-3">
        <div class="mb-2" v-for="event in events" :key="event.id">
            <div class="lead">{{(new Date(event.posted_date)).toString().split(' ').slice(0, 4).join(' ')}}</div>
            <strong class="my-1 d-block">{{event.title}}</strong>
            <p>{{event.description}}</p>
            <div class="mt-2 lead">{{event.event_start_time}} - {{event.event_end_time}}</div>
            <hr class="hr">
        </div>
        <div v-if="!events.length" class="text-center">
            There is no recored available
        </div>
        <div v-if="events.length" class="mt-2 d-flex justify-content-end">
            <span class="pe-4 small">Rows per page {{per_page}}</span>
            <span class="pe-2">{{current_page}}/{{last_page}}</span>
            <span v-show="current_page!==1" @click="navigate(current_page-1)" role="button"><i class="fas fa-chevron-left px-3 fs-4"></i></span>
            <span v-show="current_page!==last_page" @click="navigate(current_page+1)" role="button"><i class="fas fa-chevron-right fs-4"></i></span>
         </div>
    </div>
   
</template>
<script>
import apiClient from '../../resources/baseUrl'
export default {
    data(){
      return{
          events:[],
          current_page:'',
          per_page:'',
          last_page:'',
      }
    },
    methods:{
         async navigate(pageNumber){
         this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/get_events?page="+pageNumber)
            console.log('events', response.data.data)
            if (response.status === 200) {
              this.events=response.data.data
              this.current_page=response.data.current_page
              this.per_page=response.data.per_page
              this.last_page=response.data.last_page
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
        this.navigate(1)
    }
}
</script>
