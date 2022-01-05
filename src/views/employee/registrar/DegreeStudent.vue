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
    <div class="d-flex justify-content-between">
     <div class="input-group mt-3 search w-25">
  <input type="text" class="form-control px-0" placeholder="Search By Student ID" aria-label="Username" aria-describedby="addon-wrapping" v-model="searchValue">
   <span class="searchicon input-group-text" id="addon-wrapping"><i class="fas fa-search"></i></span>
</div>
  <div class="d-flex mt-3">
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
  <option value="all">All Batch</option>
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
<div class="mb-3">
<select class="form-select form-select-sm" aria-label="Default select example" v-model ="stateForFilter">
  <option value="all">All State</option>
  <option value="waiting">Waiting</option>
  <option value="approved">Approved</option>
  </select>
</div>
  </div>
  </div>
  <div class="degreestudentlist">
    <span>{{yearNo+' '+semesterName+' '+departmentName+' '+ programName+' '+stateName+' Students'}}</span>
     <table class="mt-3">
  <thead>
    <tr class="table-header">
      <th class="text-white px-2">NO</th>
       <th class="text-white px-2">Stud ID</th>
      <th class="text-white px-2">Full Name</th>
      <th class="text-white px-2">sex</th>
      <th class="text-white px-2">progarm</th>
      <th class="text-white px-2">Department</th>
      <th class="text-white px-2">Year</th>
      <th class="text-white px-2">Semester</th>
      <th class="text-white px-2">current State</th>
      <th><span class="sr-only px-2">action</span></th>
    </tr>
  </thead>
  <tbody>
     <tr v-for="(student,index) in filteredStudents" :key="student.id">
      <td>{{index+1}}</td>
      <td>{{student.student_id}}</td>
      <td>{{student.first_name+" "+student.last_name}}</td>
      <td>{{student.sex}}</td>
      <td>{{student.program.name}}</td>
      <td>{{student.department.name}}</td>
      <td>{{student.year_no}}</td>
      <td>{{semesterForFilter}}</td>
      <td>{{semester?.status}}</td>
      <td>
        <div class="dropdown">
          <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v"></i></span>
          </a>

          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink border rounded shadow-sm">
             <li><span @click="editTeacher(student,'edit')" class="dropdown-item px-4 py-2">edit</span></li>
             <li><span @click="viewDetail(student.id)" class="dropdown-item px-4 py-2">View Detail</span></li>
          </ul>
        </div>
    </td>
    </tr>
  </tbody>   
</table>
<div v-if="filteredStudents.length" class="d-flex justify-content-end mt-3 me-5">
<div class="rowsperpage me-3">
Rows per Page
</div>
<div class="limit col-sm-1 me-3">
<select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="rowNumber">
  <option v-for="n in 14" :key="n" :value="n">{{n}}</option>
  
</select>
</div>
<div class="pageno me-3">
1-10 of 50
</div>
<div class="leftchivron ms-3 me-3">
<button @click="backChivron()" class="chivronbtn"><i class="fas fa-chevron-left"></i></button>
</div>
<div class="rightchivron"><button @click="forWardChivron()" class="chivronbtn"><i class="fas fa-chevron-right"></i></button></div>
</div>
</div>
    </base-card>
   
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
    //  degreeStudentList:[],
    //  sex:'male',
    //  program:'5',
    //  department:'4',
    //  year:'1',
    //  semester:'1',
    //  studentList:[],
    //  studentId:'',
        rowNumber:8,
    searchValue:'',
    departmentForFilter:'all',
     programForFilter:'all',
     semesterForFilter:'1',
     stateForFilter:'all', 
     yearForFilter:'all',
     //

    }
  },
   computed:{
    ...mapGetters('dean',['degreeDepartments','degreePrograms']),
    degreeStudents(){
     return this.$store.getters['registrar/degreeStudents']
    },
     filteredStudents(){
         var tempStudents=[]
         this.degreeStudents.forEach((student)=>{
            if(Number(student.semester_no)===Number(this.semesterForFilter)){
                   tempStudents = student.students
            }
         })
    
      if(this.searchValue!==''){
         tempStudents=tempStudents.filter((student)=>{
            return student?.student_id?.toLowerCase().includes(this.searchValue.toLowerCase())
         })
      }
      if(this.yearForFilter!=='all'){
         tempStudents=tempStudents.filter((student)=>{
            return student.year_no.toString()===this.yearForFilter.toString()
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
this.degreePrograms.forEach(program=>{
  if(newValue === program.id){
    this.programName = program.name
  }
})
    },
    yearForFilter(newValue){
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
  }
  },
  created() {
    this.degreeStudents.forEach((student)=>{
    if(Number(student.semester_no) === Number(this.semesterForFilter)){
      this.tempStudents= student
    }
         })
  },
      methods: {
        printDegreeStudent(){
          this.$htmlToPaper('degreestudentlist');
        },
      addStudent(){
        this.$router.push({name:'DegreeStudentRegistration'})
      },
     async viewDetail(id){
       this.$store.dispatch('registrar/fetchDegreeStudentDetail',id).then(()=>{
            this.$router.push({name:'DegreeStudentDetail',params:{degreeStudId:id}})
       })
      //  try{
      //    this.studentId = id
      //    var response = await apiClient.get('api/student_semesters/'+id)
      //    if(response.status === 200){
      //      this.studentSemesters = response.data
      //      this.programId = response.data.program.id
      //       this.isStudentDetail = true
      //       console.log('program id ='+this.programId)
      //    }
      //  }
      //  catch(e){
      //    console .log('error')
      //  }
      //  finally{
      //     this.$store.commit('setIsItemLoading',false)
      //  }
      },

    
    },

}
</script>
<style scoped>
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