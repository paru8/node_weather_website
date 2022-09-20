const { hasSubscribers } = require('diagnostics_channel')
const express =require('express')
const path =require('path')
const hbs =require('hbs')
//const utils =require('./utils/utils.js')




const app =express()
//////////////////////////////////////////////////////////////
const request =require('request')


const forecast=(location,callback) =>{
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+location+'.json?access_token=pk.eyJ1IjoiYWFkaXR5YWpvc2hpODQiLCJhIjoiY2w3azRxM2ZhMG50cDNvb2I3eGE5NHozdyJ9.eHHl0CA43UO5h2408cIkAA'
    //console.log(url)
    request({url:url,json :true},(error,response) => {
        if(error){
            callback('Unable to collect the weather records..Please check your internet connection and try again..',undefined)
        } else if (response.body.message =='Not Found') {
            callback('We are unbale to retrive the data..please check if you mistype the URL and try again',undefined)
    
        }
        
        else {
           const lati  =response.body.features[0]['center'][1]
           const longt =response.body.features[0]['center'][0]
           //console.log('Latitude of your City is',lati)
           //console.log('Longitude of your city is',longt)
           const urls =`http://api.weatherstack.com/current?access_key=6ff5e16973ba96ac521fa31cb14c8dc6&query=${lati},${longt}`
           //console.log(urls)
        
        request({url:urls,json:true},(error,response) =>{
            if(error) {
                callback('Unable to retrive the data, please check your internet connection')
            } else {
                //callback(undefined,response.body.location.name)
                callback(undefined,response)
                //callback(undefined,response.body.current.weather_descriptions[0])
            }
        }
    
        ) 
    }
    
    }
    
    )
}
//const address =process.argv[2]
///////////////////////////////////////////////////////////////////////

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

// app.get('',(req,res) => {
//     res.send('<h1>WELCOME IN WEATHER APP </h1>')

// }
// )

app.get('/weather',(req, res) => {
    if (!req.query.search) {
        return res.send({
            error:'You must need  to search city'
            
        }
        )
        
    }

   else {
    forecast(req.query.search,(error, nameOfCity) =>{

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




app.listen(3000,()=>{
    console.log('Server is started successfully')
})

