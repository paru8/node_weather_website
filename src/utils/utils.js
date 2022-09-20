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
           const urls =`http://api.weatherstack.com/current?access_key=aaf2d3bf6fe00dcfc16c63f013546c2e&query=${lati},${longt}`
           console.log(urls)
        
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

module.exports={
    forecast
}