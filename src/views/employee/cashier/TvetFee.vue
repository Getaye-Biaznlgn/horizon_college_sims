<template>
<base-card>
 <div class="d-flex justify-content-between">
     <div class="input-group search w-25">
  <input type="text" class="form-control p-1" placeholder="Search By pad number" aria-label="Username" aria-describedby="addon-wrapping" v-model="searchValue" @keyup.enter="searchByStudId()">
   <span @click="searchByStudId()" class="searchicon  input-group-text" id="addon-wrapping"><i class="fas fa-search"></i></span>
</div>
  <div>
    <button @click="printStudentFee()" class="btn me-1 addbtn">
    <span class="me-3"><i class="fas fa-upload"></i></span>
    <span>Export</span>
    </button>
    </div>
    </div>
    <div id="tvetFee">
    <table class="mt-3">
  <thead>
    <tr class="table-header">
      <th class="text-white" rowspan="2">NO</th>
       <th class="text-white"  rowspan="2">Stud ID</th>
      <th class="text-white"  rowspan="2">Full Name</th>
      <th class="text-white"  rowspan="2">Sex</th>
      <th class="text-white text-center" colspan="12">Months</th>
      <th class="text-white" rowspan="2" colspan="2">Total</th>
    </tr>
      <tr class="table-header">
      <th class="text-white">Sep</th>
      <th class="text-white">Oct</th>
      <th class="text-white">Nov</th>
      <th class="text-white">Dec</th>
      <th class="text-white">Jan</th>
      <th class="text-white">Feb</th>
      <th class="text-white">Mar</th>
      <th class="text-white">Apr</th>
      <th class="text-white">May</th>
      <th class="text-white">Jun</th>
      <th class="text-white">Jul</th>
      <th class="text-white">Aug</th>
    </tr>
  </thead>
  <tbody>
     <tr v-for="(student,index) in tvetStudentFee.data" :key="student.id">
      <td>{{queryObject.per_page*tvetStudentFee.current_page +index+1 - queryObject.per_page }}</td>
      <td>{{student.student_id}}</td>
      <td>{{student.full_name}}</td>
      <td>{{student.sex}}</td>
     <td>{{student.pads.September}}</td>
      <td>{{student.pads.October}}</td>
      <td>{{student.pads.November}}</td>
      <td>{{student.pads.December}}</td>
      <td>{{student.pads.January}}</td>
      <td>{{student.pads.February}}</td>
      <td>{{student.pads.March}}</td>
      <td>{{student.pads.April}}</td>
      <td>{{student.pads.May}}</td>
      <td>{{student.pads.Jun}}</td>
      <td>{{student.pads.July}}</td>
      <td>{{student.pads.August}}</td>
      <td>{{student.total}}</td>
      <td><button @click="showDetail(student.id)" class="px-1 viewdetailbtn"><i class="fas fa-ellipsis-v"></i></button></td>
      
    </tr>
  </tbody>
   
</table>
    </div>
<div v-if="tvetStudentFee.data?.length" class="d-flex justify-content-end mt-3 me-5">
<div class="rowsperpage me-3">
Number of Rows 
</div>
<div class="limit col-sm-1 me-3">
<select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="rowNumber">
  <option value="5">5</option>
  <option value="10">10</option>
  <option value="15">15</option>
  <option value="20">20</option>
  
</select>
</div>
<div class="pageno me-3">
{{tvetStudentFee.from+'-'+tvetStudentFee.to+' of '+tvetStudentFee.total+' Rows'}}
</div>
<div class="leftchivron ms-3 me-3">
<button @click="backChivron()" class="chivronbtn" :class="{active:tvetStudentFee.from !== 1}" :disabled="tvetStudentFee.from === 1"><i class="fas fa-chevron-left"></i></button>
</div>
<div class="rightchivron"><button @click="forWardChivron()" class="chivronbtn" :class="{active:tvetStudentFee.to !==tvetStudentFee.total}" :disabled="tvetStudentFee.to ===tvetStudentFee.total"><i class="fas fa-chevron-right"></i></button></div>
</div>
</base-card>
<!--for detail dialog -->
</template>
<script>
export default {
    data() {
        return {
            isDetail:false,
            rowNumber:10,
            searchValue:'',
            queryObject:{
            page:1,
            per_page:10,
            search_id:'',
            path:'api/tvet_student_fees'
            }
        }
    },
    computed:{
      tvetStudentFee(){
        return this.$store.getters['cashier/tvetStudentFees']
      },
       tvetStudentFeeDetails(){
        return this.$store.getters['cashier/tvetStudentFeeDetails']
      },
      acYearId(){
        return this.$store.getters.acYearId
      },
      //  filteredStudents(){
      //    var tempStudents= this.tvetStudentFee.data    
      // if(this.searchValue!==''){
      //    tempStudents=tempStudents.filter((student)=>{
      //       return student?.student_id?.toLowerCase().includes(this.searchValue.toLowerCase())
      //    })
      // }
      // return tempStudents
      // }
    },
          created() {
        this.queryObject.academic_year_id = this.acYearId
        this.tvetStudentsPaid(this.queryObject)
    },
    watch:{
      acYearId(newValue){
        this.queryObject.search_id = ''
        this.queryObject.academic_year_id = newValue
        this.tvetStudentsPaid(this.queryObject)
      },
rowNumber(newValue){
  this.queryObject.search_id = ''
  this.queryObject.page = 1
  this.queryObject.per_page = newValue
  this.tvetStudentsPaid(this.queryObject)
}
    },
    methods: {
        tvetStudentsPaid(queryObject){
this.$store.dispatch('cashier/fetchTvetStudentFee',queryObject)
        },
      searchByPadNo(){
        this.queryObject.search_id = this.searchValue
this.tvetStudentsPaid(this.queryObject)
      },
        showDetail(id){
            this.$router.push({name:'TvetFeedetail',params:{id:id}})
        },
        cancelDetailDialog(){
            this.isDetail = false
             document.documentElement.style.overflow = "scroll"
        },
          forWardChivron(){
        this.queryObject.page = this.queryObject.page +1
       this.tvetStudentsPaid(this.queryObject)
      },
      backChivron(){
        this.queryObject.page = this.queryObject.page -1
       this.tvetStudentsPaid(this.queryObject)
      },
      printStudentFee(){
        this.$htmlToPaper('tvetFee')
      },
         searchByStudId(){
        this.queryObject.page = 1
        this.queryObject.search_id = this.searchValue
         this.tvetStudentsPaid(this.queryObject)
      }
    },
}
</script>
<style scoped>
.addbtn{
    background-color: #2f4587;
    color: #fff;
    width: 8em;
    height: 35px;
    vertical-align: middle;
} 
.addbtn:hover{
    background-color:#1e3fa3 ;
}
.searchicon{
  cursor: pointer;
}
.search{
    height: 8px!important;
    padding: 0;
    background-color: #fff;
}
.search input{
    border-right: none;
}
.search span{
    background-color: #fff;
    border-left: none;
}
.search span:hover{
color: rgb(128, 128, 236);
}
.viewdetailbtn{
  border: none;
  background-color: #fff;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  border-radius: 10px;
  width: 100%;
}
.table-header{
    background-color:#4285fa ;
}
th{
  text-align: left;
  padding: 8px;
  border: 1px solid #fff;
  
}
td{
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  vertical-align: top;
}

.chivronbtn{
    border: none;
    background-color: #fff;
    color: rgba(179, 175, 175, 0.849);
}
.active{
  color: rgb(15, 15, 15);
}
</style>
