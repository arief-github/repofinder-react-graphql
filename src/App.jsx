import 'bootstrap';
import './scss/custom.scss';
import { FaProjectDiagram } from 'react-icons/fa';
import { useEffect } from 'react';
import { GET_CURRENT_LOGIN } from './gql/query';
import github from './config/token';

function App() {
  useEffect(() => {
    const githubQuery = {
      query: GET_CURRENT_LOGIN
    }

    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers,
      body: JSON.stringify(githubQuery),
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err))
  },[])

  return (
   <div className='container'>
    <h1 className='text-primary'>  <FaProjectDiagram className='text-primary mx-2'/> Repos </h1>
   </div>
  )
}

export default App
