<template>
    <base-card>
    <div class="d-flex justify-content-end">
      <div> 
    <button @click="addStudent" class="btn me-1 p-1 register addbtn">Register New Student</button>
    </div>
     <div class="ms-3">
    <button @click="printDegreeStudent()" class="btn me-1 p-1 exportbtn addbtn">
    <span class="me-3"><i class="fas fa-upload"></i></span>
    <span>Export</span>
    </button>
    </div>
    </div>
    <div class="d-flex justify-content-between mt-4">
     <div class="input-group mt-3 search">
  <input type="text" class="form-control form-control-sm px-0" placeholder="Search By ID" aria-label="Username" aria-describedby="addon-wrapping" v-model.trim="searchValue">
   <span class="searchicon input-group-text" id="addon-wrapping"><i class="fas fa-search"></i></span>
</div>
  <div class="d-flex ms-3">
  <div class="mb-3 me-4">
<select class="form-select form-select-sm" aria-label="Default select example" v-model="departmentForFilter">
  <option value="all">All Department</option>
  <option v-for="department in degreeDepartments" :key="department.id" :value="department.id">{{department.name}}</option>
  </select>
</div>
 <div class="mb-3 me-4">
<select class="form-select form-select-sm" aria-label="Default select example" v-model="programForFilter">
  <option value="all">All Program</option>
  <option v-for="program in degreePrograms" :key="program.id" :value="program.id">{{program.name}}</option>
  </select>
</div>
 <div class="mb-3 me-4">
<select class="form-select form-select-sm" aria-label="Default select example" v-model="yearForFilter">
  <option value="1">First year</option>
  <option value="2">Second year</option>
  <option value="3">Third year</option>
  <option value="4">Fourth year</option>
  <option value="5">Fiveth year</option>
  </select>
</div>
<div class="mb-3 me-2">
<select class="form-select form-select-sm" aria-label="Default select example" v-model ="semesterForFilter">
  <option value="1">Semester 1</option>
  <option value="2">Semester 2</option>
   <option value="3">Semester 3</option>
  </select>
</div>
 <div class="ms-2 mb-3 me-3">
          <select
            class="form-select form-select-sm"
            aria-label="Default select example"
            v-model="scholarForFilter"
          >
            <option value="all">All</option>
            <option value="none">Scholarship</option>
            <option value="fully">Non scholarship</option>
          </select>
        </div>
<div class="mb-3">
<select class="form-select form-select-sm" aria-label="Default select example" v-model ="stateForFilter">
  <option value="all">All State</option>
  <option value="waiting">Waiting</option>
  <option value="approved">Approved</option>
  </select>
</div>
  </div>
  </div>
  <div class="degreestudentlist" id="degreestudentlist">
    <div class="ms-5 sr-only">
    <span>{{yearNo+' '+semesterName+' '+departmentName+' '+ programName+' '+stateName+' '+scholarName+' Students'}}</span>
    </div>
     <table class="mt-3">
  <thead>
    <tr class="table-header">
      <th class="text-white px-2">NO</th>
       <th class="text-white px-2">Student ID</th>
      <th class="text-white px-2">Full Name</th>
      <th class="text-white px-2">sex</th>
      <th class="text-white px-2">progarm</th>
      <th class="text-white px-2">Department</th>
      <th class="text-white px-2">Year</th>
      <th class="text-white px-2">Semester</th>
      <th v-show="!isPrinting" class="text-white px-2">current State</th>
      <th v-show="!isPrinting" class="text-white px-2">Result Form</th>
      <th v-show="!isPrinting"><span class="sr-only px-2"></span></th>
    </tr>
  </thead>
  <tbody>
     <tr v-for="(student,index) in filteredStudents" :key="student.id">
      <td>{{index+1}}</td>
      <td>{{student.student_id}}</td>
      <td>{{student.first_name+" "+student.last_name}}</td>
      <td>{{student.sex}}</td>
      <td>{{student.program?.name}}</td>
      <td>{{student.department?.name}}</td>
      <td>{{student.year_no}}</td>
      <td>{{semesterForFilter}}</td>
      <td v-show="!isPrinting" class="text-center">
        <span v-if="student.status !== 'waiting'">{{student.status}}</span>
        <span v-else class="approvebtn border rounded shadow-sm p-1"><button @click="approveStudent(student)" class="btn error" id="approvebtn">approve</button></span>
      </td>
       <td v-show="!isPrinting">{{changeResultEntryState(student.legible)}}</td>
      <td v-show="!isPrinting">
        <div class="dropdown">
          <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v"></i></span>
          </a>

          <ul class="dropdown-menu py-0" aria-labelledby="dropdownMenuLink border rounded shadow-sm">
            <li><span @click="viewDetail(student.id)" class="dropdown-item px-4 py-2">View Status</span></li>
             <li><span @click="editStudent(student.id)" class="dropdown-item px-4 py-2">View Detail</span></li>
              <li><span @click="permitResult(student)" class="dropdown-item px-4 py-2">Permit Result Entry</span></li>
              <li v-if="Number(student.year_no) === 1 && student.status === 'waiting'">
               <span @click="deleteStudent(student,semesterForFilter)" class="dropdown-item px-4 py-2">Delete Student</span></li>
          </ul>
        </div>
    </td>
    </tr>
  </tbody>  
</table>
 <div  v-if="!filteredStudents?.length" class="px-5 ms-5 mt-3 pb-2"><span class="text-center">No {{yearNo}} Degree Students found</span></div> 
</div>
    </base-card>
   <div v-if="isPermit" class="editwraper">
<div class="d-flex">
  <div class="dialogContent ms-auto me-auto border rounded shadow-sm p-5">
    <div class="form-check me-3">
  <input class="form-check-input ms-4 p-2" type="radio" name="resultentry" id="open" value="1" v-model="optionValue">
  <label class="form-check-label ms-2" for="open">
    Open result entry form
  </label>
</div>
<div class="form-check mt-4">
  <input class="form-check-input ms-4 p-2" type="radio" name="resultentry" id="close" value="0" v-model="optionValue">
  <label class="form-check-label ms-2" for="close">
    Close result entry form
  </label>
</div>
    <div class="d-flex justify-content-end mt-5">
      <button @click="cancelPermision()" class="btn cancel me-4">Cancel</button>
       <button type="button" @click="savePermision()" class="btn  px-2 savebtn">
            <span v-if="isPermiting">
               <span  class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
               Saving
            </span>      
            <span v-else>Save</span>   
          </button>
    </div>
  </div>
</div>
   </div>
   <div v-if="isDelete" class="editwraper d-flex">
     <div class="dialogContent ms-auto me-auto border rounded shadow-sm p-5">
      <div>Do you want to delete {{studentFullName}} from Horizon ?</div>
      <div class="d-flex justify-content-end mt-5">
         <button @click="yesDelete()" class="btn me-5 confirm">Yes</button>
        <button @click="cancelDeletion()" class="btn confirm">NO</button>
       
      </div>
     </div>
   </div>
</template>
<script>
import {mapGetters} from 'vuex'
import apiClient from '../../../resources/baseUrl'
export default {
  data() {
    return {
    rowNumber:8,
    searchValue:'',
    departmentForFilter:'all',
     programForFilter:'all',
     semesterForFilter:'1',
     stateForFilter:'all', 
     yearForFilter:'1',
     semesterName:'first semester',
     yearNo:'First year',
     stateName:'',
     programName:'',
     departmentName:'',
     scholarName:'',
     scholarForFilter:'all',
       //
       isEditStudent:false,
      queryData:{
        year_no:1,
      },
      semesterId:'',
      studentId:'',
      isPermit:false,
      isPermiting:false,
      optionValue:'',
      stateNotifier:'',
      isPrinting:false,
      isDelete:false,
      payload:{},
      studentFullName:'',

    }
  },
   computed:{
    ...mapGetters('dean',['degreeDepartments','degreePrograms']),
    degreeStudents(){
     return this.$store.getters['registrar/degreeStudents']
    },
    
    academicYearId(){
      return this.$store.getters.acYearId
    },
    notifications(){
      return this.$store.getters.notifications
    },
      user(){
      return this.$store.getters.user
    },
     filteredStudents(){
         var tempStudents=[]
         this.degreeStudents.forEach((student)=>{
            if(Number(student.semester_no)===Number(this.semesterForFilter)){
                   tempStudents = student.students
            }
         })
    
      if(this.searchValue !==''){
         tempStudents=tempStudents.filter((student)=>{
            return student?.student_id?.toLowerCase().includes(this.searchValue.toLowerCase())
         })
      }
       if(this.departmentForFilter!=='all'){
         tempStudents=tempStudents.filter((student)=>{
            return student.department.id===this.departmentForFilter
         })
      }
      if(this.programForFilter!=='all'){
         tempStudents=tempStudents.filter((student)=>{
            return student.program.id.toString()===this.programForFilter.toString()
         })
      }
            if(this.stateForFilter!=='all'){
         tempStudents=tempStudents.filter((student)=>{
            return student?.status===this.stateForFilter
         })
      }
             if(this.scholarForFilter!=='all'){
         tempStudents=tempStudents.filter((student)=>{
            return student?.scholarship===this.scholarForFilter
         })
      }
      return tempStudents 
     },

  },
  watch:{
    semesterForFilter(newValue){
      if(newValue === '1'){
        this.semesterName = 'first semester'
      }
      else if(newValue === '2'){
        this.semesterName = 'second semester'
      }
       else if(newValue === '3'){
        this.semesterName = 'third semester'
      }
    },
    departmentForFilter(newValue){
    if(newValue !== 'all'){
this.degreeDepartments.forEach(department=>{
  if(department.id === newValue){
    this.departmentName = department.name+' Department'
  }
})
    }
    else{
      this.departmentName = ''
    }
    },
    programForFilter(newValue){
      if(newValue !== 'all'){
this.degreePrograms.forEach(program=>{
  if(newValue === program.id){
    this.programName = program.name
  }
})
      }
      else{
        this.programName = ''
      }
    },
    yearForFilter(newValue){
        this.queryData.year_no = newValue
           this.$store.dispatch('registrar/fetchDegreeStudents',this.queryData)
      if(newValue === '1'){
      this.yearNo = 'First year'
    }
    else if(newValue === '2'){
      this.yearNo = 'Second year'
    }
     else if(newValue === '3'){
      this.yearNo = 'Third year'
    }
     else if(newValue === '4'){
      this.yearNo = 'Fourth year'
    }
     else if(newValue === '5'){
      this.yearNo = 'Fiveth year'
    }
    else{
      this.yearNo = ''
    }
  },
  stateForFilter(newValue){
   if(newValue === 'waiting'){
      this.stateName = 'Unapproved'
    }
     else if(newValue === 'approved'){
      this.stateName = 'Approved'
    } 
    else{
      this.stateName = ''
    }
  },
  scholarForFilter(newValue){
if(newValue === 'all'){
  this.scholarName = ''
}
else if(newValue === 'fully'){
  this.scholarName = 'scholarship'
}
else if(newValue === 'none'){
  this.scholarName = 'none scholarship'
}
  },
  academicYearId(newValue){
    this.queryData.year_no = this.yearForFilter
    this.queryData.academic_year_id = newValue
   this.$store.dispatch('registrar/fetchDegreeStudents',this.queryData)
  },
  // optionValue(){
  //    this.$store.dispatch('registrar/fetchDegreeStudents',this.queryData)
  // }
  },
  created() {
    this.degreeStudents.forEach((student)=>{
    if(Number(student.semester_no) === Number(this.semesterForFilter)){
      this.tempStudents= student
    }
         }),
         this.queryData.academic_year_id = this.academicYearId
         this.$store.dispatch('registrar/fetchDegreeStudents',this.queryData)
  },
      methods: {
       async printDegreeStudent(){
         this.isPrinting = true
         var setTimeOutFunction
        setTimeOutFunction =setTimeout(()=>{
             this.$htmlToPaper('degreestudentlist',null,()=>{
                this.isPrinting = false
                clearTimeout(setTimeOutFunction);
             })
              
         },300)       
        },
      addStudent(){
        this.$router.push({name:'DegreeStudentRegistration'})
      },
     async viewDetail(id){
        this.$router.push({name:'DegreeStudentStatus',params:{degreeStudId:id}})
     },
      editStudent(id){
         this.$router.push({name:'EditDegreeStudents',params:{studId:id}})
        } ,
       async approveStudent(studentvalue){
         var student={}
         student.student_id= studentvalue.id,
         student.semester_id= studentvalue.semester_id
         student.user_id = this.user.id
         
          try{
         var response = await apiClient.post('api/degree_approve',student)
         if(response.status === 200){
           studentvalue.status = 'approved'
           console.log('notification length',this.notifications)
           this.$store.commit('setNotifications',Number(this.notifications)-1)
         }
          }
          catch(e){
            console.log(e)
          }
       },
       deleteStudent(student,semester_no){
         this.isDelete=true
         this.payload.id = student.id
         this.payload.semester_no = semester_no
         this.payload.semester_id = student.semester_id
         this.studentFullName = student.first_name+' '+student.last_name
       
       }, 
       yesDelete(){
          this.$store.dispatch('registrar/deleteDegreeStudent',this.payload).then(()=>{
          //  student.status = 'approved'
          this.isDelete = false
         })
       },
       cancelDeletion(){
          this.isDelete = false
       },
        permitResult(student){
          this.isPermit = true
          this.semesterId = student.semester_id
          this.studentId = student.id
          this.optionValue = student.legible
        },
        async savePermision(){
           this.isPermiting = true
          var optionData = {}
          optionData.student_id = this.studentId
          optionData.semester_id = this.semesterId
          optionData.legible = this.optionValue
          try{
            var response = await apiClient.post('api/change_result_entry_state/'+optionData.student_id,optionData)
            if(response.status === 200){
                var previousStudent = this.degreeStudents
                    var index1;
                    var index2;
                    index1 = previousStudent.findIndex((semester) => {
                        return semester.semester_no === this.semesterForFilter
                    })
                    index2 = previousStudent[index1].students.findIndex(student => {
                        return student.id === optionData.student_id
                    })
                    // var permitedStudent = previousStudent[index1].students[index2]
                    // permitedStudent.
                    previousStudent[index1].students[index2].legible = optionData.legible
                    this.$store.commit('registrar/setDegreeStudent',previousStudent)
                    console.log('index1 = ', index1,'index2 = ',index2,'legibility = ',optionData.legible)
                    console.log('response after changing',response.data)
                   
            }        
                  
          }
          finally{
            this.isPermiting = false
            this.isPermit =false
          }
        },
        changeResultEntryState(state){
          if(Number(state) === 1){
          return 'Opened'
          }
          else if(Number(state) === 0){
            return 'Closed'
          }
        },
        cancelPermision(){
          this.isPermit = false
        } 
    },

}
</script>
<style scoped>
.search{
  width: 17%;
}
.addbtn{
    background-color: #2f4587;
    color: #fff;
    width: 12em;
    vertical-align: middle;

} 
.addbtn:hover,.exportbtn:hover,.savebtn:hover{
    background-color:#2248b8 ;
}

.exportbtn,.savebtn{
    background-color: #2f4587;
    color: #fff;
    width: 7em;
}
.confirm{
  width: 5em;
  border: 1px solid gainsboro;
}
.confirm:hover{
  background-color: gainsboro;
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
  
}
td{
  border: 1px solid #dddddd;
  text-align: left;
  padding: 4px;
  vertical-align: top;
}
.dropdown ul{
    background-color: #ecf1fe;
}
 li span:hover{
background-color: #366ad9;
color: #fff;
cursor: pointer;
}
.courseview{
  margin: 3% 15% 10% 15%;
  overflow-y: auto;
}
.viewcourse th{
  background-color: #fff;
  color: rgb(17, 17, 17)!important;
  font-size: 20px;
}
.viewcourse tr{
  padding-top: 4px;
  padding-bottom: 4px;
  border-top: 2px solid gray;
  border-bottom: 2px solid gray;
}
.viewcourse td{ 
  padding: 10px;
  padding-left: 15px;
  border-left: none;
  border-right: none;
   border-top: 2px solid gray;
  border-bottom: 2px solid gray;
}
.close{
  margin-right: 15%;
  cursor: pointer;
}
.close:hover{
  color: #366ad9;
}
select{
    border-radius: 0;
}
.all{
  border: 2px solid rgb(179, 176, 176);
  width: 6em;
  padding: 2px;
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
    box-shadow: none!important;
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
.editwraper{
 position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh!important;
    background-color: rgba(17, 17, 17, 0.5);
    z-index: 1000;
}
.dialogContent{
  width: 40%;
  margin: auto;
  margin-top: 10%;
  background-color: #fff;
}
.cancel{
  border: 1px solid gray;
  width: 7em;
}
.cancel:hover{
  background-color: rgb(192, 189, 189);
}
.register{
  width: 15em;
}
ul li{
  cursor: pointer;
}
.success{
    color: green;
  }
  .faild{
    color: red;
  }
  .error{
    color: rgb(253, 7, 7);
    box-shadow: none!important;
  }
  .approvebtn{
    color: rgb(253, 7, 7);
  }
  .approvebtn:hover{
 background-color: #366ad9;
  }
</style>