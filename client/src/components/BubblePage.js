import React, { useState, useEffect } from "react";
import  { axiosWithAuth, baseURL } from '../api/axiosWithAuth'

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  const fetchColors = () => {
    axiosWithAuth()
      .get(`${baseURL}/colors`)
      .then(res => {
        setColorList(res.data)
      })
      .catch(err => {
        console.error('unable to fetch color data from server. error: ', err)
      })
  }

  useEffect(() => {
    fetchColors()
  },[])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} fetchColors={fetchColors}/>
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
