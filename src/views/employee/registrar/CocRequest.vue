<template>
<base-card>
<div class="d-flex"> 
     <button @click="printCocRequest()" class="btn ms-auto me-1 addbtn me-3 p-1">
    <span class="me-3"><i class="fas fa-upload"></i></span>
    <span>Export</span>
    </button>
    </div>
      <div id="cocRequest" class="m-5">
        <div class="d-flex justify-content-between ms-3 me-3 mt-2 sr-only">
          <div>
          <h3>ሆራይዞን ኮሌጅ</h3>
          <h4> <span><img src="../../../assets/teleIcon.jpg" alt="tel icon" width="25" height="25"></span> 058-3208997</h4>
          <h4> <span><img src="../../../assets/envelop.jpg" alt="tel icon" width="25" height="25"></span> 927Bahi Dar</h4>
          </div>
          <div> <img src="../../../assets/logo.png" alt="horizon logo" width="80" height="80" class="me-5"></div>
          <div class="ms-5"><h3>Horizon College</h3>
          <h4>Fax:058-3208997</h4>
          <h4>E-mail:<i>horizoncollege@gmail.com</i></h4>
          </div>

        </div>
        <hr class="w-100 mt-3 sr-only" />

          <div class="sr-only d-flex justify-content-end mt-1 px-5">
              <div>
                   <h5><u>ቁጥር:</u>{{'_________________'}}</h5><br />
              <h5><u>ቀን {{'    '+(Number(new Date().getMonth())+1+'/'+new Date().getDate()+'/'+new Date().getFullYear())}}</u></h5>
              </div>
          </div>
          <div class="sr-only cocTitel ms-5 mt-3">
               <h5>ለአብክመ የልህቀት ማእከል</h5>
               <h5><u>ባህር ዳር</u></h5>
               <h5 class="ms-5">ጉዳዩ፦ <u>የተመዛኞችን ቁጥር ስለማሳወቅ</u></h5>
               <h5>ኮሌጃችን ከልህቀት ኤጀንሲው በተሰጠው የምዘና ማእከልነት እውቅና መሰረት
               በተሰጠው የሙያ ደረጃዎች ተመዛኞችን መዝግበናል።</h5>
               <h5>በዚህ መሰረት፦</h5>
          </div>
            <table class="viewcourse courseview mt-3">
  <thead>
      <tr class="table-header">
      <th class="text-white p-2" rowspan="2">NO</th>
      <th class="text-white p-2" rowspan="2">Occupation</th>
      <th class="text-white p-2" rowspan="2">Level</th>
      <th class="text-white p-2" colspan="3">Number of Candidates</th>
      <th class="text-white p-2" rowspan="2">Remark</th>
      </tr>
      <tr>
        <th class="text-white p-2">M</th>
        <th class="text-white p-2">F</th>
        <th class="text-white p-2">Total</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(cocRequest,index) in cocRequestDatas" :key="index">
<td>{{index+1}}</td>
<td>{{cocRequest.occupation_name}}</td>
<td>{{cocRequest.level_no}}</td>
<td>{{cocRequest.M}}</td>
<td>{{cocRequest.F}}</td>
<td>{{cocRequest.Total}}</td>
<td></td>
        </tr>
        <tr>
            <td colspan="3" class="text-center">Total</td>
            <td>{{sum().mTotal}}</td>
            <td>{{sum().fTotal}}</td>
            <td>{{sum().sum}}</td>
            <td></td>
        </tr>
      </tbody>
            </table>
            <div v-if="!cocRequestDatas.length" class="mt-3 ms-5 mx-5">Ther is no students registered for this COC</div>
            <div class="ms-5 mt-5 sr-only">
              <h4>
                አመልካቾችን ለምዘና የመዘገብብን መሆኑን እየገለጽን የምዘና ቀን በሚውሰንበት ጊዜ
              </h4>
              <h4>ምዘናውን ለመስጠት ዝግጁ መሆናችንን እናሳውቃለን</h4>
              <div class="d-flex">
                <div class="ms-auto mt-5 me-5">
                  <h4>ከሰላምታ ጋር</h4>
                </div>
              </div>
            </div>
      </div>
</base-card>
</template>
<script>
import apiClient from '../../../resources/baseUrl'
export default {
  props:['cocId'],
  data() {
      return {
          cocRequestDatas:[],
      isLoading:false,
      isSuccessed:true,
      isFaild:false,
      resultNotifier:'',
      }
  }, 
  computed:{
      acYearId(){
         return this.$store.getters.acYearId
      }
  },
  created() {
      console.log(' coc id = ',this.cocId)
      this.fetchCocRequest(this.cocId)
  }, 
  watch:{
      cocId(newValue){
          this.fetchCocRequest(newValue)
      }
  },
  methods: {
      async fetchCocRequest(id){
          this.$store.commit('setIsItemLoading',true)
try{
    var response = await apiClient.get('api/get_request_form_data/'+id)
    if(response.status === 200){
        this.cocRequestDatas = response.data
        console.log('coc request form data from server',response.data)          
}
}
catch(e){
   this.resultNotifier = 'registration is faild'
}
finally{
 this.$store.commit('setIsItemLoading',false)
}
      },
      sum(){
          var total={}
          var allMales= 0
          var allFemales = 0
         var  allTotal = 0
          this.cocRequestDatas.forEach(occupation=>{
            allMales = allMales+occupation.M
            allFemales = allFemales+occupation.F
            allTotal = allTotal+occupation.Total
          })
          total.mTotal = allMales
           total.fTotal = allFemales
            total.sum = allTotal
            return total
      },
      async printCocRequest(){
  await this.$htmlToPaper('cocRequest');
      }
  },
}
</script>
<style scoped>
.addbtn{
    background-color: #2f4587;
    color: #fff;
    width: 7em;
} 
.addbtn:hover{
    background-color:#366ad9 ;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
.table-header{
    background-color:#4285fa ;
    border-radius: 5px;
}
th{
  text-align: left;
  padding-bottom: 8px;
  padding-top: 4px;
   border: 1px solid gray;
  
}
td{
  border: 1px solid #dddddd;
  text-align: left;
  vertical-align: top;
}
.courseview{
  overflow-y: auto;
}
.viewcourse th{
  background-color: #fff;
  color: rgb(17, 17, 17)!important;
  font-size: 20px;
}
.viewcourse tr{
  border: 1px solid gray;

}
.viewcourse td{ 
  padding-left: 15px;
  /* border-left: none;
  border-right: none; */
   border: 1px solid gray;
  /* border-bottom: 2px solid gray; */
}
.cocTitel{
    margin-left: 25%;
}

</style>