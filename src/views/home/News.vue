<template>
    <div class="container my-3">
        <div class="mb-2" v-for="news in fetchedNews" :key="news.id">
            <div>{{(new Date(news.posted_date)).toString().split(' ').slice(0,4).join(' ')}}</div>
            <strong class="my-1 d-block">{{news.title}}</strong>
              <p v-if="!news.isExpanded" class="mb-1 mt-2">{{news.description.slice(0,300)}}... </p>
              <p v-else class="mb-1 mt-2">{{news.description}}</p>
              <a @click="news.isExpanded=!news.isExpanded" role="button" class="nav-link py-0  px-0"><span v-if="!news.isExpanded">Read More</span><span v-else>Read Less</span></a>
             <hr class="hr">
        </div>
        <div v-if="!fetchedNews.length" class="text-center">
            There is no recored available
        </div>
        <div v-if="fetchedNews.length" class="mt-2 d-flex justify-content-end">
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
          fetchedNews:[],
          current_page:'',
          per_page:'',
          last_page:''
      }
    },
    methods:{
         async navigate(pageNumber){
        // if(pageNumber>this.last_page || pageNumber<1)
        //     return;
         this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/get_news?page="+pageNumber)
            if (response.status === 200) {
              this.fetchedNews=response.data.data
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
       }
    },
    created(){
        this.navigate(1)
    }
}
</script>
