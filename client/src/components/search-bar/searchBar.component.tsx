import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';

import { autocompleteStart } from "../../store/collections/collection.actions";
import { selectAutocomplete} from "../../store/collections/collection.selector";

const optionsDefault = [
   {
      value: "",
      label: "Type to see results"
   }
]

const SearchBar = () => {
   const [searchResult, setSearchResult] = useState({value: "", label: ""});
   const [inputValue, setInputValue] = useState("")
   const [options, setOptions] = useState(optionsDefault)
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const autocomplete = useSelector(selectAutocomplete)
  

    useEffect(() => {
      if(!inputValue) {
        return setOptions(optionsDefault)
      }
      setOptions(optionsDefault)
      dispatch(autocompleteStart({query: inputValue}))
    }, [inputValue])

    useEffect(() => {
      if(!autocomplete.length) {
         return setOptions(optionsDefault)
      }
      setOptions(autocomplete)
   }, [autocomplete])

   useEffect(() => {
      if(!searchResult?.value) return
      redirectToSearchResult()
   }, [searchResult])

   const redirectToSearchResult = () => {
      const resultType = searchResult.label.split(" - ")
      if(resultType[1] === "User") {
        navigate(`/user/${searchResult.value}`)
      } else if(resultType[1] === "Collection") {
        navigate(`/collection/${searchResult.value}`)
      } else if(resultType[1] === "Item") {
         navigate(`/item/${searchResult.value}`)
      }
   }
   
   return (
   <section className="w-50vw outline-none focus:ring-0"> 
      <Select  
         inputValue={inputValue}
         onInputChange= {setInputValue}
         //@ts-ignore
         onChange={setSearchResult}
         options={options}
         noOptionsMessage={() => "Type to see results"}
         placeholder= "Search..."
         autoFocus
         isClearable
         //@ts-ignore
         filterOption={(options, inputValue, searchResult)=> options}
      />
   </section>  
  )
}

export default SearchBar