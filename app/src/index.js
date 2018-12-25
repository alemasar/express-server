import logMessage from './js/logger.cat'
import './css/style.css'
import './scss/style.scss'
// Log message to console
const returnValue = () => {
	logMessage('A very warm welcome to Expack! NO me jodas')
}
export default returnValue;
document.addEventListener("DOMContentLoaded", () => {
	returnValue();
})
// Needed for Hot Module Replacement
if(typeof(module.hot) !== 'undefined') {
  module.hot.accept() // eslint-disable-line no-undef  
}
