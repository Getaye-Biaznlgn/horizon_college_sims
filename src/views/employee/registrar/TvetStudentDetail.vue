<template>
      <base-card>
      <span @click="back()" class="backarrow ms-3 mt-2"><i class="fas fa-arrow-left"></i></span>
        <div class="d-flex justify-content-between mt-2">
          <div class="nameanid ms-5">
            <div class="d-flex">
              <span><strong>Student Name:</strong></span>
              <span class="ms-2">{{ studentLevels.name }}</span>
            </div>
            <div class="d-flex mt-2">
              <span><strong>ID NO: </strong></span>
              <span class="ms-2">{{ studentLevels.student_id }}</span>
            </div>
            <div class="d-flex mt-2">
              <span class="ms-2"><strong>Sex: </strong></span>
              <span>{{ studentLevels.sex }}</span>
            </div>
          </div>
          <div class="deptandprogram me-5">
            <div class="d-flex">
              <span class="ms-2"><strong>Department : </strong></span>
              <span>{{ studentLevels.department.name }}</span>
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
              <th class="text-white">Time</th>
              <th class="text-white">State</th>
              <th class="text-white"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="level in studentLevels.levels" :key="level.id">
              <td>{{ "level " + level.level_no }}</td>
              <td>{{ level.year }}</td>
              <td>start end</td>
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
                    aria-labelledby="dropdownMenuLink border rounded shadow-sm"
                  >
                    <li>
                      <span @click="enterResult(level.id)" class="dropdown-item px-4 py-2"
                        >Enter Result</span
                      >
                    </li>
                    <li>
                      <span
                        @click="viewModules(level.id)"
                        class="dropdown-item px-4 py-2"
                        >View Modules</span
                      >
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="d-flex justify-content-end mt-5 mb-2">
        <button
            @click="registerForLevel()"
            class="btn ms-3 me-1 p-1 register addbtn"
          >
            Register for New Level
          </button>
        </div>
      </base-card>
  <div v-if="isNewLevel" class="editwraper mb-4">
    <div class="dialogcontent ms-auto me-auto pt-5 w-50">
      <base-card>
        <div class="ms-4 mb-3 me-4">
          <span>Academic Year</span>
          <select
            class="form-select form-select-sm mt-1"
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
          <select
            class="form-select form-select-sm mt-1"
            aria-label="Default select example"
            ref="levelId"
          >
            <option
              v-for="level in departmentBasedLevels"
              :key="level.id"
              :value="level.id"
            >
              {{ "Level " + level.level_no }}
            </option>
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
          <button @click="finishToRegister()" class="btn exportbtn me-4 finish">
            <span v-if="isLoading" class="btn py-1">
              <span
                class="spinner-border spinner-border-sm text-white"
                role="status"
                aria-hidden="true"
              ></span
              >Registering</span
            >
            <span v-else>Register</span>
          </button>
        </div>
      </base-card>
    </div>
  </div>
      <div v-if="isViewModule" class="editwraper mb-4">
          <div class="w-75 ms-auto me-auto">
              <base-card>
    <div class="courseview border rounded shadow-lg py-5">
        <div class="d-flex justify-content-end me-5">
              <span @click="isViewModule = false" class="mt-2 close fs-2"><i class="far fa-times-circle"></i></span>
        </div>
      <table class="viewcourse">
  <thead>
      <tr class="table-header">
      <th class="text-white p-3">Title</th>
      <th class="text-white p-3">Module Code</th>
      <th class="text-white p-3">Training Hours</th>
      <th class="text-white p-3">Result form 100%</th>
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
              </base-card>
          </div>

    </div>
     <div v-if="isEnterResult" class="editwraper mb-4">
      <div class="w-75 ms-auto me-auto py-5">
            <base-card>
          <div class="d-flex justify-content-end me-5">
        <span @click="isEnterResult = false" class="mt-2 close fs-2"><i class="far fa-times-circle"></i></span>
      </div>
    <div class="courseview border rounded shadow ms-auto me-auto">      
      <table class="viewcourse">
  <thead>
      <tr class="table-header">
      <th class="text-white p-3">module Title</th>
      <th class="text-white p-3">module Code</th>
      <th class="text-white p-3">Result form 100%</th>
      </tr>
      </thead>
  <tbody v-if="levelModules.length">
  <tr v-for="module in levelModules" :key="module.id">
  <td>{{module.title}}</td>
  <td>{{module.code}}</td>
  <td>
    <span v-if="module.total_mark">{{module.total_mark}}</span>
    <span v-else class="ms-5 me-5">
      <input class="form-control form-control-sm w-50" type="number" :ref="`result${module.id}`"  @blur="setResult(module.id)"></span>
  </td>
  </tr>
  </tbody>
  <div v-else class="mt-4 ms-5 mb-5">
    <span class="error">There is no modules found for this semester</span>
  </div>
  
    </table>
    <div v-if="levelModules.length" class="p-4 d-flex">
      <button @click="submitmoduleResult()" class="btn exportbtn ms-auto">Submit</button>
    </div>
    </div>
            </base-card>
      </div>
    </div>
</template>
<script>
import apiClient from '../../../store/baseUrl'
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
      isEnterResult:false,
      levelModules:'', 
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
     methods: {
                 back(){
        this.$router.back()
      },
          registerForLevel() {
      this.isNewLevel = true;
      this.resultNotifier = "";
      this.student_id = this.studentLevels.id
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
        if (response.status === 200) {
          console.log(response.data);
          this.isFaild = false;
          this.isSuccessed = true;
          this.resultNotifier = "You have registered student succesfully";
        }
      } catch (e) {
        this.isFaild = true;
        this.isSuccessed = false;
        this.resultNotifier = "registration is faild";
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
     async enterResult(id){
         this.student_id = this.studentLevels.id
      this.$store.commit('setIsItemLoading',true)
       try{
         var response = await apiClient.get(`api/level_modules/${this.student_id}?semester_id=${id}`)
         if(response.status === 200){
           this.levelModules = response.data
            this.isEnterResult = true
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
      setResult(id){
        var result = {}
        result.id = id
        result.total_mark = this.$refs['result'+id].value
        this.modules.push(result)
          console.log('result added=')
          console.log(this.modules)
      },
           async submitModuleResult(){
         this.student_id = this.studentLevels.id
       console.log('results sent to the server')
       console.log(this.modules)
       var response = await apiClient.post('api/give_module_result/'+this.student_id,{modules:this.modules})
       if(response.status === 200){
        console.log('successfuly submited')
        console.log(response.data)
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
    background-color: rgba(17, 17, 17, 0.5);
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
  .error{
    color: rgb(253, 7, 7);
  }
</style>