const { hasSubscribers } = require('diagnostics_channel')
const express =require('express')
const path =require('path')
const hbs =require('hbs')
const utils =require('./utils/utils.js')
const app =express()

const port=process.env.PORT || 3000

// below command will show the current directory
console.log(__dirname)

 // below command will show fileName
console.log(__filename)


const htmlFilePath =path.join(__dirname,'../public')

const viewsPath =path.join(__dirname,'../src/templates/views')

const partialPath =path.join(__dirname,'../src/templates/partial')
hbs.registerPartials(partialPath)

console.log(htmlFilePath)

// use the above path 

app.use(express.static(htmlFilePath))

app.set('view engine', 'hbs')
app.set('views', viewsPath)



app.get('',(req,res) => {

    res.render('index', {
        name:'Weather APP',
        title:'Praveen Joshi'
    })
}

)


app.get('/weather',(req, res) => {
    if (!req.query.search) {
        return res.send({
            error:'You must need  to search city'
            
        }
        )
        
    }

   else {
    utils.forecast(req.query.search,(error, nameOfCity) =>{

        res.send({
            nameOfCity:nameOfCity.body.location.name ,
            weather_descriptions:nameOfCity.body.current.weather_descriptions[0],
            current_temp:nameOfCity.body.current.temperature,
            address:req.query.search,
        })
        
    })

    
   

   }
}
) 

app.get('/help',(req,res) =>{
    res.render('help',{
        developerName:'Praveen Developers LTD'
    })


})

app.get('/about',(req,res) =>{
    res.render('about',{
        user:'Praveen Joshi'
    })
    
})

app.get('/about/*',(req,res) =>{
    res.render('404_not_found',{
        error02:'THE PAGE YOU REQUESTED IS NOT FOUND'
    })
}

)

app.get('*',(req,res) =>{
    res.render('404',{
        error01:'Ooops Something went wrong, please try again later....'
    })
}

)




app.listen(port,()=>{
    console.log('Server is started successfully')
})


