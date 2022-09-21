

console.log('How are you')
// fetch('http://localhost:3000/weather?search=Haldwani').then((response) => {
//     response.json().then((data) =>{
//         if(data.error){
//             console.log('Kindly chek the url you entered')
//         } 
//         else {       
//             console.log(data)

//         }
//     }) 
// }
// )

const weather_city=document.querySelector('form')
const cityElement =document.querySelector('input')
const messageOne =document.querySelector('#messageOne')
const messagTwo =document.querySelector('#messageTwo')
const messagThree =document.querySelector('#messageThree')
const messagFour =document.querySelector('#messageFour')
const messagFive =document.querySelector('#messageFive')


weather_city.addEventListener('submit',(e) => {
    e.preventDefault()
    const location =cityElement.value
    console.log(location)
    messageOne.textContent ='Loading..'
    messagTwo.textContent =''
    messagThree.textContent=''
    messagFour.textContent=''
    
    

    fetch('/weather?search='+location).then((response) => {
    response.json().then((data) =>{
        if(data.error){
            messageOne.textContent =data.error
        } 
        else {       
            messagTwo.textContent ='Name Of City :'+data.nameOfCity
            messagThree.textContent='Current Temp :'+data.current_temp
            messagFour.textContent ='Weather Forecast :'+data.weather_descriptions
            messagFive.textContent='Location :'+ data.address


        

        }
    }) 
}
)


})