export default {
    state() {
        return {
            teachers: []
        }
    },
    getters: {
        teacher(state) {
            return state.teachers
        }
    },
    mutations: {
        setTeachers(state, teacher) {
            state.teachers = teacher
        }
    },
    actions: {

    }
}