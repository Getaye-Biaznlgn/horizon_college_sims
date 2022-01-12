<template>
  <base-card>
    <div class="d-flex justify-content-end">
      <button @click="addStudent" class="btn p-1 addbtn">
        Register New Student
      </button>
      <button @click="printTvetStudent()" class="btn ms-3 p-1 exportbtn addbtn">
        <span class="me-3"><i class="fas fa-upload"></i></span>
        <span>Export</span>
      </button>
    </div>
    <div class="d-flex justify-content-between">
      <div class="input-group mt-3 search w-25">
        <input
          type="text"
          class="form-control"
          placeholder="Search By Student ID"
          aria-label="Username"
          aria-describedby="addon-wrapping"
          v-model="searchValue"
        />
        <span
          @click="searchById()"
          class="input-group-text searchbtn"
          id="addon-wrapping"
          ><i class="fas fa-search"></i
        ></span>
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
          <select
            class="form-select form-select-sm"
            aria-label="Default select example"
            v-model="scholarForFilter"
          >
            <option value="all">All Scholarship</option>
            <option value="none">none</option>
            <option value="fully">fully schlar</option>
            <option value="partial">partialy scholar</option>
          </select>
        </div>
        <div class="ms-2 mb-3">
          <select
            class="form-select form-select-sm"
            aria-label="Default select example"
            v-model="stateForFilter"
          >
            <option value="all">All State</option>
            <option value="waiting">waiting</option>
            <option value="approved">approved</option>
          </select>
        </div>
      </div>
    </div>
    <table v-if="filteredStudents?.length" class="mt-3" id="tvetstu">
      <thead>
        <tr class="table-header">
          <th class="text-white">NO</th>
          <th class="text-white">Stud ID</th>
          <th class="text-white">Full Name</th>
          <th class="text-white">sex</th>
          <th class="text-white">Department</th>
          <th class="text-white">progarm</th>
          <th class="text-white">Level</th>
          <th class="text-white">Scholarship</th>
          <th class="text-white">State</th>
          <th><span class="sr-only">action</span></th>
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
          <td>
        <span v-if="student === 'approved'">{{student.status}}</span>
        <span v-else><button @click="approveStudent(student)" class="btn approved">approve</button></span>
      </td>
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
                <li><span @click="viewDetail(student.id)" class="dropdown-item px-4 py-2"                  >View Detail</span
                  >
                </li>
                <li>
                  <span
                    @click="deleteStudent(student.id)"
                    class="dropdown-item px-4 py-2"
                    >delete</span
                  >
                </li>
              </ul>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="text-center error">
      Students  not found
    </div>
  </base-card>
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
      }
     
    };
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
    academicYearId(){
      return this.$store.getters.acYearId
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
     // this.queryData.level_no = this.levelForFilter
 this.$store.dispatch('registrar/fetchTvetStudents',newValue)
    },
        levelForFilter(newValue){
     // this.queryData.academic_year_id = this.academicYearId
      this.queryData.level_no = newValue
 this.$store.dispatch('registrar/fetchTvetStudents',this.queryData)
    }
  },
  methods: {
    addStudent() {
      this.$router.push({ name: "TvetStudentRegistration" });
    },
    printTvetStudent() {
      this.$HtmlToPaper("#tvetstu");
    },
    viewDetail(id) {
            this.$store.dispatch('registrar/fetchTvetStudentDetail',id).then(()=>{
            this.$router.push({name:'TvetStudentDetail',params:{tvetStudId:id}})
      })
      },
     async approveStudent(studentvalue){
         var student={}
         student.student_id= studentvalue.id,
         student.semester_id= studentvalue.semester_id
         
          try{
         var response = await apiClient.post('api/degree_approve',student)
         if(response.status === 200){
           studentvalue.status = 'approved'
         }
          }
          catch(e){
            console.log(e)
          }
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
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
.table-header {
  background-color: #366ad9;
  border-radius: 5px;
}
th {
  text-align: center;
  padding: 8px;
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
  color: red;
}
</style>
