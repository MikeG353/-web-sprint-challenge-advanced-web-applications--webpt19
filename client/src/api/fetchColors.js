import  { axiosWithAuth, baseURL } from '../api/axiosWithAuth'
import React, { useState } from 'react'

export const fetchColors = () => {
    return axiosWithAuth()
    .get(`${baseURL}/colors`)
    .then(res => {
      console.log(res)
      return res.data
    })
    .catch(err => {
      console.error('unable to fetch color data from server. error: ', err)
    })
}