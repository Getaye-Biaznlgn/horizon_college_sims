<template>
      <base-card>
      <div class="d-flex justify-content-between">
     <div><span @click="back()" class="backarrow ms-3 mt-2"><i class="fas fa-arrow-left"></i></span></div>
       <button @click="printTvetStudentStatus()" class="btn me-2 p-1 exportbtn">
    <span class="me-1 py-0"><i class="fas fa-upload"></i></span>
    <span class="py-0">Export</span>
    </button>
      </div>
      <div id="studentStatus" class="mt-2">
        <div class="d-flex justify-content-between mt-2">
          <div class="nameanid ms-5">
            <div class="d-flex">
              <span><strong>Student Name:</strong></span>
              <span class="ms-2">{{ studentLevels?.name }}</span>
            </div>
            <div class="d-flex mt-2">
              <span><strong>ID NO: </strong></span>
              <span class="ms-2">{{ studentLevels?.student_id }}</span>
            </div>
            <div class="d-flex mt-2">
              <span><strong>Sex: </strong></span>
              <span>{{ studentLevels?.sex }}</span>
            </div>
          </div>
          <div class="deptandprogram me-5">
            <div class="d-flex">
              <span class="ms-2"><strong>Department : </strong></span>
              <span>{{ studentLevels.department?.name }}</span>
            </div>
            <div class="d-flex mt-2">
              <span class="ms-2"><strong>Program : </strong></span>
              <span>{{ studentLevels.program }}</span>
            </div>
            <div class="d-flex mt-2">
              <span class="ms-2"><strong>Level : </strong></span>
              <span>{{ studentLevels.current_level_no }}</span>
            </div>
          </div>
        </div>
        <div class="ms-5 mt-3 sr-only">Acadamic Status</div>
        <table class="mt-2">
          <thead>
            <tr class="table-header">
              <th class="text-white">Level</th>
              <th class="text-white">Year</th>
              <th class="text-white">State</th>
              <th v-if="!isPrinting" class="text-white"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="level in studentLevels.levels" :key="level.id">
              <td>{{ "level " + level.level_no }}</td>
              <td>{{ level.year }}</td>
              <td>{{ level.status }}</td>
              <td v-if="!isPrinting">
                <div class="dropdown">
                  <a class="btn py-0" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    <span><i class="fas fa-ellipsis-v"></i></span>
                  </a>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuLink border rounded shadow-sm">
                    <li><span @click="viewModules(level.id)" class="dropdown-item px-4 py-2">View Modules</span></li>
                     <li><span @click="giveMoguleResult(level)" class="dropdown-item px-4 py-2">Give Module Result</span></li>
                    <li v-if="level.status!=='finished'">
                      <span  @click="editLevel(level)" class="dropdown-item px-4 py-2">Edit Level</span></li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
        <div class="d-flex mt-5 mb-2">
           <span v-if="!checkCompletion()" class="faild ms-5">Ther is Incomplete Level</span>
        <button @click="registerForLevel()" class="btn ms-3 me-1 p-1 register addbtn ms-auto" :disabled="!checkCompletion()">Register for New Level
          </button>
        </div>
      </base-card>
  <div v-if="isNewLevel" class="editwraper mb-4">
    <div class="dialogcontent ms-auto me-auto pt-5 w-50">
      <base-card>
        <div class="ms-4 mb-3 me-4">
          <span>Academic Year</span>
          <select class="form-select mt-1" aria-label="Default select example" ref="acYearId">
            <option v-for="acYear in academicYears" :key="acYear.id" :value="acYear.id">{{ acYear.year }}</option>
          </select>
        </div>
        <div class="ms-4 mb-3 me-4">
          <span>Level</span>
          <select class="form-select mt-1" aria-label="Default select example" ref="levelId">
            <option v-for="level in departmentBasedLevels" :key="level.id" :value="level.id">{{ "Level " + level.level_no }}</option>
          </select>
        </div>
        <p class="ms-5 mt-3 text-center" :class="{ success: isSuccessed, faild: isFaild }">
          {{ resultNotifier }}
        </p>
        <div class="d-flex justify-content-end mt-3 pt-3">
          <button @click="cancelRegistration()" class="btn cancel me-4">
            Cancel
          </button>
          <button @click="finishToRegister()" class="btn exportbtn me-4 px-1">
            <span v-if="isLoading">
              <span class="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>Registering</span>
            <span v-else>Register</span>
          </button>
        </div>
      </base-card>
    </div>
  </div>
      <div v-if="isViewModule" class="editwraper">
      <div class="resultContainer ms-auto me-auto mt-4 border rounded shadow-sm bg-white pb-4">
    
        <div class="d-flex justify-content-end me-5">
              <span @click="isViewModule = false" class="mt-2 close fs-2"><i class="far fa-times-circle"></i></span>
        </div>
        <div class="result">
      <table class="viewcourseTable">
  <thead>
      <tr class="table-header">
        <th class="text-white p-3">NO</th>
      <th class="text-white p-3">Title</th>
      <th class="text-white p-3">Module Code</th>
      <th class="text-white p-3">Training Hours</th>
      <th class="text-white py-3">Result form 100%</th>
      </tr>
      </thead>
  <tbody>
  <tr v-for="(module,index) in levelModules" :key="module.id">
    <td>{{index+1}}</td>
  <td>{{module.title}}</td>
  <td>{{module.code}}</td>
  <td>{{module.training_hour}}</td>
  <td>{{module.total_mark}}</td>
  <td>{{module.grade_point}}</td>
  </tr>
  </tbody>
    </table>
    </div>
              </div>

    </div>
     <div v-if="isEdit" class="editwraper mb-4">
    <div class="dialogcontent ms-auto me-auto pt-5 w-50">
      <base-card>
        <div class="ms-4 mb-3 me-4">
          <span>Academic Year</span>
          <select class="form-select mt-1" aria-label="Default select example" v-model="newAcYearId">
            <option v-for="acYear in academicYears" :key="acYear.id" :value="acYear.id">{{ acYear.year }}</option>
          </select>
        </div>
        <div class="ms-4 mb-3 me-4">
          <span>Level</span>
          <select class="form-select mt-1" aria-label="Default select example" v-model="newLevelId">
            <option v-for="level in departmentBasedLevels" :key="level.id" :value="level.id">{{ "Level " + level.level_no }}</option>
          </select>
        </div>
        <p
          class="ms-5 mt-3 text-center"
          :class="{ success: isSuccessed, faild: isFaild }"
        >
          {{ resultNotifier }}
        </p>
        <div class="d-flex justify-content-end mt-3 pt-3">
          <button @click="cancelLevelEdition()" class="btn cancel me-4">
            Cancel
          </button>
          <button @click="finishToEditLevel()" class="btn exportbtn me-4 px-1">
            <span v-if="isLoading">
              <span class="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>Registering</span>
            <span v-else>Register</span>
          </button>
        </div>
      </base-card>
    </div>
  </div>
   <div v-if="isGiveResult" class="editwraper pb-5">
      <div class="resultContainer ms-auto me-auto border rounded shadow-sm bg-white pb-3">
       <div class="d-flex justify-content-end p-0">
        <span @click="isGiveResult = false" class="close fs-2 me-5"><i class="far fa-times-circle"></i></span>
      </div>
        <div class="moduleResult">
      <table class="viewcourse">
  <thead>
      <tr class="table-header">
        <th class="text-white p-3">NO</th>
      <th class="text-white p-3">Title</th>
      <th class="text-white p-3">Course Code</th>
      <th class="text-white p-3">Result from 20%</th>
      <th class="text-white p-3">Result from 30%</th>
      <th class="text-white p-3">Result from 50%</th>
      <th class="text-white p-3">Total from 100%</th>
      <th class="text-white p-3"></th>
      </tr>
      </thead>
  <tbody>
  <tr v-for="(mogule,index) in levelModules" :key="mogule.id">
    <td>{{index+1}}</td>
  <td>{{mogule.title}}</td>
  <td>{{mogule.code}}</td>
  <td><input type="number" min="0" max="20" v-model="mogule.from_20" @input="calculetTotal($event,mogule)"></td>
  <td><input type="number" min="0" max="30" v-model="mogule.from_30" @input="calculetTotal($event,mogule)"></td>
  <td><input type="number" min="0" max="50" v-model="mogule.from_50" @input="calculetTotal($event,mogule)"></td>
   <td><input type="number" v-model="mogule.total_mark" disabled></td>
  <td><button @click="setResult(mogule)" class="btn savebtn p-1" :disabled="Number(mogule.is_changed) === 0">Save</button></td>
  </tr>
  </tbody>
    </table>
     <div v-if="!levelModules.length" class="mt-4 ms-5 mb-3">
    <span>There is no Modules found for this semester</span>
  </div>
    </div>
      </div>
    </div>
</template>
<script>
import apiClient from '../../../resources/baseUrl'
import {mapGetters} from 'vuex'
export default {
    props:['tvetStudId'],
    data() {
        return {
      isNewLevel: false,
      student_id: '',
      isLoading: false,
      isSuccessed: false,
      isFaild: false,
      resultNotifier: "",
      isViewModule:false,
      // isEnterResult:false,
      levelModules:'', 
      isEdit:false,
      newAcYearId:'',
      oldAcYearId:'',
      newLevelId:'',
      oldLevelId:'',
      isGiveResult:false,
      selectedLevelId:'',
      isPrinting:false
        }
    },
     computed: {
    ...mapGetters("dean", ["tvetDepartments", "tvetPrograms"]),
    tvetStudents() {
      return this.$store.getters["registrar/tvetStudents"];
    },
    academicYears() {
      return this.$store.getters["academicYears"];
    },
    levels() {
      return this.$store.getters["registrar/levels"];
    },
     studentLevels() {
      return this.$store.getters["registrar/tvetStudentDetail"];
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
     },
       watch:{
      tvetStudId(newValue){
          this.$store.dispatch('registrar/fetchTvetStudentDetail',newValue)
      }
    },
    created() {
       this.$store.dispatch('registrar/fetchTvetStudentDetail',this.tvetStudId)
    },
     methods: {
                 back(){
        this.$router.back()
      },
      printTvetStudentStatus(){
          this.isPrinting = true
        var timeOutFunction = setTimeout(()=>{
          this.$htmlToPaper('studentStatus',null,()=>{
            this.isPrinting = false
            clearTimeout(timeOutFunction)
          })
        },0)
        },
      checkCompletion(){
        var isCompleted = true
        this.studentLevels.levels?.forEach(level=>{
          if(level.status !== 'finished'){
            isCompleted = false
            return
          }
          
        })
        return isCompleted
      },
          registerForLevel() {
      this.isNewLevel = true;
      this.resultNotifier = "";
      this.student_id = this.studentLevels.id
      console.log('student status',this.studentLevels)
    },

    cancelRegistration() {
      this.isNewLevel = false;
    },
    async finishToRegister() {
      this.isLoading = true;
      var level = {};
      level.student_id = this.studentLevels.id;
      level.academic_year_id = this.$refs.acYearId.value;
      level.level_id = this.$refs.levelId.value;
      try {
        var response = await apiClient.post("api/register_student_for_level",level);
        console.log("status code = " + response.status);
        if (response.status === 201) {
          console.log(response.data);
          this.isFaild = false;
          this.isSuccessed = true;
          this.resultNotifier = "You have registered student succesfully";
          var previousLevels = this.studentLevels
          previousLevels.levels.push(response.data)
          this.$store.commit('registrar/setTvetStudentDetails',previousLevels)
          this.$store.commit('setNotifications',Number(this.notifications) + 1)
          
        }
        else if(response.status === 200){
           this.isFaild = true;
          this.isSuccessed = false;
          this.resultNotifier = "This Student is already registerd for this Level";
        }
      } catch (e) {
        this.isFaild = true;
        this.isSuccessed = false;
        this.resultNotifier = "registration for this level is faild";
        console.log("error");
      } finally {
        this.isLoading = false;
      }
    },
         async viewModules(id){
             this.student_id = this.studentLevels.id
          this.$store.commit('setIsItemLoading',true)
       try{
         var response = await apiClient.get(`api/level_modules/${this.tvetStudId}?level_id=${id}`)
         if(response.status === 200){
           this.levelModules = response.data
            this.isViewModule = true
            console.log('level modules ='+this.student_id)
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
      editLevel(level){
        this.isEdit = true
        this.newLevelId = level.id
        this.oldLevelId = level.id
        this.oldAcYearId = level.academic_year_id
        this.newAcYearId = level.academic_year_id
        this.resultNotifier = ''
      },
     async finishToEditLevel(){
       this.isLoading = true
        try{
         var response = await apiClient.put(`api/update_student_for_level/${this.tvetStudId}?level_id=${this.newLevelId}&old_level_id=${this.oldLevelId}&academic_year_id=${this.newAcYearId}&old_academic_year_id=${this.oldAcYearId}`)
         if(response.status === 201){
          this.resultNotifier='successfuly Edited'
          this.isSuccessed = true
          this.isFaild = false
          console.log('response',response.data)
          var tempStudents = this.studentLevels
          var index = tempStudents.levels.findIndex(level=>{
            return Number(level.id) === Number(this.oldLevelId)
          })
          tempStudents.levels[index].level_no = response.data.level_no
           tempStudents.levels[index].year = response.data.year
          this.$store.commit('registrar/setTvetStudentDetails',tempStudents)

         }
         else if(response.status === 200){
           this.resultNotifier = response.data.error
           this.isSuccessed = false
          this.isFaild = true
         }
        }
        finally{
          this.isLoading = false
        }
      },
      cancelLevelEdition(){
       this.isEdit = false
      },
      // isActiveYear(id){
      //   var isCurrent = false
      //   this.academicYears.forEach(year=>{
      //     if(Number(year.is_current) === 1 && year.id === id){
      //       isCurrent = true
      //     }
      //   })
      //   return isCurrent
      // },
       calculetTotal(event,mogule){
         mogule.is_changed = 1
      var totalMark = Number(mogule.from_20) + Number(mogule.from_30) +Number(mogule.from_50)
      mogule.total_mark = totalMark
      },
        async giveMoguleResult(level){
          this.selectedLevelId = level.id
         if(Number(level.is_allowed_now)=== 0){
           this.$store.commit('setAlertMessages',{
                text:'Student result entry date is passed!',
                type:'danger'
              })
         }
          else if(Number(level.legible)=== 0){
           this.$store.commit('setAlertMessages',{
                text:'This studdent do not paid his/her tuition fee!',
                type:'danger'
              })
         }
         else{
         this.$store.commit('setIsItemLoading',true)         
       try{
         var response = await apiClient.get(`api/level_modules/${this.tvetStudId}?level_id=${level.id}`)
         if(response.status === 200){
           this.levelModules = response.data
           this.isGiveResult = true
            console.log('mogules',response.data)
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
       async setResult(mogule){
         mogule.level_id = this.selectedLevelId
         if(mogule.from_20 <= 20 && mogule.from_30 <= 30 && mogule.from_50 <= 50){
        console.log('course result sent to server',mogule)

        try{
        var response = await apiClient.post('api/give_module_result/'+this.tvetStudId,mogule)
        if(response.status === 200){
          console.log('result successfully sent')
          mogule.is_changed = 0
           this.$store.commit('setAlertMessages',{
                text:'Result is saved!',
                type:'success'
              })
          console.log('mogule result from server',response.data)
        }
         }
          catch(e){
            this.$store.commit('setAlertMessages',{
                text:'Faild to save!',
                type:'danger'
              })
         }
          }
         
         else{
this.$store.commit('setAlertMessages',{
                text:'Incorrect Value!',
                type:'danger'
              })
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
   width: 100%;
   height: 75vh;
   overflow-y: auto;
}
.viewcourseTable th{
  background-color: #fff;
  color: rgb(17, 17, 17)!important;
  font-size: 16px;
}
.viewcourseTable tr{
  padding-top: 4px;
  padding-bottom: 4px;
  border-top: 2px solid rgb(240, 243, 245);
  border-bottom: 2px solid rgb(240, 243, 245);
}
.viewcourseTable td{ 
  padding: 10px;
  padding-left: 15px;
  border-left: none;
  border-right: none;
   border-top: 2px solid rgb(240, 243, 245);
  border-bottom: 2px solid rgb(240, 243, 245);
}
.close{
  cursor: pointer;
}
.close:hover{
  color: #366ad9;
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
.resultContainer{
  width: 96%;
  margin-top: 2%;
  margin-bottom: 2%;
}
.result{
   width: 100%;
   height: 80vh;
   overflow-y: auto;
}
.moduleResult{
  width: 100%;
   height: 70vh;
   overflow-y: auto;
}
/* .viewMogule{
  height: 80%!important;
  margin-bottom: 5%!important;
  overflow-y: scroll;
} */
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
  }
</style>