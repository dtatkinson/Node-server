const express = require('express');
const app = express();
const router = express.Router();
const port = 3000;
const url = require('url');
const fs = require('fs');
const { stringify } = require('querystring');
const { Console } = require('console');


// all routes prefixed with /api
app.use('/api', router);

let rawdata = fs.readFileSync('task.json');
var data = JSON.parse(rawdata);
//console.log(data.tasks[0].Task);

//return all tasks in file and saves log to file  
// url: http://localhost:3000/api/
router.get('/', (request, response) => {
  let ts = Date.now();
  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  let timestamp = year + "-" + month + "-" + date;
  var log = "User queried list of all tasks "+JSON.stringify(data.tasks)+" \r\n"+"@"+timestamp+" -time"+date_ob+" \r\n";
  fs.appendFile("log.txt",log,(err)=>{if (err)throw err;})
  response.json({message: data.tasks});
});

app.listen(port, () => console.log(`Listening on port ${port}`));

//return individual task set by user in param and saves to log 
router.get('/searchtask',(request,response) =>{
    var urlParts = url.parse(request.url,true);
    var parameters = urlParts.query;
    var myParam = parameters.myParam;
    var Stask = data.tasks[myParam];
    var x = stringify(Stask);
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let timestamp = year + "-" + month + "-" + date;
    var log = "User queried for one task using this as parameter "+myParam+" \r\nSystem returned this result"+JSON.stringify(data.tasks[myParam])+" \r\n"+"@"+timestamp+" -time"+date_ob+" \r\n";
    fs.appendFile("log.txt",log,(err)=>{if (err)throw err;})
    var myResponse = "You searched for "+x;

    response.json({message: myResponse});
});

router.get("/searchstringT",(request,response) =>{
  var urlParts = url.parse(request.url,true);
  let ts = Date.now();
  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  let timestamp = year + "-" + month + "-" + date;
  var parameters = urlParts.query;
  var myParam = parameters.myParam;
  for(i=0;i<data.tasks.length;i++)
  {
    var compare = data.tasks[i].Task;
    if(compare==myParam)
    {
      var myResponse = "Task has been found "+ JSON.stringify(data.tasks[i]);
      var log = "User queried a string looking for a task: "+myParam+" \r\nSystem found result and returned"+JSON.stringify(data.tasks[i])+" \r\n"+"@"+timestamp+" -time"+date_ob+" \r\n";
      fs.appendFile("log.txt",log,(err)=>{if (err)throw err;})
      break;
    }
  }
  if(myResponse==null)
  {
    var myResponse = "No task was found that matches the search";
    var log = "User queried a string "+myParam+" \r\nSystem found no matching result \r\n"+"@"+timestamp+" -time"+date_ob+" \r\n";
    fs.appendFile("log.txt",log,(err)=>{if (err)throw err;})
  }
  response.json({message: myResponse});
});

router.get("/searchstringD",(request,response) =>{
  var urlParts = url.parse(request.url,true);
  let ts = Date.now();
  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  let timestamp = year + "-" + month + "-" + date;
  var parameters = urlParts.query;
  var myParam = parameters.myParam;
  for(i=0;i<data.tasks.length;i++)
  {
    var compare = data.tasks[i].Description;
    if(compare==myParam)
    {
      var myResponse = "Description has been found "+ JSON.stringify(data.tasks[i]);
      var log = "User queried a string looking description: "+myParam+" \r\nSystem found result and returned"+JSON.stringify(data.tasks[i])+" \r\n"+"@"+timestamp+" -time"+date_ob+" \r\n";
      fs.appendFile("log.txt",log,(err)=>{if (err)throw err;})
      break;
    }
  }
  if(myResponse==null)
  {
    var myResponse = "No description was found that matches the search";
    var log = "User queried a string looking for description "+myParam+" \r\nSystem found no matching result \r\n"+"@"+timestamp+" -time"+date_ob+" \r\n";
    fs.appendFile("log.txt",log,(err)=>{if (err)throw err;})
  }
  response.json({message: myResponse});
});

router.get("/searchstringDD",(request,response) =>{
  var urlParts = url.parse(request.url,true);
  let ts = Date.now();
  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  let timestamp = year + "-" + month + "-" + date;
  var parameters = urlParts.query;
  var myParam = parameters.myParam;
  for(i=0;i<data.tasks.length;i++)
  {
    var compare = data.tasks[i].DueDate;
    if(compare==myParam)
    {
      var myResponse = "DueDate has been found "+ JSON.stringify(data.tasks[i]);
      var log = "User queried a string looking for a DueDate: "+myParam+" \r\nSystem found result and returned"+JSON.stringify(data.tasks[i])+" \r\n"+"@"+timestamp+" -time"+date_ob+" \r\n";
      fs.appendFile("log.txt",log,(err)=>{if (err)throw err;})
      break;
    }
  }
  if(myResponse==null)
  {
    var myResponse = "No DueDate was found that matches the search";
    var log = "User queried a string looking for DueDate "+myParam+" \r\nSystem found no matching result \r\n"+"@"+timestamp+" -time"+date_ob+" \r\n";
    fs.appendFile("log.txt",log,(err)=>{if (err)throw err;})
  }
  response.json({message: myResponse});
});

