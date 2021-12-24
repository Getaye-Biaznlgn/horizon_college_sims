<template>
<base-card>
<div class="pb-5 mb-5">
    <div class="feetype d-flex ms-3 mt-3">
    <button @click="tuitionFeeType" class="btn tuition me-0" :class="{tuitionfee:isTuitionFee}">Tuition Type</button>
    <button @click="otherFeeType" class="btn other ms-0" :class="{otherFee:isOtherFee}">Other Payment</button>
    </div>
<div v-if="isTuitionFee">
    <div class="row mt-3 align-items-center ms-3 me-3">
    <div class="calender col-sm-3 me-5">
    <span class="mt-3">Academic Years</span>
    <select class="form-select form-select-sm mt-1" aria-label=".form-select-sm example" ref="acYearId">
  <option v-for="calender in calenders" :key="calender.id" :value="calender.id">{{calender.year}}</option>
</select>
    </div>
    <div class="studenttype col-sm-3 ms-3 me-5">
    <span class="mt-3 mb-3">Student Type</span>
    <select class="form-select form-select-sm mt-1" aria-label=".form-select-sm example" v-model="student_type" @change="studentType($event)">
  <option selected value="degree"><strong>Degree</strong></option>
  <option value="tvet"><strong>TVET</strong></option>
</select>
    </div>
    <div class="mt-2 ms-auto me-3 search">
     <span>Student ID</span>
    <div class="input-group input-group-sm mt-1 searchdiv">
  <input type="text" class="form-control searchinput" aria-label="Sizing example input" placeholder="Student ID" aria-describedby="inputGroup-sizing-sm" v-model="studId" @keyup.enter="searchStudentById()">
  <span @click="searchStudentById()" class="input-group-text searchbtn" id="inputGroup-sizing-sm">Search</span>
</div>
    </div>
    </div>
    <!-- degree student payment tabel -->
    <div v-if="student_type === 'degree' && studentFeelists.full_name?.length">
    <div class="d-flex justify-content-between mt-4">
    <div class="nameanid ms-5">
    <div class="d-flex">
    <span>Full Name: </span>
    <span>{{studentFeelists.full_name}}</span>
    </div>
    <div class="d-flex mt-3">
     <span>ID NO: </span>
    <span>{{studentFeelists.student_id}}</span>
    </div>
    </div>
    <div class="deptandprogram me-5">
    <div class="d-flex">
    <span>Department: </span>
    <span>{{studentFeelists.department}}</span>
    </div>
    <div class="d-flex mt-3">
    <span>Program: </span>
    <span>{{studentFeelists.program}}</span>
    </div>
    </div>
    </div>
    <div class="d-flex mt-3">
    <div v-if="studentFeelists.cp?.length" class="d-flex">
    <div v-for="paidbycp in studentFeelists?.cp" :key="paidbycp.id" class="roundtabel ms-5 mt-3 me-5">
    <table class="cptabel">
  <thead>
    <tr class="table-header">
      <th class="text-white text-center" colspan="3">{{'Year '+studentFeelists.year_no+' Semester '+paidbycp.semester_no}}</th>
    </tr>
      <tr class="table-header">
      <th class="text-white">Pad No</th>
      <th class="text-white">Amount</th>
      <th class="text-white">Total</th>
      </tr>
      </thead>
  <tbody>
  <tr>
  <td>{{paidbycp?.pad}}</td>
  <td>{{paidbycp?.total}}</td>
  <td>{{paidbycp?.total}}</td>
  </tr>
  <tr>
  <td colspan="3">
  <div class="d-flex justify-content-between mt-3">
  <span class="mt-2">Paid by CP</span>
  <button disabled class="btn completed mt-1">Paid</button>
  </div>
  </td>
  </tr>
  </tbody>
    </table>
    </div>
    </div>
    <div v-if="studentFeelists.semesters?.length" class="d-flex">
    <div v-for="semesters in studentFeelists.semesters" :key="semesters.id" class="mt-3  ms-4 roundtabel">
     <table class="monthtable">
  <thead>
    <tr class="table-header">
      <th class="text-white text-center" :colspan="semesters.months.length+1">{{'Year '+studentFeelists.year_no+' Semester '+semesters.semester_no}}</th>
    </tr>
     <tr class="table-header">
      <th class="text-white text-center" :colspan="semesters.months.length">Months</th>
      <th class="text-white text-center" rowspan="2">Total</th>
    </tr>
      <tr class="table-header">
      <th v-for="month in semesters.months" :key="month.id" class="text-white text-center">{{month.name.slice(0,3)}}</th>
      </tr>
  </thead>
  <tr>
  <td v-for="(padNo,index) in semesters.months" :key="index" class="text-center">{{padNo.pad}}</td>
  <td>{{semesters.total}}</td>
  </tr>
  <tr>
  <td :colspan="semesters.months.length+1">
  <div class="d-flex justify-content-between">
  <span>Paid by Month</span>
  <button @click="selectPaymentType(studentFeelists.month_payment,semesters.semester_payment,semesters.id,semesters.months,studentFeelists.id)" class="btn completed  mt-1 ms-auto" :disabled="isFullPaid" :class="{paybtn:!isFullPaid}">Pay</button>
  </div>
  </td>
  </tr>
    </table>
    </div>
    </div>
    </div>
    </div>
    <!-- TVET student payment -->
     <div v-if="student_type === 'tvet' && studentFeelists.full_name?.length">
    <div class="d-flex justify-content-between mt-4">
    <div class="nameanid ms-5">
    <div class="d-flex">
    <span><strong>Full Name:</strong> </span>
    <span>{{studentFeelists.full_name}}</span>
    </div>
    <div class="d-flex mt-3">
     <span><strong>ID NO: </strong></span>
    <span>{{studentFeelists.student_id}}</span>
    </div>
    </div>
    <div class="deptandprogram me-5">
    <div class="d-flex">
    <span><strong>Department : </strong></span>
    <span>{{studentFeelists.department}}</span>
    </div>
    <div class="d-flex mt-3">
    <span><strong>Program : </strong></span>
    <span>{{studentFeelists.program}}</span>
    </div>
    </div>
    </div>
    <div class="mt-3 monthtabel roundtabel">
     <table class="w-100">
  <thead>
    <tr class="table-header">
      <th class="text-white text-center" :colspan="studentFeelists.months.length">Months</th>
      <th class="text-white text-center" rowspan="2">Total</th>
    </tr>
      <tr class="table-header">
        <td v-for="month in studentFeelists.months" :key="month.id" class="text-white">{{month.name.slice(0,3)}}</td>
      </tr>
  </thead>
  <tbody>
  <tr>
  <td v-for="month in studentFeelists.months" :key="month.id">{{month.pad}}</td>
  <td>{{studentFeelists.total}}</td>
  </tr>
  <tr>
  <td :colspan="studentFeelists.months.length">
  <div class="d-flex justify-content-end py-2">
  <button @click="tvetPayment(studentFeelists.month_payment,studentFeelists.id,studentFeelists.months)" class="btn paybtn mt-1 me-3">Pay</button>
  </div>
  </td>
  </tr>
  </tbody>
    </table>
    </div>
     </div>
    </div>
    <div v-if="isOtherFee" class="mt-4">
    <div class="row mt-3 align-items-center ms-3 me-3">
     <div class="studenttype col-sm-3 ms-3 me-5">
    <span class="mt-3 mb-3">Student Type</span>
    <select class="form-select form-select-sm mt-1" aria-label=".form-select-sm example" v-model="student_type">
  <option selected value="degree"><strong>Degree</strong></option>
  <option value="tvet"><strong>TVET</strong></option>
</select>
    </div>
    <div class="calender col-sm-3 me-5">
    <span class="mt-3">Fee Type</span>
    <select class="form-select form-select-sm mt-1" aria-label=".form-select-sm example" v-model="paymentTypeId">
  <option v-for="feeType in paymentTypes" :key="feeType.id" :value="feeType.id">{{feeType.name}}</option>
</select>
    </div>
    <div class="mt-2 ms-auto me-3 search">
     <span>Pad Number</span>
    <div class="mt-1">
  <input type="text" class="form-control form-control-sm" aria-label="Sizing example input" placeholder="Ex 134" v-model="padNumber">
</div>
    </div>
    <div class="d-flex align-items-center">
    <div class="form-group mt-4 mb-3 me-5 w-25">
<label for="otherpayeddate" class="form-label">Paid Date</label>
<input class="form-control form-control-sm" type="date" id="otherpayeddate" aria-label=".form-control-sm example" v-model="paidDate">
</div>
<div class="form-group ms-5 me-5">
<label for="idno" class="form-label">Student ID</label>
<input class="form-control form-control-sm" type="text" id="idno" placeholder="Ex HCR1013" aria-label=".form-control-sm example" v-model="studId">
</div>
    <div class="d-flex justify-content-end mt-5 ms-5">
    <button @click="otherPayment()" class="btn addbtn me-3 p-1">PAY</button>
    </div>
    </div>
     <div class="d-flex mt-3 ms-2">
    <span><strong>Amount:-</strong> </span>
    <span>{{otherFeeAmount}}</span>
    </div>

    </div>
     <p class=" mt-5 text-center" :class="{success:isSuccessed,faild:isFaild}">{{resultNotifier}}</p>
    </div>
    </div>
</base-card>
<!-- payment form -->
<div v-if="newPayment" class="editwraper">
<div class="dialogcontent">
<base-card>
<div class="p-2"> Select Payment Method</div>
<div class="paymenttype d-flex mt-2 p-1">
<div class="form-check me-5">
  <input class="form-check-input" type="radio" name="paymenttype" value="monthly" id="monthly" v-model="paymentType">
  <label class="form-check-label" for="monthly">
    Monthly
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="paymenttype" value="cp" id="cp" v-model="paymentType">
  <label class="form-check-label" for="cp">
    CP
  </label>
</div>
</div>
<div v-if="paymentType === 'cp'" class="pb-3">
<div class="d-flex mt-4">
<span>Amount:</span>
<span class="ms-3"><strong>{{monthlyPayment*monthsIds.length}}</strong></span>
</div>
<div class="form-group mt-4 mb-3">
<label for="padno" class="form-label">Pad Number</label>
<input class="form-control form-control-sm" type="text" id="padno" placeholder="Ex 1034" aria-label=".form-control-sm example" v-model="padNumber">
</div>
<div class="form-group mt-4 mb-3">
<label for="paiddate" class="form-label">Paid Date</label>
<input class="form-control form-control-sm" type="date" id="paiddate" aria-label=".form-control-sm example" v-model="paidDate">
</div>
<div class="d-flex justify-content-between mt-5">
<button @click="cancelPaymentDialog()" class="btn cancelbtn optionbtn py-1">CANCEL</button>
<button @click="payByCp()" class="btn optionbtn paybtn py-1">PAY</button>
</div>
</div>
<div v-else-if="paymentType === 'monthly'">
<span class="mt-1">Select Month</span>
<div class="d-flex justify-content-between px-3">
<div class="ms-2">
<div class="d-flex ">
<div class="me-5">
<div v-for="month in academicMonths.slice(0,6)" :key="month.id" class="form-check">
  <input class="form-check-input" type="checkbox" :disabled="month.pad" :value="month.id" :id="month.id" v-model="monthsIds">
  <label class="form-check-label" :for="month.id">
      {{month.name}}
  </label>
</div>
</div>
<div class="ms-5">
<div v-for="month in academicMonths.slice(6,academicMonths.length+1)" :key="month.id" class="form-check">
  <input class="form-check-input" type="checkbox" :disabled="month.pad" :value="month.id" :id="month.id" v-model="monthsIds">
  <label class="form-check-label" :for="month.id">
      {{month.name}}
  </label>
</div>
</div>
</div>
</div>
</div>
<div class="d-flex">
<span>Amount:</span>
<span class="ms-3"><strong>{{monthlyPayment*monthsIds.length}}</strong></span>
</div>
<div class="form-group mb-3">
<label for="padno" class="form-label">Pad Number</label>
<input class="form-control form-control-sm" type="text" id="padno" placeholder="Ex 1034" aria-label=".form-control-sm example" v-model="padNumber">
</div>
<div class="form-group mb-3">
<label for="datepaid" class="form-label">Paid Date</label>
<input class="form-control form-control-sm" type="date" id="datepaid" placeholder="Ex 1034" aria-label=".form-control-sm example" v-model="paidDate">
</div>
<div class="d-flex justify-content-between mt-3">
<button @click="cancelPaymentDialog()" class="btn cancelbtn optionbtn py-1">CANCEL</button>
<button @click="payByMonth()" class="btn optionbtn paybtn py-1">PAY</button>
</div>
</div>
</base-card>
</div>
</div>
</template>
<script>
import apiClient from '../../../store/baseUrl'
export default {
    data() {
        return {
            isTuitionFee:true,
            isOtherFee:false,
            newPayment:false,
            paymentType:'cp',
            padNumber:'',
            monthsIds:[],
            studId:null,
            student_type:'degree',
            monthlyPayment:'',
            semesterPayment:'',
            semester_id:'',
            activeACyear:'',
            semesterMonths:[],
            paidDate:null,
            student_id:null,
            isFullPaid:false,
            isLoading:false,
           isSuccessed:true,
           isFaild:false,
           resultNotifier:'',
           otherFeeAmount:null,
           paymentTypeId:null
        }
    },
    computed:{
      studentFeelists(){
       return this.$store.getters['cashier/studentFeelists']
      },
      calenders(){
        return  this.$store.getters['cashier/calenders']
      },
      academicMonths(){
        return this.semesterMonths
      },
       paymentTypes(){
          return  this.$store.getters['cashier/paymentTypes']
          },
typeOfPayment(){
    var selctedPayment = this.paymentTypes.filter((payment)=>{
          return this.paymentTypeId === payment.id
        })
        console.log('payment valu='+selctedPayment[0].amount)
        return selctedPayment[0]?.amount
    
},
    },
    created() {
      this.otherFeeAmount = this.paymentTypes[0]?.amount
      this.paymentTypeId = this.paymentTypes[0]?.id
    },
    watch:{
      paymentTypeId(newValue){
        var selctedId = this.paymentTypes.filter((payment)=>{
          return newValue === payment.id
        })
        this.otherFeeAmount = selctedId[0]?.amount
    console.log(this.otherFeeAmount)

      }
    },
    
    methods: {
        tuitionFeeType(){
            this.isTuitionFee = true
            this.isOtherFee = false
        },
         otherFeeType(){
            this.isTuitionFee = false
            this.isOtherFee = true
        },
        async searchStudentById(){
          var student = {};
          student.id = this.studId
          student.type = this.student_type
          student.academic_year_id = this.$refs.acYearId.value
          await this.$store.dispatch('cashier/fetchStudentFeelist',student)
        },
         tvetPayment(monthlyPayment,studId,months){
          this.monthlyPayment = monthlyPayment
          this.activeACyear = this.$refs.acYearId.value
          this.student_id = studId,
          this.semesterMonths = months
          console.log('monthly payment = '+monthlyPayment+' student id= '+studId)
          console.log('academic months')
          console.log(this.semesterMonths)
         
          document.documentElement.style.overflow = "hidden"
           this.newPayment = true
                   
        },
        selectPaymentType(monthlyPayment,semesterValue,semesterId,semestermonths,studId){
          this.monthlyPayment = monthlyPayment
          this.semesterPayment = (semesterValue * semestermonths.length)
          this.semester_id = semesterId
          this.semesterMonths = semestermonths
          this.activeACyear = this.$refs.acYearId.value
          this.student_id = studId
           var completed =[]
           semestermonths.forEach(month=>{
             if(month.pad === null){
               completed.push(month)
             }
           })
           console.log('is completed ')
           console.log(completed)
           if(completed.length > 0){
             this.isFullPaid = false
           }
           else{
             this.isFullPaid = true
           }
          document.documentElement.style.overflow = "hidden"
           this.newPayment = true
                   
        },
        cancelPaymentDialog(){
           this.newPayment = false
            document.documentElement.style.overflow = "scroll"
        },
        payByMonth(){
           var studentFee = {};
          studentFee.receipt_no = this.padNumber
         studentFee.tuition_type = this.paymentType
         studentFee.academic_year_id = this.activeACyear
         studentFee.semester_id = this.semester_id
         studentFee.months = this.monthsIds
         studentFee.paid_date = this.paidDate
         studentFee.id = this.student_id
         studentFee.student_type = this.student_type
         studentFee.amount = this.monthlyPayment*this.monthsIds.length
         console.log('student fee data')
         console.log(studentFee)
          this.$store.dispatch('cashier/addNewStudentFee',studentFee).then(()=>{
            var student = {};
            student.id = this.student_id
              student.type = this.student_type
          student.academic_year_id = this.$refs.acYearId.value
          this.$store.dispatch('cashier/fetchStudentFeelist',student).then(()=>{
            this.semesterMonths.forEach((month)=>{
    document.getElementById(month.id).checked = false
            })
          })
          })
        },
        payByCp(){
          var studentFee = {};
          studentFee.receipt_no = this.padNumber
         studentFee.tuition_type = this.paymentType
         studentFee.academic_year_id = this.activeACyear
         studentFee.semester_id = this.semester_id
         studentFee.id = this.student_id
         studentFee.paid_date = this.paidDate
         studentFee.amount = this.semesterPayment
         console.log('student fee datas')
         console.log(studentFee)
          this.$store.dispatch('cashier/addNewStudentFee',studentFee).then(()=>{
            var student = {};
            student.id = this.student_id
              student.type = this.student_type
          student.academic_year_id = this.activeACyear
          this.$store.dispatch('cashier/fetchStudentFeelist',student)
          })
        },
       async  otherPayment(){
         this.isLoading = true
          var studentFee={}
          studentFee.student_id = this.studId
          studentFee.receipt_no = this.padNumber
          studentFee.student_type = this.student_type
          studentFee.amount = this.otherFeeAmount
          studentFee.paid_date = this.paidDate
          console.log(studentFee)
          try{
            var response = await apiClient.post('/api/add_other_payment',studentFee)
            if(response.status === 200){
              console.log(response.data)
               this.isFaild = false
           this.isSuccessed = true
           this.resultNotifier = 'Your payment is succesfully done'          
          
            }
            else{
              console.log('form faild validation ')
            }
          }
          catch(e){
                this.isFaild = true
           this.isSuccessed = false
            this.resultNotifier = 'some thing went wrong'
          }
          finally{
            this.isLoading = false
          }
        },
        changeValue(event){
        this.otherFeeAmount = this.paymentTypes.find(payment=>{
        return event.target.value === payment.id
          })

        }
        
    },
}
</script>
<style scoped>
.tuition,.other{
    background-color: #ecf1fe;
    color: #000;
    width: 20em;
    box-shadow: none !important;
    vertical-align: middle;
} 
.btn{
  background-color: #ecf1fe;
    color: #000;
}
.completed{
  width: 4em;
  padding: 0;
   background-color: #ecf1fe;
    color: #000;
}
.paybtn{
  width: 4em;
  padding: 0;
  background-color:#366ad9 ;
  color: #fff;
}
.paybtn:hover{
 background-color:#1142ac ;
 
}
.addbtn{
  width: 7em;
background-color:#366ad9 ;
  color: #fff;
}
.addbtn:hover{
  background-color:#1142ac ;
}
.tuition{
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}
.other{
     border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}
.tuitionfee{
background-color:#366ad9 ;
color: #fff;
}
.otherFee{
  background-color:#366ad9 ; 
  color: #fff; 
}
.searchinput{
   box-shadow: none !important;
}
.cppaid,.monthlypaid{
   background-color:#366ad9 ; 
  color: #fff; 
}
.search{
    width: 30%;
}
.searchbtn{
    cursor: pointer;
}
.searchdiv:focus{
  border: 1px solid gray;
  border-radius: 5px;
}
.searchbtn:hover{
    background-color: rgb(82, 82, 192);
    color: #fff;
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
  padding: 8px;
  border: 1px solid #fff;
  
}
td{
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  vertical-align: top;
}
.roundtabel{
  width: 100%;
  border: 1px solid #dddddd;
  border-radius: 13px;
  overflow: hidden;
}
.monthtable{
  width: 100%;
  height: 100%;
}
.cptabel{
  width: 100%;
  height: 100%;
}
.editwraper{
 position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh!important;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
}
.dialogcontent{
   width: 35%;
   margin: auto;
   margin-top: 2%;
   height: 90vh;
   overflow-y: scroll;
}
.cancelbtn{
  background-color: #fff;
  border: 1px solid rgb(172, 167, 167);
}
.optionbtn{
  width: 7em;
}
.success{
    color: green;
  }
  .faild{
    color: red;
  }
</style>