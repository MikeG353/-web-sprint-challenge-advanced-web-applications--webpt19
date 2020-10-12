import React, { useState, useEffect } from "react";
import  { axiosWithAuth, baseURL } from '../api/axiosWithAuth'
import { fetchColors } from '../api/fetchColors' 

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  useEffect(() => {
    fetchColors()
    .then(res => {
      console.log(res)
      setColorList(res)
    })
  },[])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} fetchColors={fetchColors}/>
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
