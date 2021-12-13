export default {
    namespaced: true,
    state() {
        return {
            degreeStudents: [],
            tvetStudents: [],
        }
    },
    getters: {
        degreeStudents(state) {
            return state.degreeStudents
        },
        tvetStudents(state) {
            return state.tvetStudents
        }
    },
    mutations: {
        setDegreeStudent(state, student) {
            state.degreeStudents = student
        },
        setTvetStudent(state, student) {
            state.tvetStudents = student
        }
    },
    actions: {

    }
}