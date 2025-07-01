const csvparser = require('csv-parser')
const fs = require('fs')
const APIAuthenticate = require('./APIAuthenticate')
const axios = require('axios')
const AirportList = (req,res)=>{
  const result = []
  fs.createReadStream('C:/Users/PC/Desktop/IndiyaPay/my-backend/assests/Airport.csv')
   .pipe(csvparser())
 
   .on('data',(Airportdata)=>result.push(Airportdata))
   .on('end',()=>{
     res.status(200).json(result)
   })
   .on('error',()=>{
    res.status(500).json({message:"Failed to read CSV"})
   })
}

const searchFlight = async(req,res)=>{
  const {JourneyType,AdultCount,ChildCount,InfantCount,Origin,Destination,date, CabinClass,DirectFlight,OnestopFlight} = req.body
  const token = await APIAuthenticate()
  console.log(token)
  const options = {
    EndUserIp: process.env.EndUserIp,
    TokenId: token,
    AdultCount:AdultCount ,
    ChildCount: ChildCount,
    InfantCount: InfantCount,
    DirectFlight: DirectFlight,
    OneStopFlight: OnestopFlight,
    JourneyType:JourneyType,
    PreferredAirlines: null,
    Segments: [
    {
    Origin: Origin,
    Destination: Destination,
    FlightCabinClass: CabinClass,
    PreferredDepartureTime: date,
    PreferredArrivalTime: date
    }
    ],
    Sources: null
    }
  try{
    const apiResponse= await axios.post("http://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/Search",options)
    const flightdetails = apiResponse.data.Response
    console.log(flightdetails)
    return res.status(200).json(flightdetails) 
  }
  catch(err){
    console.log(err)
    // return res.status(500).json({message:"server error"})
  }
}

module.exports = {AirportList,searchFlight}