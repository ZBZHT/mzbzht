let defaultCity = '上海'
try {
  if (localStorage.city) {
    defaultCity = localStorage.city
  }
} catch (e) {}

export default {
  city: defaultCity,
  username: '',
  userType: '',
  userTypeC: '',
  userID: '',
  courseDetail: '',
  urlSrc: '',
  serverIP: '',
  showPracticeData: '',
  exerciseData: '',
  showPractice: 0,
  rememberFunction: '',
  rememberFunction2: '',
  rememberFunction5: ''
}
