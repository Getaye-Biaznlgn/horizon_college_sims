<template>
<base-card>
<span @click="back()" class="backarrow ms-3 mt-2"><i class="fas fa-arrow-left"></i>Back</span>
<div class="pb-5 mb-5 mt-3">
    <div class="feetype d-flex ms-3 mt-3">
    <button @click="tuitionFeeType" class="btn tuition me-0" :class="{tuitionfee:isTuitionFee}">Tuition Type</button>
    <button @click="otherFeeType" class="btn other ms-0" :class="{otherFee:isOtherFee}">Other Payment</button>
    </div>
<div v-if="isTuitionFee">
    <div class="row mt-3 align-items-center ms-3 me-3">
    <div class="calender col-sm-3 me-5">
    <span class="mt-3">Academic Years</span>
    <select class="form-select mt-1" aria-label=".form-select-sm example" ref="acYearId">
  <option v-for="calender in academicYears" :key="calender.id" :value="calender.id">{{calender.year}}</option>
</select>
    </div>
    <div class="studenttype col-sm-3 ms-3 me-5">
    <span class="mt-3 mb-3">Student Type</span>
    <select class="form-select mt-1" aria-label=".form-select-sm example" v-model="student_type">
  <option selected value="degree"><strong>Degree</strong></option>
  <option value="tvet"><strong>TVET</strong></option>
</select>
    </div>
    <div class="mt-2 ms-auto me-3 search">
     <span>Student ID</span>
    <div class="input-group mt-1 searchdiv" :class="{error:lengthValue}">
  <input type="text" class="form-control searchinput" aria-label="Sizing example input" placeholder="Student ID" aria-describedby="inputGroup-sizing-sm" v-model="studId" @keyup.enter="searchStudentById()" @input="checkLengthId($event)">
  <span @click="searchStudentById()" class="input-group-text searchbtn" id="inputGroup-sizing-sm">
        <span v-if="isChecking"><span  class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Searching</span>      
            <span v-else>Search</span>
    </span>
    <span v-if="lengthValue" class="errorMsg"> The maximum ID length should be 12 Characters</span>
</div>
    </div>
    </div>
    <!-- degree student payment tabel -->
    <div v-if="studentFeelists.type === 'degree' && studentFeelists.semesters?.length">
    <div class="d-flex justify-content-between mt-4">
    <div class="nameanid ms-5">
    <div class="d-flex">
    <span><strong>Full Name</strong> : </span>
    <span>{{studentFeelists.full_name}}</span>
    </div>
    <div class="d-flex mt-3">
     <span><strong>ID NO</strong> : </span>
    <span>{{studentFeelists.student_id}}</span>
    </div>
    </div>
    <div class="deptandprogram me-5">
    <div class="d-flex">
    <span><strong>Department</strong> : </span>
    <span>{{studentFeelists.department}}</span>
    </div>
    <div class="d-flex mt-3">
    <span><strong>Program</strong> : </span>
    <span> {{ studentFeelists.program}}</span>
    </div>
    </div>
    </div>
    <div v-if="studentFeelists.semesters?.length" class="d-flex mt-3 px-1">
    <div v-for="semesters in studentFeelists.semesters" :key="semesters.id" class="me-3 flex-fill roundtabel px-0">
     <table class="monthtable">
  <thead>
    <tr class="table-header">
      <th class="text-white text-center" :colspan="semesters.months.length + 1">{{' Year '+studentFeelists.year_no+' '+ 'Semester '+semesters.semester_no}}</th>
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
  <button @click="selectPaymentType(studentFeelists,semesters)" class="btn completed  mt-1 ms-auto" :disabled="!isFullPaidSemester(semesters.months)" :class="{paybtn:isFullPaidSemester(semesters.months)}">Pay</button>
  </div>
  </td>
  </tr>
    </table>
    </div>
    </div>
    </div>
    <div v-if="isEmpty && !studentFeelists.semesters?.length && !studentFeelists.months?.length && studId.length" class="text-center mt-5 notFound">
      <span>{{student_type+' '}}Student with ID number{{' '+studId}} Not found </span>
    </div>
    <!-- TVET student payment -->
     <div v-if="studentFeelists.type === 'tvet' && studentFeelists.months?.length">
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
      <th class="text-white text-center" :colspan="studentFeelists.months?.length">Months</th>
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
  <td :colspan="studentFeelists.months?.length">
  <div class="d-flex justify-content-end py-2">
  <button @click="tvetPayment(studentFeelists)" class="btn paybtn mt-1 me-3">Pay</button>
  </div>
  </td>
  </tr>
  </tbody>
    </table>
    </div>
     </div>
    </div>
    <div v-if="isOtherFee" class="mt-4 px-3">
    <div class="row">
     <div class="col-lg-4">
    <span>Student Type</span>
    <select class="form-select mt-1" aria-label=".form-select-sm example" v-model="student_type">
  <option selected value="degree"><strong>Degree</strong></option>
  <option value="tvet"><strong>TVET</strong></option>
</select>
    </div>
    <div class="col-lg-4">
    <span>Fee Type</span>
    <select class="form-select mt-1" aria-label=".form-select-sm example" v-model="paymentTypeId">
  <option v-for="feeType in otherPaymentTypes" :key="feeType.id" :value="feeType.id">{{feeType.name}}</option>
</select>
    </div>
    <div class="col-lg-4">
     <span>Pad Number</span>
  <input type="text" class="form-control" aria-label="Sizing example input" placeholder="Ex 134" v-model="receiptNumber">
  <span v-if="isPadFieldEmpty && receiptNumber === ''" class="errorMsg">Pad number is required</span>
</div>
    </div>
    <div class="row mt-lg-5">
    <div class="col-lg-4">
<label for="otherpayeddate" class="form-label">Paid Date</label>
<input class="form-control" type="date" id="otherpayeddate" aria-label=".form-control-sm example" v-model="otherPaidDate">
 <span v-if="isDateFieldEmpty && otherPaidDate === ''" class="errorMsg mt-1">Please select paid date</span>
</div>
<div class="col-lg-4 me-5" :class="{warning:idLength}">
<label for="idno" class="form-label">Student ID</label>
<input class="form-control" type="text" id="idno" placeholder="Ex HCR1013" aria-label=".form-control-sm example" v-model="otherStudId" @input="checkIdLength($event)">
<span v-if="isIdFieldEmpty && otherStudId === ''" class="errorMsg mt-1">Student ID number is required, </span>
<span v-if="idLength" class="errorMsg"> The maximum ID length should be 12 Characters</span>
</div> 
    <div class="col-1 ms-5 mt-4 pt-2">
    <button @click="otherPayment()" class="btn addbtn me-3 p-1"><span v-if="isLoading" class="btn  py-1">
 <span  class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>PAYING</span>      
  <span v-else>PAY</span>
    </button>
    </div>
    </div>
     <div class="d-flex mt-3 ms-2">
    <span><strong>Amount:-</strong> </span>
    <span>{{otherFeeAmount}}</span>
    </div>

    </div>
     <p class=" mt-5 text-center" :class="{success:isSuccessed,faild:isFaild}">{{resultNotifier}}</p>
    </div>
</base-card>
<!-- payment form -->
<div v-if="newPayment" class="editwraper">
<div class="dialogcontent">
<base-card>
<div v-if="studentFeelists.type === 'degree'">
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
</div>
<div class="paymentForm">
<span class="mt-1">Select Month</span>
<div class="d-flex justify-content-between ms-2 px-3">
<div class="me-4">
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
<span class="error-msg mt-1 ms-5" :class="{checkmonth:v$.monthsIds.$error}"  v-for="(error, index) of v$.monthsIds.$errors" :key="index">{{ error.$message}}</span>
<div class="d-flex mt-3">
<span>Amount:</span>
<div v-if="paymentType === 'monthly'">
<span class="ms-3"><strong>{{monthlyPayment*monthsIds.length}}</strong></span>
</div>
<div v-else-if="paymentType === 'cp'">
<span class="ms-3"><strong>{{semesterPayment*monthsIds.length}}</strong></span>
</div>
</div>
<div class="form-group mb-3 mt-4" :class="{warining:v$.padNumber.$error}">
<label for="padno" class="form-label">Pad Number</label>
<input class="form-control form-control-sm" type="text" id="padno" placeholder="Eg 1034" aria-label=".form-control-sm example" v-model="padNumber">
 <span class="error-msg mt-1"  v-for="(error, index) of v$.padNumber.$errors" :key="index">{{ error.$message}}</span>
</div>
<div class="form-group mb-3 mt-4" :class="{warining:v$.paidDate.$error}">
<label for="datepaid" class="form-label">Paid Date</label>
<input class="form-control form-control-sm" type="date" id="datepaid" placeholder="Eg 1034" aria-label=".form-control-sm example" v-model="paidDate">
 <span class="error-msg mt-1"  v-for="(error, index) of v$.paidDate.$errors" :key="index">{{ error.$message}}</span>
</div>
 <p class=" mt-3 text-center" :class="{success:isSuccessed,faild:isFaild}">{{resultNotifier}}</p>
<div class="d-flex justify-content-between mt-5">
<button @click="cancelPaymentDialog()" class="btn cancelbtn  py-1">CANCEL</button>
   <button  @click="payByMonth()" class="btn paybtn p-1">
  <span v-if="isLoading">
               <span  class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
               PAYING
            </span>      
            <span v-else>PAY</span> 
  </button>
</div>
</div>
</base-card>
</div>
</div>
</template>
<script>

import useValidate from '@vuelidate/core'
import { required,helpers} from '@vuelidate/validators'
import apiClient from '../../../resources/baseUrl'
export default {
    data() {
        return {
          v$:useValidate(),
            isTuitionFee:true,
            isOtherFee:false,
            newPayment:false,
            paymentType:'monthly',
            padNumber:'',
            monthsIds:[],
            studId:null,
            student_type:'tvet',
            monthlyPayment:'',
            semesterPayment:'',
            semester_id:'',
            activeACyear:'',
            semesterMonths:[],
            paidDate:null,
            student_id:null,
            isLoading:false,
           isSuccessed:true,
           isFaild:false,
           isChecking:false,
           isEmpty:false,
           resultNotifier:'',
           otherPaidDate:'',
           receiptNumber:'',
           otherStudId:'',
           otherFeeAmount:null,
           paymentTypeId:null,
           searchResultNotifier:'',
           isPadFieldEmpty:false,
           isIdFieldEmpty:false,
           isDateFieldEmpty:false,
           idLength:false,
           lengthValue:false

        }
    },
    validations(){
      return{
        padNumber:{required:helpers.withMessage('please enter Pad number',required)},
        paidDate:{required:helpers.withMessage('please enter Paid Date',required)},
        monthsIds:{required:helpers.withMessage('please check paid months',required)},        
      }
    },
    computed:{
      studentFeelists(){
       return this.$store.getters['cashier/studentFeelists']
      },
      academicYears(){
        return  this.$store.getters.academicYears
      },
      academicMonths(){
        return this.semesterMonths
      },
       paymentTypes(){
          return  this.$store.getters['cashier/paymentTypes']
          },
          otherPaymentTypes(){
            var paymentTypes = this.paymentTypes.filter(payment=>{
              return (payment.name !== 'Monthly Fee' && payment.name !== 'CP Fee')
            })
            return paymentTypes
          },
          acYearId(){
            return this.$store.getters.acYearId
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
       this.$store.dispatch('cashier/fetchPaymentTypes',this.acYearId)
    },
    watch:{
      paymentTypes(){
         this.otherFeeAmount = this.paymentTypes[0]?.amount
      this.paymentTypeId = this.paymentTypes[0]?.id
      },
      paymentTypeId(newValue){
        var selctedId = this.paymentTypes.filter((payment)=>{
          return newValue === payment.id
        })
        this.otherFeeAmount = selctedId[0]?.amount
    console.log(this.otherFeeAmount)

      },
      acYearId(newValue){
        this.$store.dispatch('cashier/fetchPaymentTypes',newValue)
      },
      student_type(){
        this.isEmpty = false
      }
    },
    
    methods: {
      back(){
        this.$router.back()
      },
      checkIdLength(event){
        if(event.target.value.trim().length !== 12 &&  event.target.value !== ''){
          this.idLength = true
        }
        else{
          this.idLength = false
        }
      },
       checkLengthId(event){
        if(event.target.value.trim().length !== 12 &&  event.target.value !== ''){
          this.lengthValue = true
        }
        else{
          this.lengthValue = false
        }
      },
        tuitionFeeType(){
            this.isTuitionFee = true
            this.isOtherFee = false
        },
         otherFeeType(){
            this.isTuitionFee = false
            this.isOtherFee = true
        },
        async searchStudentById(){
          if(!this.lengthValue && this.studId?.length){
           this.isChecking = true
          this.isEmpty = false
          var student = {};
          student.id = this.studId
          student.type = this.student_type
          student.academic_year_id = this.$refs.acYearId.value
          try{
          await this.$store.dispatch('cashier/fetchStudentFeelist',student).then((response)=>{
            if(response.status === 200){
              this.isEmpty = true
            }
          })
          .catch(()=>{
            this.isChecking=false
            this.isEmpty = true
          })
          }
          finally{
            this.isChecking = false
          }
          }
        },
         tvetPayment(studentFeelists){
          this.monthlyPayment = studentFeelists.month_payment
          this.activeACyear = this.$refs.acYearId.value
          this.student_id = studentFeelists.id
          this.semesterMonths = studentFeelists.months
           this.newPayment = true
                   
        },
        selectPaymentType(studentFeelists,semesters){
           this.resultNotifier = ''
          this.monthlyPayment =  studentFeelists.month_payment
          this.semesterPayment = semesters.monthly_cp_fee 
          this.semester_id = semesters.id
          this.semesterMonths = semesters.months
          this.activeACyear = this.$refs.acYearId.value
          this.student_id = studentFeelists.id
           this.newPayment = true
          
                   
        },
        isFullPaidSemester(semestermonths){
          var isComplet = false
        semestermonths.forEach(month=>{
             if(month.pad === null){
             isComplet=true
             return
             }
           })
           return isComplet
        },
        cancelPaymentDialog(){
           this.newPayment = false
           this.resetValue()
        },
       async payByMonth(){
           this.v$.$validate()
           if(!this.v$.$error){
             this.isLoading = true
              var studentFee = {};
          studentFee.receipt_no = this.padNumber
         studentFee.tuition_type = this.paymentType
         studentFee.academic_year_id = this.activeACyear
         studentFee.semester_id = this.semester_id
         studentFee.months = this.monthsIds
         studentFee.paid_date = this.paidDate
         studentFee.id = this.student_id
         studentFee.student_type = this.student_type
         if(this.paymentType === 'cp'){
           studentFee.amount = this.semesterPayment* this.monthsIds.length
         }
         else if(this.paymentType === 'monthly'){
         studentFee.amount = this.monthlyPayment*this.monthsIds.length
         }
         console.log('student fee data sent to server')
         console.log(studentFee)
            try {
                var response = await apiClient.post('api/add_tuition_payment/' + studentFee.id, studentFee)
                console.log('response status code',response.status)
                if (response.status === 200) {
               this.monthsIds = []
               console.log('after adding the payment ')
              console.log(response.data)
               this.isFaild = false
           this.isSuccessed = true
           this.v$.$reset()
           this.resetValue()
             var student = {};
            student.id = this.studId
              student.type = this.student_type
          student.academic_year_id = this.$refs.acYearId.value
          this.$store.dispatch('cashier/fetchStudentFeelist',student)
                }
                else if(response.status === 201){
               this.isFaild = true
           this.isSuccessed = false
           this.resultNotifier = response.data.error
                }
            }
            catch(e){
                     this.isFaild = true
           this.isSuccessed = false
           this.resultNotifier = 'error! you may enter incorrect data'
            }
             finally{
           this.newPayment = false
               this.isLoading = false
           }
          
        
          
           }
          
        },
        resetValue(){
           this.padNumber = ''
         this.student_id = ''
         this.paidDate = ''
         this.semesterPayment = ''
        },
       async  otherPayment(){
         console.log('other payment is called')
         var isEmptyFild = false
         this.resultNotifier = ''
           if(this.otherStudId === ''){
             this.isIdFieldEmpty = true
             isEmptyFild = true
           }
           if(this.receiptNumber === ''){
             this.isPadFieldEmpty = true
             isEmptyFild = true
           }
           if(this.otherPaidDate === ''){
             this.isDateFieldEmpty = true
             isEmptyFild = true
           }
           if(!isEmptyFild &&  !this.idLength){
         this.isLoading = true
          var studentFee={}
           studentFee.student_id = this.otherStudId
          studentFee.receipt_no = this.receiptNumber
          studentFee.type = this.student_type
          studentFee.amount = this.otherFeeAmount
          studentFee.paid_date = this.otherPaidDate
          studentFee.fee_type_id = this.paymentTypeId
          studentFee.academic_year_id=this.acYearId
          console.log(studentFee)
          try{
            var response = await apiClient.post('api/add_other_payment',studentFee)
            if(response.status === 200){
              this.isIdFieldEmpty = false
              this.isPadFieldEmpty = false
              this.isDateFieldEmpty = false
              console.log(response.data)
               this.isFaild = false
           this.isSuccessed = true
           this.resultNotifier = 'Your payment is succesfully done'          
          
            }
            else if(response.status === 201){
               this.isFaild = true
           this.isSuccessed = false
            this.isIdFieldEmpty = false
              this.isPadFieldEmpty = false
              this.isDateFieldEmpty = false
           this.resultNotifier = response.data.error
            }
          }
          catch(e){
                this.isFaild = true
           this.isSuccessed = false
            this.resultNotifier = 'error! you may enter incorrect data'
          }
          finally{
            this.isLoading = false
          }
          }
        },
        // changeValue(event){
        // this.otherFeeAmount = this.paymentTypes.find(payment=>{
        // return event.target.value === payment.id
        //   })

        // }
        
    },
}
</script>
<style scoped>
.backarrow{
  cursor: pointer;
  font-size: 22px;
}
.backarrow:hover{
  color: #1142ac;
}
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
  width: 6em;
  background-color:#2f4587 ;
  color: #fff;
}
.paybtn:hover{
 background-color:#366ad9 ;
 
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
   overflow-x: auto!important;
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
  padding: 4px;
  vertical-align: top;
}
.roundtabel{
  border: 1px solid #dddddd;
  border-radius: 13px;
  overflow: hidden;
}
.monthtable{
  width: 100%!important;
  height: 100%!important;
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
   overflow-y: auto;
}
.cancelbtn{
  background-color: #fff;
  border: 1px solid rgb(172, 167, 167);
}
.success{
    color: green;
  }
  .faild,.notFound{
    color: red;
  }
  .warining input{
    border: 1px red solid;
  }
  .warining span{
    display: inline;
    color: red;

  }
  .checkmonth{
    color: red;
  }
  .error input{
    border-color: red;
  }
  .errorMsg,.error{
    color: red;
  }
</style>