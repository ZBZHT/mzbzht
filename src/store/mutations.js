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
  }
}
