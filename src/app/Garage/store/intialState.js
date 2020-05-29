
const initialState = {
    open:null,
    basicInfo: {
      name: "",
      owner: "",
      locality: "",
      mobile: "",
    },
    characteristic: {
      types: [],
      features: [],
    },
    location: {  lat: "", lng: "" },
    shedules:[],
  };



// const initialState = {
//     open:false,
//     basicInfo: {
//       name: "janta garage",
//       owner: "Mr Janta",
//       locality: "Bilapur",
//       mobile: "7024011043",
//     },
//     characteristic: {
//       types: [{name:"two wheeler",checked:false}, {name:"four wheeler",checked:false}],
//       features: [{name:"wash",checked:false}, {name:"coloring",checked:false}, {name:"repair",checked:false}, {name:"part replacement",checked:false}],
//     },
//     services:[{
//       name:"xyz",
//       price:"RS 780",
//       capacity:"12"
//     }],
//     location: {  lat: "23.262200", lng: "82.560000" },
//     shedule:[{day:'sunday' , from:'8:00 am', to:'10:00 pm'}],
//   };


export default initialState;
