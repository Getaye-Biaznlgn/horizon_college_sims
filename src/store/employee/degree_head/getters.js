export default{
    courses(state){
        return state.courses
    },
    sections(state){
        return state.sections
    },
    studentsById(state){
        return (id)=>{
          return state.students.find((student)=>{
              return student.id===id
          })
        }
    },
    students(state){
        return state.students
    },
    
    //grade reports
    grades(state){
        return state.grades
    },
    //
    studentForSlip(state){
        return state.studentForSlip
    },
    studentsForGrade(state){
        return state.studentsForGrade
    },
    studentInSemesters(state){
        return state.studentInSemesters
    }
}