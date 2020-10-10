import  { axiosWithAuth, baseURL } from '../api/axiosWithAuth'
import React, { useState } from 'react'

export const fetchColors = () => {
    const [colorList, setColorList] = useState([]);
    return axiosWithAuth()
    .get(`${baseURL}/colors`)
    .then(res => {
      setColorList(res.data)
    })
    .catch(err => {
      console.error('unable to fetch color data from server. error: ', err)
    })
}