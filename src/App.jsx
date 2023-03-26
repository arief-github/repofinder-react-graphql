import 'bootstrap';
import './scss/custom.scss';
import { FaProjectDiagram } from 'react-icons/fa';
import { useState, useEffect, useCallback } from 'react';
import query from './gql/query';
import github from './config/token';

function App() {
  const [username, setUsername] = useState("");

  const fetchData = useCallback(() => {
    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers,
      body: JSON.stringify(query)
    })
    .then((res) => res.json())
    .then((data) => {
      setUsername(data.data.viewer.name)
      console.log(data)
    })
    .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    fetchData();
  },[fetchData]) 

  return (
   <div className='container'>
    <h1 className='text-primary'>  <FaProjectDiagram className='text-primary mx-2'/> Repos </h1>
    <p>Hello, Welcome <span className='text-secondary txt-bold text-uppercase'>{username}</span></p>
   </div> 
  )
}

export default App
