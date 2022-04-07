var express = require ("express")
var app = express()

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

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
    
    app.get('/api/projects',(req,res) => {
        res.json({statusCode: 200, data: cardList, message:"Success"})
    })
    

var port = process.env.port || 3000;
app.listen(port,()=>{
    console.log("App listening to: "+port)
    
})