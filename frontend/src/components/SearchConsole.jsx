import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'

function SearchConsole({ onSubmit }) {
  const [categories, setCategories] = useState([])
  const [cities, setCities] = useState([])
  
  useEffect (()=>{
      const fetchCatgeories = async () =>{
        try{
          const response = await axios.get("http://127.0.0.1:8000/api/getCategories/")
          setCategories(response.data)
          const response2 = await axios.get("http://127.0.0.1:8000/api/getCities/")
          setCities(response2.data)
        }
        catch(error){
          console.log(error.message)
        }
      }
      fetchCatgeories()
    },[])
  
  return (
    <div id="recherche" className="max-w-5xl mx-auto bg-surface-container-lowest p-4 md:p-5 rounded-2xl border border-outline-variant shadow-lg mb-10">
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-10 gap-3">
        <div className=" grid-cols-5 md:col-span-6 relative flex items-center border border-outline-variant rounded-xl bg-surface-container-lowest px-3 py-2.5 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
          <span className="material-symbols-outlined text-primary text-title-md mr-3" aria-hidden="true">handyman</span>
          <div className="flex-1 min-w-0">
            <label htmlFor="search-category" className="block font-label-sm text-label-sm text-outline">Métier recherché</label>
            <select name="category" id="search-category" className="w-full bg-transparent border-0 p-0 font-label-lg text-label-lg text-on-surface focus:ring-0 cursor-pointer">
              {categories.map((item) => { 
                return <option key={item.id} value={item.nom}>{item.nom}</option>
              })}
            </select>
          </div>
        </div>
        {/* <div className="md:col-span-4 relative flex items-center border border-outline-variant rounded-xl bg-surface-container-lowest px-3 py-2.5 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
          <span className="material-symbols-outlined text-primary text-title-md mr-3" aria-hidden="true">search</span>
          <div className="flex-1 min-w-0">
            <label htmlFor="search-problem" className="block font-label-sm text-label-sm text-outline">Votre problème précis</label>
            <input name="problem" id="search-problem" className="w-full bg-transparent border-0 p-0 font-body-md text-body-md text-on-surface placeholder:text-outline-variant focus:ring-0" placeholder="Ex: Fuite sous évier, tableau électrique..." type="text" />
          </div>
        </div> */}
        <div className="md:col-span-4 lg:col-span-2 relative flex items-center border border-outline-variant rounded-xl bg-surface-container-lowest px-3 py-2.5 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
          <span className="material-symbols-outlined text-primary text-title-md mr-2" aria-hidden="true">location_on</span>
          <div className="flex-1 min-w-0">
            <label htmlFor="search-location" className="block font-label-sm text-label-sm text-outline">Quartier / Ville</label>
            <select name="location" id="search-location" className="w-full bg-transparent border-0 p-0 font-label-lg text-label-lg text-on-surface focus:ring-0 cursor-pointer">
              {cities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="md:col-span-12 lg:col-span-2 flex items-center">
          <button className="w-full h-full min-h-13 bg-secondary-container hover:bg-secondary text-on-secondary font-label-lg text-label-lg rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 duration-100 ease-out" type="submit">
            <span className="material-symbols-outlined text-title-sm" aria-hidden="true">search</span>
            <span className="">Chercher</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchConsole
