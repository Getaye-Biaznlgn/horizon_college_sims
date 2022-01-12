export default{
    setCourses(state, payload){
        state.courses=payload
    },
    setSections(state,payload){
        state.sections=payload
    },
    setStudentInSemesters(state, payload){
        state.studentInSemesters=payload
    },
    //Just for store data for another use
    setStudentForSlip(state, payload){
        state.studentForSlip=payload
    },
    setStudentsForGrade(state, payload){
        state.studentsForGrade=payload
    },
    
}