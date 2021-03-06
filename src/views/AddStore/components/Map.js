
import React from "react";
import mapboxgl from "mapbox-gl";
import { useEffect } from "react";
import { useState } from "react";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import mapToken from "common/token";
import { selectLocation } from "app/Garage/store/storeSlice";
import {useSelector} from 'react-redux'
const mapStyle = {
  width: "100%",
  height:"50vh"
};

const AddMap = ({setLocation}) => {
  const location = useSelector(selectLocation);
  const help =(stored)=>{ 
    console.log(stored);
    if(stored.lng && stored.lat){
      return  stored;
    }
    else
    return ({ lat: "23.262200", lng: "82.560000" })
  }

  const [state, setState] = useState({ location: help(location), zoom: 13 });

  const mapConfig = {
    container: "map",
    style: "mapbox://styles/mapbox/streets-v9",
    center: [state.location.lng, state.location.lat],
    zoom: [state.zoom]
  };
  const updateLocation=(loc)=>{
    setLocation(loc);
    setState({
      ...state,
      location:loc
    });
    console.log(loc);
  }
  let mapInitialize = () => {
    mapboxgl.accessToken = mapToken;
    let map = new mapboxgl.Map(mapConfig);
    map.on('load',()=>{
      map.resize();
    })
    const mapboxGeocoder = new MapboxGeocoder({
      accessToken:mapboxgl.accessToken,
      mapboxgl
    })
    let marker = new mapboxgl.Marker({ draggable: true });
    marker.setLngLat(state.location);
    marker.addTo(map);

    mapboxGeocoder.on('result',(results)=>{
      const [lng,lat] = results.result.geometry.coordinates;
      updateLocation({lat,lng})
    })
    map.addControl(mapboxGeocoder);
    // listeners for map

    map.addControl(new mapboxgl.FullscreenControl())
    map.on("click", e => {
      if (typeof marker.getLngLat() === "undefined") {
        marker.setLngLat(e.lngLat);
        marker.addTo(map);
      } else {
        marker.remove();
        marker.setLngLat(e.lngLat);
        marker.addTo(map);
      }
      updateLocation(e.lngLat);
    });

    // grag end event listener
    marker.on("dragend", e => {
      let lat = marker.getLngLat().lat;
      let  lng = marker.getLngLat().lng;
      const lngLat = {lat,lng};
      updateLocation(lngLat);
    });
  };
  useEffect(mapInitialize, []);
  return (
    <div>
    <div id="map" style={mapStyle}>
    </div>
    </div>
  );
};

export default  AddMap;
