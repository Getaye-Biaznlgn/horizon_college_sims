<template>
    <base-card>
    <div class="d-flex justify-content-between mt-3">
     <div class="input-group search w-25">
  <input type="text" class="form-control p-2" placeholder="Search By Student Id" aria-label="Username" aria-describedby="addon-wrapping" v-model.trim="searchValue" @keyup.enter="searchByIdNo()">
   <span @click="searchByIdNo()" class="searchicon  input-group-text" id="addon-wrapping"><i class="fas fa-search"></i></span>
</div>
 <div>
<button @click="showDateSelection()" class="btn selectDate py-2">
  <div class="d-flex justify-content-between">
    <span>Select Date</span>
    <span class="ms-5"><i class="fas fa-calendar-alt"></i></span>
  </div>
  </button>
</div>
 <div>
   <div class="mx-3">
<select class="form-select form-select-sm p-2" aria-label="Default select example" v-model="paymentType">
<option value="all">All</option>
<option v-for="payment in paymentTypes" :key="payment.id" :value="payment.name">{{payment.name}}</option>
  </select>
  </div>
</div>
   <div class="d-flex justify-content-end align-items-center">
    <div class="me-3">
   <button @click="addNewPayment" class="paymentbtn btn p-2">Add New Payment</button>
   </div>
       <div>
    <button @click="exportData()" class="btn me-1 addbtn ps-3 py-2 d-flex">
    <span class="me-3"><i class="fas fa-upload"></i></span>
    <span>Export</span>
    </button>
    </div>
   </div>
    </div>
    <div id="paidStuddentList">
      <span class="ms-5 sr-only">{{'students fee payment tabel'}}</span>
     <table class="mt-3" id="studentspaid">
  <thead>
    <tr class="table-header">
      <th class="text-white">NO</th>
       <th class="text-white">Stud ID</th>
      <th class="text-white">Full Name</th>
      <th class="text-white">Paid Date</th>
      <th class="text-white">Payment Type</th>
      <th class="text-white">Pad Number</th>
      <th class="text-white">Amount</th>
    </tr>
  </thead>
  <tbody>

     <tr v-for="(student,index) in filteredStudents" :key="index">
        <td>{{queryObject.per_page*paidStudents.current_page +index+1 - queryObject.per_page }}</td>
      <td>{{student?.student_id}}</td>
      <td>{{student.full_name}}</td>
      <td>{{paidDate(student.paid_date)}}</td>
      <td>{{student.payment_type}}</td>
      <td>{{student.receipt_no}}</td>
      <td>{{student['amount ']}}</td>
    </tr>
  </tbody>
   
</table>
    </div>
<div v-if="paidStudents.data?.length" class="d-flex justify-content-end mt-3 me-5">
<div class="rowsperpage me-3">
Rows per Page
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
{{paidStudents.from+'-'+paidStudents.to+' of '+paidStudents.total+' Rows'}}
</div>
<div class="leftchivron ms-3 me-3">
<button @click="backChivron()" class="chivronbtn" :class="{active:paidStudents.from !== 1}" :disabled="paidStudents.from === 1"><i class="fas fa-chevron-left"></i></button>
</div>
<div class="rightchivron"><button @click="forWardChivron()" class="chivronbtn" :class="{active:paidStudents.to !==paidStudents.total}" :disabled="paidStudents.to ===paidStudents.total"><i class="fas fa-chevron-right"></i></button></div>
</div>
    </base-card>
    <div v-if="isDateSelection" class="datePicker">
    <div class="d-flex bg-white dialogcontent position-relative">
<div v-if="isCustomDate" class="ms-3 mt-3 rangeInput">
 <Datepicker v-model="date" range twoCalendars twoCalendarsSolo  autoApply placeholder="Select Date Range"></Datepicker>
</div>
<div v-if="isSpecificDate" class="align-self-start specificDate">
 <div class="ms-5 mt-5"> <strong>Select Date</strong></div>
  <input type="date" v-model="dateSpecific" class="form-control ms-5 mt-1">

</div>
<div v-if="isIntervalDate" class="knownDate mt-5 ms-5 d-flex align-self-start">
  <div>
  <div> <strong>From</strong></div>
   <input type="text" v-model="dateStart" class="form-control">
</div>
<div>
  <div class="ms-5"> <strong>To</strong></div>
   <input type="text" v-model="dateEnd" class="form-control ms-5">
</div>
 
</div>
<div class="verticalLine"></div>
<div class="mt-5 ms-5 d-flex flex-column">
<button @click="recentDates(1)" class="interval fs-5 p-2 text-center"> Last 24 Hours</button>
<button @click="recentDates(7)" class="interval fs-5 p-2 mt-2 text-center"> Last 7 Days</button>
<button @click="recentDates(30)" class="interval fs-5 p-2 mt-2 text-center"> Last 30 Days</button>
<button @click="specificDate()" class="interval fs-5 p-2 mt-2 text-center"> Search by Specific Date</button>
<button @click="customDate()" class="interval fs-5 p-2 mt-2 text-center" :class="{isActive:isCustomDate}"> Custom Range</button>
<div class="d-flex justify-content-end py-5 mt-5">
   <button @click="cancelPicker()" class="btn cancel me-3">Cancel</button>
  <button @click="applay()" class="btn addbtn">Apply</button>
</div>
</div>
    </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
//import { start } from '@popperjs/core'
export default {
  data() {
    return {
        rowNumber:5,
        paymentType:'all',
        searchValue:'',
        startDate:'',
        endDate:null,
        dateFormat:null,
        isDateSelection:false,
        date:null,
        isCustomDate: true,
        isSpecificDate:false,
        isIntervalDate:false,
        dateStart:'',
        dateEnd:'',
        dateSpecific:'',
        queryObject:{
          page:1,
          per_page:10,
          path:'api/students_paid',
          search_id:'',
          date_between:'',
          payment_type:'',
          date_query:'',
        }
    }
  },
   computed:{
    ...mapGetters('dean',['degreeDepartments','degreePrograms']),
    semesters(){
      return this.$store.getters['registrar/activeYearSemesters']
    },
    degreeStudents(){
     return this.$store.getters['registrar/degreeStudents']
    },
     paidStudents(){
     return this.$store.getters['cashier/paidStudentsLists']
    },
     paymentTypes(){
        return  this.$store.getters['cashier/paymentTypes']
     },
    academicYears(){
        return  this.$store.getters.academicYears
     },
    acYearId(){
        return this.$store.getters.acYearId
     },
      filteredStudents(){
         var tempStudents= this.paidStudents.data
        // var student = this.paidStudents.data
    
      // if(this.searchValue!==''){
      //    tempStudents=tempStudents.filter((student)=>{
      //       return student?.student_id?.toLowerCase().includes(this.searchValue.toLowerCase())
      //    })
      // }

            if(this.paymentType!=='all'){
         tempStudents=tempStudents.filter((student)=>{
            return student?.payment_type===this.paymentType
         })
      }
        
      return tempStudents 
     },
          
  },
  created() {  
    this.queryObject.academic_year_id = this.acYearId
    this.studentsPaid(this.queryObject)
     this.$store.dispatch('cashier/fetchPaymentTypes',this.acYearId)
  },
  watch:{
dateSpecific(newValue){
   this.queryObject.date_query = newValue
},
rowNumber(newValue){
  this.queryObject.per_page = newValue
  this.queryObject.page = 1
  this.studentsPaid(this.queryObject)
},
  acYearId(newValue){
this.$store.dispatch('cashier/fetchPaymentTypes',newValue)
 this.$store.dispatch('cashier/fetchPaymentTypes',newValue)
this.queryObject.academic_year_id = newValue
this.studentsPaid(this.queryObject)
    
    },
  },
      methods: {
        studentsPaid(queryObject){
          this.$store.commit('setIsItemLoading',true)
this.$store.dispatch('cashier/fetchPaidStudents',queryObject).then(()=>{
    this.$store.commit('setIsItemLoading',false)
})
        },
          addNewPayment(){
         this.$router.push({name:'AddNewPayment'})
      },
      async exportData(){
         await this.$htmlToPaper('paidStuddentList');
      },
       searchByIdNo(){
         this.queryObject.page = 1
         this.queryObject.search_id = this.searchValue
          this.studentsPaid(this.queryObject)

 },
      forWardChivron(){
        this.queryObject.page = this.queryObject.page +1
       this.studentsPaid(this.queryObject)
      },
      backChivron(){
        this.queryObject.page = this.queryObject.page -1
       this.studentsPaid(this.queryObject)
      },
      paidDate(dateValue){
var date = new Date(dateValue)
    return date.toString().split(' ').slice(0,4).join(' ')
      },
      showDateSelection(){
        this.isDateSelection = !this.isDateSelection
      },
      cancelPicker(){
        this.isDateSelection = false
      },
      applay(){
        if(this.date?.length){
        var date1 = new Date(this.date[0])
        var date2 = new Date(this.date[1])
        var startDate = date1.getFullYear()+'/'+Number(date1.getMonth())+1+'/'+date1.getDate()
        var endDate = date2.getFullYear()+'/'+Number(date2.getMonth())+1+'/'+date2.getDate()
        this.queryObject.date_between = startDate+','+endDate
        }
        this.studentsPaid(this.queryObject)
        this.isDateSelection = false
        console.log('date range selected =',this.queryObject)
        this.dateStart=''
        this.dateEnd=''
      },
      recentDates(dateValue){
        this.isCustomDate = false
        this.isSpecificDate = false
        this.isIntervalDate = true
         var d1 = new Date()
       this.dateEnd = d1.getFullYear()+'/'+(Number(d1.getMonth())+1)+'/'+d1.getDate()
       var d2 = new Date(Date.now() - (dateValue * 24 * 60 * 60 * 1000)) 
       this.dateStart = d2.getFullYear()+'/'+(Number(d2.getMonth())+1)+'/'+d2.getDate()
       this.queryObject.date_between = this.dateStart+','+this.dateEnd
       console.log(this.queryObject.date_between)
       this.queryObject.date_query = ''
      },
      specificDate(){
        this.isCustomDate = false
        this.isIntervalDate = false
        this.isSpecificDate = true
        this.queryObject.date_between = ''

      },
      customDate(){
        this.isSpecificDate = false
        this.isIntervalDate = false
        this.isCustomDate = true
        this.queryObject.date_query = ''
      }

    }
}
</script>
<style scoped>
 .paymentbtn{
    background-color: #2f4587;
    color: #fff;
    width: 12em;
    vertical-align: middle;
} 
.paymentbtn:hover{
    background-color:#366ad9 ;
}
.addbtn{
    background-color: #2f4587;
    color: #fff;
    width: 8em;
    vertical-align: middle;
} 
.addbtn:hover{
    background-color:#366ad9 ;
}
.cancel{
  width: 8em;
  border: 1px solid rgb(211, 209, 209);
  background-color: #fff
}
.cancel:hover{
  background-color: rgb(194, 196, 199);
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
.table-header{
    background-color:#366ad9 ;
    border-radius: 5px;
}
th{
  text-align: left;
  padding: 8px;
  
}
td{
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  vertical-align: top;
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
    box-shadow: none !important;
}
.search span{
    background-color: #fff;
    border-left: none;
}
.search span:hover{
color: rgb(128, 128, 236);
}
.chivronbtn{
    border: none;
    background-color: #fff;
    color: rgba(179, 175, 175, 0.849);
}
.active{
  color: rgb(15, 15, 15);
}
.selectDate{
  box-shadow: none!important;
  border: 1px solid lavender;
  width: 13em;
}
.interval{
  border: none;
  margin-left: 10%;
  background-color: #fff;
}
.interval:hover,.interval:focus{
background-color: #f5f6fa;
color: #2f4587;
}
.datePicker{
 position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh!important;
    background-color: rgba(17, 17, 17, 0.5);
    z-index: 1000;
}
.dialogcontent{
   width: 70%;
   margin: auto;
   margin-top: 5%;
   margin-bottom: 5%;
   height: 80vh;
   overflow-y: auto;
}
.verticalLine{
            border-left: 3px solid rgb(15, 15, 15);
            position:absolute; 
            left: 65%; 
            top: 0;
            height: 100%;
            /* margin-top: 5%; */
} 
.rangeInput,.specificDate,.knownDate{
  width: 60%;
}
.specificDate input{
  width: 70%;
}
.knownDate input{
  width: 100%;
}
.isActive{
  background-color: #f5f6fa;
}
</style>