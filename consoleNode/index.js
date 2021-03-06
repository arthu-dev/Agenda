const io = require('socket.io-client');
const socket = io('http://localhost:3001');
const inquirer = require('inquirer');

var aa;
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
var continuar = true;

//socket.on('reenviado', aa=>{console.log(aa)})
const perguntas = ()=> {
  inquirer
    .prompt([
      {
        name: 'texto',
        message: 'texto',
        default: 'texto',
      },
      {
        name: 'dataIni',
        message: 'dataIni',
        default: `${year}-${month}-${dayM}T11:00:00`,
      },
      {
        name: 'dataEnd',
        message: 'dataEnd',
        default: `${year}-${month}-${dayM}T13:00:00`,
      }
      ,
      {
        name: 'continuar',
        message: 'continuar?',
        default: true
      }
    ])
    .then(async (ans) => {
      continuar = ans.continuar
      teste =
        [
          {
            "title": `${ans.texto}`,
            "start": `${ans.dataIni}`,
            "end": `${ans.dataEnd}`
          }
        ];
      socket.emit('novo evento', teste)
      console.log(teste)
      if(continuar){
        perguntas()
      }
    });
}
perguntas()
//socket.on('novu eventu', aa=>console.log(aa))
