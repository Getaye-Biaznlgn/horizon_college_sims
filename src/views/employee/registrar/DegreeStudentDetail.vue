<template>
<base-card>
<span @click="back()" class="backarrow ms-3 mt-2"><i class="fas fa-arrow-left"></i></span>
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
      <table class="mt-4">
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
  <td>{{semester.year_no+' year '+semester.semester_no+' semester'}}</td>
  <td>{{semester.year}}</td>
  <td>{{semester.start_date+' to '+semester.end_date}}</td>
  <td>{{semester.status}}</td>
  <td>{{(semester.GPA).toFixed(2)}}</td>
  <td>
      <div class="dropdown me-5 p-1">
          <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v"></i></span>
          </a>

          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink border rounded shadow-sm">
             <!-- <li><span @click="editStudentSemester(semester.id)" class="dropdown-item px-4 py-2">Edit</span></li> -->
             <li><span @click="viewCourse(semester.id)"  class="dropdown-item px-4 py-2">View Course</span></li>
          </ul>
        </div>
  </td>
  </tr>
  </tbody>
    </table>
     <div v-if="!studentSemesters.semesters?.length" class="mt-4 ms-5 mb-5">
    <span>There is no semester data found</span>
  </div>
    <div class="d-flex justify-content-end mt-5 mb-1"> 
    <button @click="registerForSemester()" class="btn ms-3 me-1 p-1 register addbtn">Register for New Semester</button>
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
  <button @click="finishToRegister()" class="btn exportbtn me-4"><span v-if="isLoading" class="btn  py-1">
 <span  class="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>Registering</span>      
  <span v-else>Register</span>
    </button>
</div>
  </base-card>
</div>
    </div>
    <div v-if="isViewCourse" class="editwraper">
      <div class="w-75 ms-auto me-auto mt-5 border rounded shadow-lg bg-white mb-5">
       <div class="d-flex justify-content-end p-0">
        <span @click="isViewCourse = false" class="close fs-2 me-5"><i class="far fa-times-circle"></i></span>
      </div>
        <div class="courseview">
      <table class="viewcourse">
  <thead>
      <tr class="table-header">
      <th class="text-white p-3">Title</th>
      <th class="text-white p-3">Course Code</th>
      <th class="text-white p-3">Credit Point</th>
      <th class="text-white p-3">Result form 100%</th>
      <th class="text-white p-3">Grade</th>
      </tr>
      </thead>
  <tbody v-if="semesterCourses.length">
  <tr v-for="course in semesterCourses" :key="course.id">
  <td>{{course.title}}</td>
  <td>{{course.code}}</td>
  <td>{{course.cp}}</td>
  <td>{{course.total_mark}}</td>
  <td>{{course.grade_point}}</td>
  </tr>
  </tbody>
    <div v-else class="mt-4 ms-5 mb-3">
    <span>There is no Courses found for this semester</span>
  </div>
    </table>
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
                 isStudentDetail:false,
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
      semesterCourses:'',
      total:'',
      courses:[],
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
         return Number(semester.academic_year_id)===(this.acYearId)
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
    },
    watch:{
      degreeStudId(newValue){
          this.$store.dispatch('registrar/fetchDegreeStudentDetail',newValue)
      }
    },
    methods: {
        back(){
        this.$router.back()
      },
              cancelDialog(){
        this.isStudentDetail = false
      },
       registerForSemester(){
        this.isNewSemester = true
         this.resultNotifier=''
         this.programId = this.studentSemesters.program.id
         this.studentId= this.studentSemesters.id
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
this.resultNotifier = 'You have registereda student succesfully'
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
      cancelRegistration(){
this.isNewSemester = false
      },
      // editStudentSemester(){
      //   this.isEditSemester = true
      //   this.start
      // },
     async viewCourse(id){
          this.$store.commit('setIsItemLoading',true)
         this.student_id = this.studentSemesters.id
         this.programId = this.studentSemesters.program.id
         
       try{
         var response = await apiClient.get(`api/semester_courses/${this.student_id}?semester_id=${id}`)
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
    background-color:#2248b8 ;
}
.exportbtn{
    background-color: #2f4587;
    color: #fff;
    width: 7em;
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
  height: 80%;
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