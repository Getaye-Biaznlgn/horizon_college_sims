<template>
<div class="border rounded shadow-sm m-3 bg-white pb-3">
<div class="mt-3 d-flex justify-content-between align-items-center">
    <div class="d-flex">
 <div class="ms-4 mb-2">
 <span>Department</span>
  <select class="form-select form-select-sm" aria-label=".form-select-sm example" ref="degreeDptId">
  <option v-for="department in degreeDepartments" :key="department.id" :value="department.id">{{department.name}}</option>
</select>
</div>
 <div class="ms-5 mb-2">
<span>Program</span>
  <select class="form-select form-select-sm" aria-label=".form-select-sm example" ref="programId">
  <option v-for="Program in degreePrograms" :key="Program.id" :value="Program.id">{{Program.name}}</option>
</select>
</div>
    </div>
      <div class="d-flex justify-content-end mt-3">
    <button @click="printGraduatedDegreeStudent()" class="btn me-1 addbtn me-3 p-1">
    <span class="me-3"><i class="fas fa-upload"></i></span>
    <span>Export</span>
    </button>
      </div>
     </div>
     <div id="degreeGraguate">
        <div class="ms-5 mt-3 sr-only fw-bold">{{'List of Degree students graduated in ' +selectedYearName}}</div>
      <table class="viewcourse courseview mt-2">
  <thead>
      <tr class="table-header">
      <th class="text-white mx-2 py-2">NO</th>
      <th class="text-white py-2">ID</th>
      <th class="text-white py-2">Full Name</th>
      <th class="text-white py-2">Sex</th>
      <th class="text-white py-2">Department</th>
      <th class="text-white py-2">Program</th>
      </tr>
      </thead>
  <tbody>
  <tr v-for="(student, index) in degreeGraduates.data" :key="student.id">
  <td class="px-3">{{queryObject.per_page*degreeGraduates.current_page +index+1 - queryObject.per_page}}</td>
  <td class="py-2">{{student.student_id}}</td>
  <td class="py-2">{{student.first_name+' '+student.last_name}}</td>
  <td class="py-2">{{student.sex}}</td>
  <td class="py-2">{{student.degree_department?.name}}</td>
  <td class="py-2">{{student.program?.name}}</td>
   </tr>
  </tbody>
    </table>
     </div>
    <div v-if="degreeGraduates.data?.length" class="d-flex justify-content-end mt-3 me-5">
<div class="rowsperpage me-3">
Rows per Page
</div>
<div class="limit col-sm-1 me-3">
<select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="rowNumber">
  <option value="5">5</option>
  <option value="10">10</option>
  <option value="15">15</option>
  <option value="20">20</option>
  
</select>
</div>
<div class="pageno me-3">
{{degreeGraduates.from+'-'+degreeGraduates.to+' of '+degreeGraduates.total+' pages'}}
</div>
<div class="leftchivron ms-3 me-3">
<button @click="backChivron()" class="chivronbtn" :class="{active:degreeGraduates.from !== 1}" :disabled="degreeGraduates.from === 1"><i class="fas fa-chevron-left"></i></button>
</div>
<div class="rightchivron"><button @click="forWardChivron()" class="chivronbtn" :class="{active:degreeGraduates.to !==degreeGraduates.total}" :disabled="degreeGraduates.to ===degreeGraduates.total"><i class="fas fa-chevron-right"></i></button></div>
</div>
    </div>
  
</template>
<script>
import apiClient from '../../../resources/baseUrl'
import {mapGetters} from 'vuex'
export default {
    data() {
        return {
         rowNumber:'10',
         queryObject:{
          page:1,
          per_page:10,

        }
        }
    },
       computed:{
    ...mapGetters('dean',['degreeDepartments','degreePrograms']),
    academicYearId(){
        return this.$store.getters.acYearId
    },
   academicYears(){
        return  this.$store.getters.academicYears
      },
       acYearId(){
        return  this.$store.getters.acYearId
      },
     degreeGraduates(){
        return this.$store.getters['registrar/degreeGraduates']
    },
    selectedYearName(){
      var yearName
      this.academicYears.forEach(year=>{
        if(Number(this.acYearId) === Number(year.id)){
          yearName = year.year
        }
      })
      return yearName
    },
       },
       created() {
        this.queryObject.acId = this.academicYearId
        this.fetchDegreeGraduat(this.queryObject)
       },
       watch:{
         academicYearId(newValue){
         this.queryObject.acId = newValue
           this.fetchDegreeGraduat(this.queryObject)
         },
         rowNumber(newValue){
           this.queryObject.per_page = newValue
        this.fetchDegreeGraduat(this.queryObject)
                },
       },  
    methods: {
        async printGraduatedDegreeStudent(){
            await this.$htmlToPaper('degreeGraguate');
            },
        async fetchDegreeGraduat(queryObject){
          this.$store.state.isItemLoading = true
            try{
              var response = await apiClient.get(`api/registrar_graduated_degree_students?academic_year_id=${queryObject.acId}&per_page=${queryObject.per_page}`)
              if(response.status === 200){
                console.log('graduated degree students = ',response.data)
                this.$store.commit('registrar/setDegreeGraduates',response.data)
              }
            }
            catch(e){
              console.log('error')
            }
            finally{
              this.$store.state.isItemLoading = false
            }
        },
        forWardChivron(){
        this.queryObject.page = this.queryObject.page + 1
       this.fetchTvetGraduats(this.queryObject)
      },
      backChivron(){
        this.queryObject.page = this.queryObject.page - 1
       this.fetchTvetGraduats(this.queryObject)
      },
        
        // fetchSpecificDegreeGraduats(){
        //     var deptId = this.$refs.degreeDptId.value
        //   var progId = this.$refs.programId.value
        //    this.fetchDegreeGraduat(this.queryObject)
        // }
    }
       
}
</script>
<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
th{
  padding-bottom: 8px;
  padding-top: 4px;
  
}
td{
  border: 1px solid #dddddd;
  text-align: left;
  vertical-align: top;
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
  border-top: 2px solid gray;
  border-bottom: 2px solid gray;
}
.viewcourse td{ 
  padding-left: 15px;
  border-left: none;
  border-right: none;
   border-top: 2px solid gray;
  border-bottom: 2px solid gray;
}
.chivronbtn{
    border: none;
    background-color: #fff;
    color: rgba(179, 175, 175, 0.849);
}
.active{
  color: rgb(15, 15, 15);
}
.addbtn{
    background-color: #2f4587;
    color: #fff;
    width: 7em;
} 
.addbtn:hover{
    background-color:#366ad9 ;
}
.chivronbtn{
    border: none;
    background-color: #fff;
    color: rgba(179, 175, 175, 0.849);
}
.active{
  color: rgb(15, 15, 15);
}
</style>