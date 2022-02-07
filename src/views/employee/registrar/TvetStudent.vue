<template>
  <base-card>
    <div class="d-flex justify-content-end">
      <button @click="addStudent" class="btn p-1 addbtn">
        Register New Student
      </button>
      <button @click="printTvetStudent()" class="btn ms-3 p-1 exportbtn">
        <span class="me-3"><i class="fas fa-upload"></i></span>
        <span>Export</span>
      </button>
    </div>
    <div class="d-flex justify-content-between">
      <div class="input-group mt-5 search w-25">
        <input type="text" class="form-control form-control-sm mt-3"
          placeholder="Search By Student ID"
          aria-label="Username"
          aria-describedby="addon-wrapping"
          v-model.trim="searchValue"/>
        <span class="input-group-text mt-3 searchbtn" id="addon-wrapping"><i class="fas fa-search"></i></span>
      </div>
      <div class="d-flex justify-content-end ms-4 mt-3">
        <div class="mb-3">
          <select
            class="form-select form-select-sm"
            aria-label="Default select example"
            v-model="departmentForFilter"
          >
            <option value="all">All Department</option>
            <option
              v-for="department in tvetDepartments"
              :key="department.id"
              :value="department.id"
            >
              {{ department.name }}
            </option>
          </select>
        </div>
        <div class="ms-2 mb-3">
          <select
            class="form-select form-select-sm"
            aria-label="Default select example"
            v-model="programForFilter"
          >
            <option value="all">All program</option>
            <option
              v-for="program in tvetPrograms"
              :key="program.id"
              :value="program.id"
            >
              {{ program.name }}
            </option>
          </select>
        </div>
        <div class="ms-2 mb-3">
          <select
            class="form-select form-select-sm"
            aria-label="Default select example"
            v-model="levelForFilter"
          >
            <option value="1">Level I</option>
            <option value="2">Level II</option>
            <option value="3">Level III</option>
            <option value="4">Level IV</option>
          </select>
        </div>
        <div class="ms-2 mb-3">
          <select class="form-select form-select-sm" aria-label="Default select example" v-model="scholarForFilter">
            <option value="all">All</option>
            <option value="fully">Scholarship</option>
            <option value="none">None Scholarship</option>            
          </select>
        </div>
        <div class="ms-2 mb-3">
          <select class="form-select form-select-sm"
            aria-label="Default select example"
            v-model="stateForFilter">
            <option value="all">All State</option>
            <option value="waiting">Waiting</option>
            <option value="approved">Approved</option>
          </select>
        </div>
      </div>
    </div>
    <div id="tvetstudent">
        <div class="ms-5 sr-only">
    <span>{{levelName+' '+departmentName+' '+ programName+' '+stateName+' '+scholarName+' TVET Students'}}</span>
    </div>
    <table class="mt-3">
      <thead>
        <tr class="table-header">
          <th class="text-white">NO</th>
          <th class="text-white">Student ID</th>
          <th class="text-white">Full Name</th>
          <th class="text-white">sex</th>
          <th class="text-white">Department</th>
          <th class="text-white">progarm</th>
          <th class="text-white">Level</th>
          <th class="text-white">Scholarship</th>
          <th v-show="!isPrinting" class="text-white">State</th>
           <th v-show="!isPrinting" class="text-white">Result Form</th>
          <th v-show="!isPrinting"><span class="sr-only">action</span></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in filteredStudents" :key="student.id">
          <td>{{ index + 1 }}</td>
          <td>{{ student.student_id }}</td>
          <td>{{ student.first_name + " " + student.last_name }}</td>
          <td>{{ student.sex }}</td>
          <td>{{ student.department.name }}</td>
          <td>{{ student.program.name }}</td>
          <td>{{ tvetStudents.level_no }}</td>
          <td>{{ student.scholarship }}</td>
          <td v-show="!isPrinting">
        <span v-if="student.status === 'approved'">{{student.status}}</span>
        <span v-else class="approvebtn p-1 border rounded shadow-sm"><button @click="approveStudent(student)" class="btn error approved">approve</button></span>
      </td>
      <td v-show="!isPrinting">{{changeResultEntryState(student.legible)}}</td>
     <td v-show="!isPrinting">
       <div class="dropdown">
         <a class="btn py-0" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                <span><i class="fas fa-ellipsis-v"></i></span>
              </a>

              <ul
                class="dropdown-menu"
                aria-labelledby="dropdownMenuLink border rounded shadow-sm">
                <li><span @click="viewStatus(student.id)" class="dropdown-item px-4 py-2">View Status</span>
                </li>
                 <li><span @click="editStudent(student.id)" class="dropdown-item px-4 py-2">View Detail</span></li>
                  <li><span @click="permitResult(student)" class="dropdown-item px-4 py-2">Open Result Form</span></li>
                      <li v-if="Number(tvetStudents.level_no) === 1 && student.status ==='waiting'">
                  <span @click="deleteStudent(student,tvetStudents.level_no)" class="dropdown-item px-4 py-2">Delet Student</span></li>
                 
              </ul>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
    <div v-if="!filteredStudents?.length" class="ms-5 mt-3 px-5 pb-2">
      No {{levelName }}TVET Students found
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
import apiClient from '../../../resources/baseUrl'
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      tvetStudentList: [],
      studentId: "",
      sex: "male",
      program: "",
      department: "",
      level: "",
      rowNumber: 8,
      //
      searchValue: "",
      departmentForFilter: "all",
      programForFilter: "all",
      levelForFilter: "1",
      stateForFilter: "all",
      scholarForFilter: "all",
      levelNumber: "",

      queryData:{
        level_no:1,
        academic_year_id:''
      },
      
     levelName:'Level One',
     stateName:'',
     programName:'',
     departmentName:'',
     scholarName:'',
     isPermit:false,
     isPermiting:false,
     optionValue:'',
     levelid:'',
     studId:'',
     isPrinting:false,
     isDelete:false,
     studentFullName:'',
     payload:{},

     
    };
  },
  computed: {
    ...mapGetters("dean", ["tvetDepartments", "tvetPrograms"]),
    tvetStudents() {
      return this.$store.getters["registrar/tvetStudents"];
    },
    user(){
      return this.$store.getters.user
    },
    academicYears() {
      return this.$store.getters["academicYears"];
    },
    levels() {
      return this.$store.getters["registrar/levels"];
    },
    academicYearId(){
      return this.$store.getters.acYearId
    },
    notifications(){
      return this.$store.getters.notifications
    },
    departmentBasedLevels() {
      var levels = this.levels.filter((level) => {
        return this.studentLevels.department.id === level.tvet_department_id;
      });
      return levels;
    },
    filteredStudents() {
      var tempStudents = this.tvetStudents.students
        if (this.searchValue !== "") {
        tempStudents = tempStudents.filter((student) => {
          return student?.student_id
            ?.toLowerCase()
            .includes(this.searchValue.toLowerCase());
        });
      }
      if (this.departmentForFilter !== "all") {
        tempStudents = tempStudents.filter((student) => {
          return student.department.id === this.departmentForFilter;
        });
      }
      if (this.programForFilter !== "all") {
        tempStudents = tempStudents.filter((student) => {
          return (
            student.program.id.toString() === this.programForFilter.toString()
          );
        });
      }
      if (this.stateForFilter !== "all") {
        tempStudents = tempStudents.filter((student) => {
          return student?.status === this.stateForFilter;
        });
      }
      if (this.scholarForFilter !== "all") {
        tempStudents = tempStudents.filter((student) => {
          return student?.scholarship === this.scholarForFilter;
        });
      }
      return tempStudents;
    },
  },
  created() {     
    this.queryData.academic_year_id = this.academicYearId
     this.$store.dispatch('registrar/fetchTvetStudents',this.queryData)
  },
  watch:{
    academicYearId(newValue){
      this.queryData.academic_year_id = newValue
 this.$store.dispatch('registrar/fetchTvetStudents',this.queryData)
    },
        levelForFilter(newValue){
           this.queryData.level_no = newValue
           this.queryData.academic_year_id = this.academicYearId
  this.$store.dispatch('registrar/fetchTvetStudents',this.queryData)
      if(newValue === '1'){
        this.levelName = 'Level One'
      }
      else if(newValue === '2'){
        this.levelName = 'Level Two'
      }
       else if(newValue === '3'){
        this.levelName = 'Level Three'
      }
        else if(newValue === '4'){
        this.levelName = 'Level Four'
      }
    },
     departmentForFilter(newValue){
    if(newValue !== 'all'){
this.tvetDepartments.forEach(department=>{
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
this.tvetPrograms.forEach(program=>{
  if(newValue === program.id){
    this.programName = program.name
    return
  }
})
      }
       else{
    this.programName = ''
  }
    },
    stateForFilter(newValue){
      if(newValue === 'all'){
        this.stateName = ''
      }
      else if(newValue === 'waiting'){
        this.stateName = 'Unapproved'
      }
       else if(newValue === 'approved'){
        this.stateName = 'approved'
      }
    },
      scholarForFilter(newValue){
      if(newValue === 'all'){
        this.scholarName = ''
      }
      else if(newValue === 'fully'){
        this.scholarName = 'Scholarship'
      }
       else if(newValue === 'none'){
        this.scholarName = 'None Scholarship'
      }
    }
  },
  methods: {
    addStudent() {
      this.$router.push({ name: "TvetStudentRegistration" });
    },
    async printTvetStudent() {
      this.isPrinting = true
      var timeOutFunction
     timeOutFunction= setTimeout(()=>{
        this.$htmlToPaper("tvetstudent",null,()=>{
              this.isPrinting = false
              clearTimeout(timeOutFunction)
        })
      
      },300)
        },
    viewStatus(id) {
       this.$router.push({name:'TvetStudentStatus',params:{tvetStudId:id}})
           },

     async approveStudent(student){
         var studentData={}
         studentData.student_id= student.id,
         studentData.level_id= student.level_id
         studentData.uer_id = this.user.id
         
          try{
            console.log('data sent to approve',studentData)
         var response = await apiClient.post('api/tvet_approve',studentData)
         console.log('response code=',response.status)
         if(response.status === 200){
           student.status = response.data.status
           this.$store.commit('setNotifications',Number(this.notifications)-1)
         }
          }
          catch(e){
            console.log(e)
          }
      },
      editStudent(id){
        this.$router.push({name:'EditTvetStudents',params:{studId:id}})
      },

        deleteStudent(student,level_no){
         this.payload.id = student.id
         this.payload.level_id = student.level_id
         this.payload.level_no = level_no
         this.studentFullName = student.first_name + " " + student.last_name 
         this.isDelete = true
         
       }, 
       yesDelete(){
         this.$store.dispatch('registrar/deleteTvetStudent',this.payload).then(()=>{
           this.isDelete = false
         })
       },
       cancelDeletion(){
         this.isDelete =false
       },
         permitResult(student){
          this.isPermit = true
          this.levelId = student.level_id
          this.studId = student.id
          this.optionValue = student.legible
        },
        async savePermision(){
           this.isPermiting = true
          var optionData = {}
          optionData.student_id = this.studId
          optionData.level_id = this.levelId
          optionData.legible = this.optionValue
          try{
            var response = await apiClient.post('api/change_result_entry_state_tvet/'+optionData.student_id,optionData)
            if(response.status === 200){
                 var previousStudents = this.tvetStudents
                    var index = previousStudents.students.findIndex(student => {
                        return student.id === optionData.student_id
                    })
                    previousStudents.students[index].legible = optionData.legible
                    this.$store.commit('setTvetStudent', previousStudents)
                    console.log('index = ',index,'legibility = ',optionData.legible)
                   
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
  }
}
</script>
<style scoped>
.addbtn {
  background-color: #2f4587;
  color: #fff;
  width: 12em;
}
.addbtn:hover {
  background-color: #366ad9;
}
.savebtn:hover,.exportbtn:hover{
    background-color:#2248b8 ;
}

.savebtn,.exportbtn{
    background-color: #2f4587;
    color: #fff;
    width: 7em;
}
.cancel{
  border: 1px solid gray;
  width: 7em;
}
.cancel:hover{
  background-color: rgb(192, 189, 189);
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
.table-header {
  background-color: #366ad9;
  /* border-radius: 5px; */
}
th {
  text-align: center;
  padding-bottom: 8px;
  padding-top: 4px;
}
td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
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
.searchbtn {
  cursor: pointer;
}
.search {
  height: 8px !important;
  padding: 0;
  background-color: #fff;
}
.search input {
  border-right: none;
  box-shadow: none !important;
}
.search span {
  background-color: #fff;
  border-left: none;
}
.searchbtn:hover {
  color: #366ad9;
}
.chivronbtn {
  border: none;
  background-color: #fff;
  color: rgba(179, 175, 175, 0.849);
}
.active {
  color: rgb(15, 15, 15);
}
.fas:hover{
  color: #366ad9;
  cursor: pointer;
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
</style>
