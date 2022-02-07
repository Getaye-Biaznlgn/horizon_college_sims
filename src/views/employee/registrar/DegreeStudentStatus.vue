<template>
<base-card>
<div class="d-flex justify-content-between">
 <div><span @click="back()" class="backarrow ms-3 mt-2"><i class="fas fa-arrow-left"></i></span></div> 
   <button @click="printDegreeStudentStatus()" class="btn me-2 p-1 exportbtn">
    <span class="me-1"><i class="fas fa-upload"></i></span>
    <span>Export</span>
    </button>
</div>
<div id="studentStatus">
 <div class="d-flex justify-content-between mt-2">
    <div class="ms-5">
    <div class="d-flex">
    <span><strong>Student Name:</strong></span>
    <span>{{studentSemesters.name}}</span>
    </div>
    <div class="d-flex mt-2">
     <span><strong>ID NO: </strong></span>
    <span>{{studentSemesters.student_id}}</span>
    </div>
     <div class="d-flex mt-2">
     <span><strong>Sex: </strong></span>
    <span>{{studentSemesters.sex}}</span>
    </div>
    </div>
    <div class="deptandprogram me-5">
    <div class="d-flex">
    <span><strong>Department : </strong></span>
    <span>{{studentSemesters.department}}</span>
    </div>
    <div class="d-flex mt-2">
    <span><strong>Program : </strong></span>
    <span>{{studentSemesters.program?.name}}</span>
    </div>
        <div class="d-flex mt-2">
    <span><strong>Year : </strong></span>
    <span>{{studentSemesters?.current_year_number}}</span>
    </div>
    </div>
    </div>
    <div class="ms-5 mt-3 sr-only">Acadamic Status</div>
      <table class="mt-2">
  <thead>
      <tr class="table-header">
      <th class="text-white p-3">Semester</th>
      <th class="text-white p-3">Year</th>
      <th class="text-white p-3">Time</th>
      <th class="text-white p-3">State</th>
      <th class="text-white p-3">GPA</th>
      <th class="text-white p-3"></th>
      </tr>
      </thead>
  <tbody>
  <tr v-for="semester in studentSemesters.semesters" :key="semester.start_date">
  <td>{{' Year '+semester.year_no+' Semester '+semester.semester_no}}</td>
  <td>{{semester.year}}</td>
  <td>{{semester.start_date+'  to  '+semester.end_date}}</td>
  <td>{{semester.status}}</td>
  <td>{{(semester.GPA).toFixed(2)}}</td>
  <td>
      <div class="dropdown me-5 p-1">
          <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v"></i></span>
          </a>

          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink border rounded shadow-sm">
            <li><span @click="viewCourse(semester.id)" class="dropdown-item px-4 py-2">View Course</span></li>
            <li v-if="semester.status==='waiting'">
              <span @click="editStudentSemester(semester,studentSemesters.program?.id)" class="dropdown-item px-4 py-2">Edit Semester </span></li>
             <li><span @click="giveCoursResult(semester)" class="dropdown-item px-4 py-2">Give Result </span></li>
          </ul>
        </div>
  </td>
  </tr>
  </tbody>
    </table>
</div>
     <div v-if="!studentSemesters.semesters?.length" class="mt-4 ms-5 mb-5">
    <span>There is no semester data found</span>
  </div>
    <div class="d-flex mt-5 mb-1"> 
      <span v-if="!checkComplation()" class="faild ms-5">Ther is uncompleted semester</span>
    <button @click="registerForSemester()" class="btn ms-3 me-1 p-1 register addbtn ms-auto" :disabled ="!checkComplation()">Register for New Semester</button>
    </div>
</base-card>
  <div v-if="isNewSemester" class="editwraper mb-3">
<div class="dialogcontent ms-auto me-auto pt-3 w-50">
  <base-card>
  <div class="ms-4 mb-3 me-4">
    <span>Academic Year</span>
<select class="form-select mt-1" aria-label="Default select example" v-model="acYearId">
<option v-for="acYear in academicYears" :key="acYear.id" :value="acYear.id">{{acYear.year}}</option>
  </select>
</div>
  <div class="ms-4 mb-3 me-4">
    <span>Year Number</span>
<select class="form-select mt-1" aria-label="Default select example" ref="year_no">
  <option value="1">First</option>
  <option value="2">Second</option>
  <option value="3">Third</option>
  <option value="4">Fourth</option>
  <option value="5">Fifth</option>
  </select>
</div>
  <div class="mb-3 ms-4 me-4">
    <span>Semester</span>
<select class="form-select mt-1" aria-label="Default select example" ref="semester_id">
  <option v-for="semester in filterdSemesters" :key="semester.id" :value="semester.id">{{semester.number}}</option>
  </select>
</div>
 <p class="ms-5 mt-3 text-center" :class="{success:isSuccessed,faild:isFaild}">{{resultNotifier}}</p>
<div class="d-flex justify-content-end mt-3 pt-3">
  <button @click="cancelRegistration()" class="btn cancel me-4">Cancel</button>
  <button @click="finishToRegister()" class="btn exportbtn me-4 px-1"><span v-if="isLoading">
 <span  class="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>Registering</span>      
  <span v-else>Register</span>
    </button>
</div>
  </base-card>
</div>
    </div>
    <div v-if="isViewCourse" class="editwraper">
      <div class="resultContainer ms-auto me-auto mt-4 border rounded shadow-sm bg-white pb-3">
       <div class="d-flex justify-content-end p-0">
        <span @click="isViewCourse = false" class="close fs-2 me-5"><i class="far fa-times-circle"></i></span>
      </div>
        <div class="result">
      <table class="viewcourse">
  <thead>
      <tr class="table-header">
        <th class="text-white p-3">NO</th>
      <th class="text-white p-3">Title</th>
      <th class="text-white p-3">Course Code</th>
      <th class="text-white p-3">Credit Point</th>
      <th class="text-white p-3">Result form 100%</th>
      <th class="text-white p-3">Grade</th>
      </tr>
      </thead>
  <tbody>
  <tr v-for="(course,index) in semesterCourses" :key="course.id">
    <td>{{index+1}}</td>
  <td>{{course.title}}</td>
  <td>{{course.code}}</td>
  <td>{{course.cp}}</td>
  <td>{{course.total_mark}}</td>
  <td>{{course.grade_point}}</td>
  </tr>
  </tbody>
    </table>
     <div v-if="!semesterCourses.length" class="mt-4 ms-5 mb-3">
    <span>There is no Courses found for this semester</span>
  </div>
    </div>
      </div>
    </div>
     <div v-if="isEditSemester" class="editwraper mb-3">
<div class="dialogcontent ms-auto me-auto pt-3 w-50">
  <base-card>
  <div class="ms-4 mb-3 me-4">
    <span>Academic Year</span>
<select class="form-select mt-1" aria-label="Default select example">
<option selected>{{selectedYear}}</option>
  </select>
</div>
  <div class="ms-4 mb-3 me-4">
    <span>Year Number</span>
<select class="form-select mt-1" aria-label="Default select example" v-model="newYearNo">
  <option value="1">First</option>
  <option value="2">Second</option>
  <option value="3">Third</option>
  <option value="4">Fourth</option>
  <option value="5">Fifth</option>
  </select>
</div>
  <div class="mb-3 ms-4 me-4">
    <span>Semester</span>
<select class="form-select mt-1" aria-label="Default select example" v-model="newSemesterId">
  <option v-for="semester in filterdSemesters" :key="semester.id" :value="semester.id">{{semester.number}}</option>
  </select>
</div>
 <p class="ms-5 mt-3 text-center" :class="{success:isSuccessed,faild:isFaild}">{{resultNotifier}}</p>
<div class="d-flex justify-content-end mt-3 pt-3">
  <button @click="cancelEditDialog()" class="btn cancel me-4">Cancel</button>
  <button @click="finishToEdit()" class="btn exportbtn me-4 px-1">
    <span v-if="isLoading">
 <span  class="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>Registering</span>      
  <span v-else>Register</span>
    </button>
</div>
  </base-card>
</div>
    </div>
    <div v-if="isGiveResult" class="editwraper">
      <div class="resultContainer ms-auto me-auto border rounded shadow-sm bg-white pb-3">
       <div class="d-flex justify-content-end p-0">
        <span @click="isGiveResult = false" class="close fs-2 me-5"><i class="far fa-times-circle"></i></span>
      </div>
        <div class="result">
      <table class="viewcourse">
  <thead>
      <tr class="table-header">
        <th class="text-white p-3">NO</th>
      <th class="text-white p-3">Title</th>
      <th class="text-white p-3">Course Code</th>
      <th class="text-white p-3">Result from 5%</th>
      <th class="text-white p-3">Result from 5%</th>
      <th class="text-white p-3">Result from 25%</th>
      <th class="text-white p-3">Result from 25%</th>
      <th class="text-white p-3">Result from 40%</th>
      <th class="text-white p-3">Total From 100%</th>
      <th class="text-white p-3"></th>
      </tr>
      </thead>
  <tbody>
  <tr v-for="(course,index) in semesterCourses" :key="course.id">
    <td>{{index+1}}</td>
  <td>{{course.title}}</td>
  <td>{{course.code}}</td>
  <td><input type="number" min="0" max="5" v-model="course.from_5" @input="calculetTotal($event,course)"></td>
  <td><input type="number" min="0" max="5" v-model="course.from_5s" @input="calculetTotal($event,course)"></td>
  <td><input type="number" min="0" max="25" v-model="course.from_25" @input="calculetTotal($event,course)"></td>
  <td><input type="number" min="0" max="25" v-model="course.from_25s" @input="calculetTotal($event,course)"></td>
  <td><input type="number" min="0" max="40" v-model="course.from_40" @input="calculetTotal($event,course)"></td>
  <td><input type="number" min="0" max="100" v-model="course.total_mark"></td>
  <td><button @click="setResult(course)" class="btn savebtn p-1" :disabled="Number(course.is_changed) === 0">Save</button></td>
  </tr>
  </tbody>
    </table>
     <div v-if="!semesterCourses.length" class="mt-4 ms-5 mb-3">
    <span>There is no Courses found for this semester</span>
  </div>
    </div>
      </div>
    </div>
</template>
<script>
import apiClient from '../../../resources/baseUrl'
export default {
  props:['degreeStudId'],
    data() {
        return {
     tempStudents:[],
     departmentName:'',
     programName:'',
     semesterName:'',
     yearNo:'',
     stateName:'',
     acYearId:'',
     //
     student_id:'',
     isNewSemester:false,
     studentId:null,
       isLoading:false,
      isSuccessed:true,
      isFaild:false,
      resultNotifier:'',
      programId:'',
      //isEnterResult:false,
      isViewCourse:false,
      isGiveResult:false,
      semesterCourses:'',
      courses:[],
      isEditSemester:false,
      lodSemesterId:'',
      newSemesterId:'',
      newYearNo:'',
      oldYearNo:'',
      selectedYear:'',
     selectedSemesterId:'',
        }
    },
    computed:{
        studentSemesters(){
        return this.$store.getters['registrar/degreeStudentDetail']
        },
         academicSemesters(){
       return this.$store.getters['registrar/activeYearSemesters']
    },
        academicYears(){
      return this.$store.getters['academicYears']
    },
            filterdSemesters(){
       var semesters = this.academicSemesters.filter(semester=>{
         return Number(semester.academic_year_id)===Number(this.acYearId)
         })
         var requiredSemeester = semesters.filter(semester=>{
             return semester.program_id === this.programId
         })
         console.log('filtered semesters=')
         console.log(semesters)
       return requiredSemeester
     }
    },
    created() {
              this.academicYears.forEach((year)=>{
    if(Number(year.is_current) === 1){
      this.acYearId = year.id
    }
         })
          this.$store.dispatch('registrar/fetchDegreeStudentDetail',this.degreeStudId)
    },
    
    methods: {
        back(){
        this.$router.back()
      },
      printDegreeStudentStatus(){
        this.$htmlToPaper('studentStatus')
      },
      cancelEditDialog(){
        this.isEditSemester = false
        this.resultNotifier = ''
      },
       registerForSemester(){
        this.isNewSemester = true
         this.resultNotifier=''
         this.programId = this.studentSemesters.program.id
         this.studentId= this.degreeStudId
         console.log('student semester data ',this.studentSemesters)
      },
       async giveCoursResult(semester){
          if(Number(semester.is_closed)=== 1){
           this.$store.commit('setAlertMessages',{
                text:'This semester is Closed!',
                type:'danger'
              })
         }
         else if(Number(semester.legible)=== 0){
           this.$store.commit('setAlertMessages',{
                text:'This studdent do not paid his tuition fee!',
                type:'danger'
              })
         }
         else if(Number(semester.is_allowed_now)=== 0){
           this.$store.commit('setAlertMessages',{
                text:'Student result entry date is passed!',
                type:'danger'
              })
         }
         
         else{
         this.$store.commit('setIsItemLoading',true)
         this.student_id = this.studentSemesters.id
         this.programId = this.studentSemesters.program.id
         this.selectedSemesterId = semester.id
         
       try{
         var response = await apiClient.get(`api/semester_courses/${this.degreeStudId}?semester_id=${semester.id}`)
         if(response.status === 200){
           this.semesterCourses = response.data
           this.isGiveResult = true
            console.log(response.data)
         }
       }
       catch(e){
         console .log('error')
       }
       finally{
          this.$store.commit('setIsItemLoading',false)
       }
        }
        
      },
      async setResult(course){
       course.semester_id = this.selectedSemesterId
        console.log('course result sent to server',course)
        var response = await apiClient.post('api/give_course_result/'+this.degreeStudId,course)
        if(response.status === 200){
          console.log('result successfully sent')
          console.log('course result from server',response.data)
          course.is_changed = 0
           this.$store.commit('setAlertMessages',{
                text:'Result is saved!',
                type:'success'
              })
        }
      },
      checkComplation(){
        var isCopleted = true
     this.studentSemesters.semesters?.forEach(semester=>{
           if(semester.status !== 'finished'){
             isCopleted = false
             console.log('state of semester',isCopleted)
           }
         })
         return isCopleted
      },
      async finishToRegister(){
        this.isLoading = true
        var semester = {}
        semester.student_id = this.studentId
      semester.academic_year_id = this.acYearId
       semester.semester_id = this.$refs.semester_id.value
        semester.year_no = this.$refs.year_no.value
try{
  console.log(semester)
var response = await apiClient.post('api/register_student_for_semester',semester)
if(response.status === 201){
console.log('students registerd to new semester')
console.log(response.data)
this.studentSemesters.semesters.push(response.data)
this.isFaild = false
this.isSuccessed = true
this.resultNotifier = 'You have registered student succesfully'
}
else if(response.status === 200){
  this.isFaild = true
this.isSuccessed = false
this.resultNotifier = 'This student is Already registerd for this Semester'
}
           
}
catch(e){
 this.isFaild = true
           this.isSuccessed = false
           this.resultNotifier = 'registration is faild'
}
finally{
  this.isLoading = false
}
      },
        async viewCourse(id){
          this.$store.commit('setIsItemLoading',true)
         this.student_id = this.studentSemesters.id
         this.programId = this.studentSemesters.program.id
         
       try{
         var response = await apiClient.get(`api/semester_courses/${this.degreeStudId}?semester_id=${id}`)
         if(response.status === 200){
           this.semesterCourses = response.data
            this.isViewCourse = true
            console.log('semester courses ='+this.studentId)
            console.log(response.data)
         }
       }
       catch(e){
         console .log('error')
       }
       finally{
          this.$store.commit('setIsItemLoading',false)
       }
      },
      calculetTotal(event,course){
        course.is_changed = 1
      var totalMark = Number(course.from_5) + Number(course.from_5s) +Number(course.from_25) +Number(course.from_25s) + Number(course.from_40)
      course.total_mark = totalMark
      if(course.from_5 >5){
        this.from
      }
      },
      cancelRegistration(){
this.isNewSemester = false
this.resultNotifier = ''
      },
      editStudentSemester(semester,programId){
        this.oldSemesterId = semester.id
        this.newSemesterId = semester.id
        this.acYearId = semester.academic_year_id
        this.newYearNo = semester.year_no
        this.oldYearNo = semester.year_no
        this.programId = programId
        this.isEditSemester = true
        this.selectedYear = semester.year
        this.resultNotifier = ''
      },
      async finishToEdit(){
        this.isLoading = true
        try{
       var response = await apiClient.put(`api/update_student_for_semester/${this.degreeStudId}?old_semester_id=${this.oldSemesterId}&semester_id=${this.newSemesterId}&year_no=${this.newYearNo}&old_year_no=${this.oldYearNo}&academic_year_id=${this.acYearId}`)
       if(response.status === 201){
         console.log('response from server',response.data)
        var tempStudent = this.studentSemesters
         var index = tempStudent.semesters.findIndex(semester=>{
           return Number(semester.id) === Number(this.oldSemesterId)
             })
         tempStudent.semesters[index].year_no = response.data.year_no
         tempStudent.semesters[index].semester_no = response.data.semester_no
         this.$store.commit('registrar/setDegreeStudentDetails',tempStudent)
         this.resultNotifier = 'Successfully updated'
         this.isFaild = false
         this.isSuccessed = true
      }
      else if(response.status === 200){
         this.resultNotifier = 'already registerd for this semester'
         this.isFaild = true
         this.isSuccessed = false
      }
      }
      finally{
        this.isLoading = false
      }
      }
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
.addbtn{
    background-color: #2f4587;
    color: #fff;
    width: 12em;
    vertical-align: middle;

} 
.addbtn:hover,.exportbtn:hover{
    background-color:#375fd4 ;
}
.savebtn{
  width: 5em;
  background-color: #2f4587;
  color: #fff;
}
.savebtn:hover{
  background-color: #366ad9;
}
.exportbtn{
    background-color: #2f4587;
    color: #fff;
    width: 8em;
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
.resultContainer{
  width: 96%;
  margin-top: 2%;
  margin-bottom: 2%;
}
.result{
   width: 100%;
   height: 82vh;
   overflow-y: auto;
}
.viewcourse th{
  background-color: #fff;
  color: rgb(17, 17, 17)!important;
  font-size: 16px;
}
.viewcourse tr{
  padding-top: 4px;
  padding-bottom: 4px;
  border-top: 2px solid rgb(237, 240, 241);
  border-bottom: 2px solid rgb(237, 240, 241);;
}
.viewcourse td{ 
  padding: 10px;
  padding-left: 15px;
  border-left: none;
  border-right: none;
   border-top: 2px solid rgb(237, 240, 241);;
  border-bottom: 2px solid rgb(237, 240, 241);;
}
td input{
  width: 90%;
}
.close{
  margin-right: 15%;
  cursor: pointer;
}
.close:hover{
  color: #366ad9;
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
   width: 90%;
   margin: auto;
   margin-top: 5%;
   margin-bottom: 5%;
   height: 80vh;
   overflow-y: auto;
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
</style>