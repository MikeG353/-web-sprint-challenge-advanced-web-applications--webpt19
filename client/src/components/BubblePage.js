import React, { useState, useEffect } from "react";
import  { axiosWithAuth, baseURL } from '../api/axiosWithAuth'
// import { fetchColors } from '../api/fetchColors' 

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const fetchColors = () => {
  axiosWithAuth()
    .get('http://localhost:5000/api/colors')
    .then(res => {
      let newColorList= res.data
      setColorList(newColorList)
    })
    .catch(err => {
      console.log(err.message)
    })
  }
  
  useEffect(() => {
    fetchColors()
    // .then(res => {
    //   console.log(res)
    //   setColorList(res)
    // })
  },[])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} fetchColors={fetchColors} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
