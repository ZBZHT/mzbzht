export default {
  changeCity (state, city) {
    state.city = city
    try {
      localStorage.city = city
    } catch (e) {}
  },
  username (state, item) {
    state.username = item
  },
  userType (state, item) {
    state.userType = item
  },
  userTypeC (state, item) {
    state.userTypeC = item
  },
  userID (state, item) {
    state.userID = item
  },
  courseDetail (state, item) {
    state.courseDetail = item
  },
  urlSrc (state, item) {
    state.urlSrc = item
  },
  serverIP (state, item) {
    state.serverIP = item
  },
  showPracticeData (state, item) {
    state.showPracticeData = item
  },
  exerciseData (state, item) {
    state.exerciseData = item
  },
  showPractice (state, item) {
    state.showPractice = item
  },
  rememberFunction (state, item) {
    state.rememberFunction = item
  },
  rememberFunction2 (state, item) {
    state.rememberFunction2 = item
  },
  rememberFunction5 (state, item) {
    state.rememberFunction5 = item
  }
}
