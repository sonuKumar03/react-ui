import  shortid from 'shortid'
const state = [
  {
    id:shortid.gen(),
    customer:{
      name:"monu",
      mobile:999933493493
    },
    type:"Wash",
    desc:"need washing asap",
    placeAt:"23-09-19T12:34",
    vehicle_no:2343KL9,
    status:'placed'
  }
]
export default state;