import bodyParser from 'body-parser'
import morgan from 'morgan'
import socketio from 'socket.io'// importando o socket.io
import http from 'http' // talvez no seu projeto você não importe a biblioteca http, mas aqui é necessário
import store from './store.js'
import express from 'express'

var today = new Date()
var month, dayM
if (Number(today.getUTCDate()) < 10) {
    dayM = `0${today.getUTCDate()}`
} else {
    dayM = today.getUTCDate()
}
if (Number(today.getUTCMonth()) < 10) {
    month = `0${Number(today.getUTCMonth()) + 1}`
} else {
    month = Number(today.getUTCMonth()) + 1
}
var year = today.getUTCFullYear()

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.json({ hello: 'world!' })); // apenas para verificar se está tudo OK

const server = http.createServer(app); // a biblioteca http entra exatamente aqui
const io = socketio(server); // associando a instância do socketio com o seu servidor
var aa;
io.on('connect', function (socket) {
  console.log("entrou")
  // irá notificar apenas o usuário
  
  socket.on('novo evento', teste=>{
  if(teste){  
  aa=JSON.stringify(teste)
  console.log("chegou "+aa)}
  io.emit('reenviado',aa)
}
  )
  
  
  
  //socket.emit('eventos', store)
})


const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`[x] Magic happens on port: ${port}`));
