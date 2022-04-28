var express = require ("express")
var app = express()
var cors= require("cors")
const MongoClient=require ("mongodb").MongoClient;
let projectCollection;
let http = require('http').createServer(app);

let io = require('socket.io')(http);

const uri = "mongodb+srv://ACORR12:Tinashe2009@cluster0.x1035.mongodb.net/SIT725_2022_t1?retryWrites=true&w=majority"
const client = new MongoClient(uri,{useNewUrlParser:true})

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

const createCollection = (collectionName) =>{
    client.connect((err,db)=>{
        projectCollection = client.db().collection(collectionName);
        if(!err){
            console.log('MongoDB Connected')
        }
        else {
            console.log("DB Error:", err);
            process.exit(1);
        }
    })
}

const insertProjects = (project,callback) => {
    projectCollection.insert(project,callback);
}

const getProjects = async (callback)=>{
    let trees = await projectCollection.find({}).toArray(callback);
    return trees;
}

const cardList = [
        {
            title: "Tree",
            image: "images/tree.jpg",
            link: "About Trees",
            description: "a beautiful tree"
        },
        {
            title: "Tree",
            image: "images/tree.jpg",
            link: "About Trees",
            description: "a beautiful tree"
        },

    ]
    
    app.get('/api/projects', async (req,res) => {
        let trees = await getProjects();
        res.json({statusCode: 200, data: trees, message:"Success"})
    })
    
    app.post('/api/projects',(req,res)=> {
        console.log ("New Project added", req.body)
        var newProject = req.body;
        insertProjects(newProject,(err,result)=>{
            if(err){
                res.json({statusCode: 400, message: err})
            }
            else{
                res.json({statusCode: 200, message: "Project Successfully added", data: result})
            }
        })

    })

    app.get('/addTwoNumbers/:firstNumber/:secondNumber', function(req,res,next){
        var firstNumber = parseInt(req.params.firstNumber) 
        var secondNumber = parseInt(req.params.secondNumber)
        var result = firstNumber + secondNumber || null
        if(result == null) {
          res.json({result: result, statusCode: 400}).status(400)
        }
        else { res.json({result: result, statusCode: 200}).status(200) } 
      })
    
app.use(express.static(__dirname+'/public'));
app.use(cors)


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  setInterval(()=>{
    socket.emit('number', parseInt(Math.random()*10));
  }, 1000);

});

var port = process.env.port || 3000;

http.listen(port,()=>{
    console.log("App running at http://localhost: ", port);

});

