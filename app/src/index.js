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

