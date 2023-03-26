import 'bootstrap';
import './scss/custom.scss';
import { FaProjectDiagram } from 'react-icons/fa';
import { useState, useEffect, useCallback } from 'react';
import query from './gql/query';
import github from './config/token';
import ListRepo from './components/ListRepo/ListRepo';

function App() {
  const [username, setUsername] = useState("");
  const [repoList, setRepoList] = useState(null);

  const fetchData = useCallback(() => {
    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers,
      body: JSON.stringify(query)
    })
    .then((res) => res.json())
    .then((data) => {
      const viewer = data.data.viewer;
      const repos = data.data.search.nodes;
      setUsername(viewer.name);
      setRepoList(repos);
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
    <ul className="list-group list-group-flush">
      {
        repoList ? repoList.map((repo) => (
          <ListRepo repo={repo} />
        )) : null
      }
    </ul>
   </div> 
  )
}

export default App
