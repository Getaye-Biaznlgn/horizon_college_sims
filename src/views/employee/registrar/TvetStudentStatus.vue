<template>
      <base-card>
      <span @click="back()" class="backarrow ms-3 mt-2"><i class="fas fa-arrow-left"></i></span>
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
        <table class="mt-4">
          <thead>
            <tr class="table-header">
              <th class="text-white">Level</th>
              <th class="text-white">Year</th>
              <th class="text-white">State</th>
              <th class="text-white"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="level in studentLevels.levels" :key="level.id">
              <td>{{ "level " + level.level_no }}</td>
              <td>{{ level.year }}</td>
              <td>{{ level.status }}</td>
              <td>
                <div class="dropdown">
                  <a
                    class="btn py-0"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span><i class="fas fa-ellipsis-v"></i></span>
                  </a>

                  <ul
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuLink border rounded shadow-sm">
                    <li><span @click="viewModules(level.id)" class="dropdown-item px-4 py-2">View Modules</span></li>
                    <li v-if="isActiveYear(level.academic_year_id)">
                      <span @click="editLevel(level.id,level.academic_year_id)" class="dropdown-item px-4 py-2">Edit Level</span></li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="d-flex justify-content-end mt-5 mb-2">
        <button @click="registerForLevel()" class="btn ms-3 me-1 p-1 register addbtn">Register for New Level
          </button>
        </div>
      </base-card>
  <div v-if="isNewLevel" class="editwraper mb-4">
    <div class="dialogcontent ms-auto me-auto pt-5 w-50">
      <base-card>
        <div class="ms-4 mb-3 me-4">
          <span>Academic Year</span>
          <select
            class="form-select mt-1"
            aria-label="Default select example"
            ref="acYearId"
          >
            <option
              v-for="acYear in academicYears"
              :key="acYear.id"
              :value="acYear.id"
            >
              {{ acYear.year }}
            </option>
          </select>
        </div>
        <div class="ms-4 mb-3 me-4">
          <span>Level</span>
          <select class="form-select mt-1" aria-label="Default select example" ref="levelId">
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
      <div class="w-75 ms-auto me-auto mt-5 border rounded shadow-sm bg-white mb-3">
    
        <div class="d-flex justify-content-end me-5">
              <span @click="isViewModule = false" class="mt-2 close fs-2"><i class="far fa-times-circle"></i></span>
        </div>
        <div class="courseview">
      <table class="viewcourseTable">
  <thead>
      <tr class="table-header">
      <th class="text-white p-3">Title</th>
      <th class="text-white p-3">Module Code</th>
      <th class="text-white p-3">Training Hours</th>
      <th class="text-white py-3">Result form 100%</th>
      </tr>
      </thead>
  <tbody>
  <tr v-for="module in levelModules" :key="module.id">
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
          <select class="form-select mt-1" aria-label="Default select example" v-model="acYearId">
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
      isSuccessed: true,
      isFaild: false,
      resultNotifier: "",
      isViewModule:false,
      // isEnterResult:false,
      levelModules:'', 
      isEdit:false,
      acYearId:'',
      newLevelId:'',
      oldLevelId:''
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
         var response = await apiClient.get(`api/level_modules/${this.student_id}?level_id=${id}`)
         if(response.status === 200){
           this.levelModules = response.data
            this.isViewModule = true
            console.log('semester modules ='+this.student_id)
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
      editLevel(levelId,acYearId){
        this.isEdit = true
        this.newLevelId = levelId
        this.oldLevelId = levelId
        this.acYearId = acYearId
      },
     async finishToEditLevel(){
       this.isLoading = true
        try{
         var response = await apiClient.put(`api/update_student_for_level/${this.tvetStudId}?level_id=${this.newLevelId}&old_level_id=${this.oldLevelId}&academic_year_id=${this.acYearId}`)
         if(response.status === 201){
          this.resultNotifier='successfuly updated'
          console.log('response',response.data)
          var tempStudents = this.studentLevels
          var index = tempStudents.levels.findIndex(level=>{
            return Number(level.id) === Number(this.oldLevelId)
          })
          tempStudents.levels[index].level_no = response.data.level_no
          this.$store.commit('registrar/setTvetStudentDetails',tempStudents)

         }
        }
        finally{
          this.isLoading = false
           this.isEdit = false
        }
      },
      cancelLevelEdition(){
       this.isEdit = false
      },
      isActiveYear(id){
        var isCurrent = false
        this.academicYears.forEach(year=>{
          if(Number(year.is_current) === 1 && year.id === id){
            isCurrent = true
          }
        })
        return isCurrent
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