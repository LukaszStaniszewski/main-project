import {useState, useEffect} from 'react'
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"

const ItemPage = () => {
   const dispatch = useDispatch()
   // param is an item id
   const params = useParams()

   // const useEffect(() => {
      
   // }, [])
   
  return (
    <div>ItemPage</div>
  )
}

export default ItemPage