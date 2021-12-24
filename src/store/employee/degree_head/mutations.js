export default{
    setCourses(state, payload){
        state.courses=payload
    },
    setSections(state,payload){
        state.sections=payload
    },
    setStudents(state, payload){
        state.students=payload
    },
    setSlips(state, payload){
        state.slips=payload
    },
    //grade reports
    setGrades(state, payload){
        state.grades=payload
    },
    setStudentForSlip(state, payload){
        state.studentForSlip=payload
    },
    setStudentsForGrade(state, payload){
        state.studentsForGrade=payload
    },
    setStudentInSemesters(state, payload){
        state.studentInSemesters=payload
    }
}