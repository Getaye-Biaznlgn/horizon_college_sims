export default{
    setModules(state, payload){
        state.modules=payload
    },
    setSections(state,section){
        state.sections=section
    },
    setStudentInLevels(state, payload){
        state.studentInLevels=payload
    },
    //Just for store data for another use
    setStudentForSlip(state, payload){
        state.studentForSlip=payload
    },
    setStudentsForGrade(state, payload){
        state.studentsForGrade=payload
    },
    
}