const initialState = {
    basicInfo: {
      name: "janta garage",
      owner: "Mr Janta",
      locality: "Bilapur",
      mobile: "7024011043",
    },
    characteristic: {
      types: ["two wheeler", "four wheeler"],
      services: ["wash", "coloring", "repair", "part replacement"],
    },
    services:[{
      name:"xyz",
      price:"RS 780",
      capacity:"12"
    }],
    location: {  lat: "23.262200", lng: "82.560000" },
    shedule:[{day:'sunday' , from:'8:00 am', to:'10:00 pm'}],
    contactInfo:{ email:'janta@gmai.com',website:'jantaGarage.co.in' }
  };
  
export default initialState;
