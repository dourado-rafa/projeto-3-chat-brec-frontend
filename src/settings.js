const Backend = 'chatbrec-e9oq.onrender.com'
const BackendLink = `https://${Backend}`

const chatSocket = new WebSocket(`ws://${Backend}/`);
chatSocket.onopen =  (e) => console.log("The connection was setup successfully !");
chatSocket.onclose = (e) => console.log("Something unexpected happened !");


export { chatSocket, BackendLink };