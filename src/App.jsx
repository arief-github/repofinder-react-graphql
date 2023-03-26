import 'bootstrap';
import './scss/custom.scss';
import { FaProjectDiagram } from 'react-icons/fa';
import { useState, useEffect, useCallback } from 'react';
import query from './gql/query';
import github from './config/token';
import ListRepo from './components/ListRepo/ListRepo';
import Search from './components/Search/Search';
import Loading from './components/Loading/Loading';
import PageNavigation from './components/PageNavigation/PageNavigation';

function App() {
  // state for set the username in the header
  const [username, setUsername] = useState("");
  
  // state for retrieving repo list
  const [repoList, setRepoList] = useState(null);
  
  // state for searching list
  const [pageCount, setPageCount] = useState(10);
  const [queryString, setQueryString] = useState("");
  const [totalCount, setTotalCount] = useState(null);

  // state for pagination
  let [startCursor, setStartCursor] = useState(null);
  let [endCursor, setEndCursor] = useState(null);
  let [hasPreviousPage, setHasPreviousPage] = useState(false);
  let [hasNextPage, setHasNextPage] = useState(true);
  let [paginationKeyword, setPaginationKeyword] = useState("first");
  let [paginationString, setPaginationString] = useState("");

  // state for loading condition
  const [isloading, setIsLoading] = useState(false);

  const fetchData = useCallback(() => {
    const queryText = JSON.stringify(query(pageCount, queryString, paginationKeyword, paginationString))

    setIsLoading(true);

    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers,
      body: queryText,
    })
      .then((res) => res.json())
      .then((data) => {
        const viewer = data.data.viewer;
        const repos = data.data.search.edges;
        const total = data.data.search.repositoryCount;
        const start = data.data.search.pageInfo?.startCursor;
        const end = data.data.search.pageInfo?.endCursor;
        const next = data.data.search.pageInfo?.hasNextPage;
        const prev = data.data.search.pageInfo?.hasPreviousPage;

        setUsername(viewer.name);
        setRepoList(repos);
        setTotalCount(total);
        setStartCursor(start);
        setEndCursor(end);
        setHasNextPage(next);
        setHasPreviousPage(prev);
        setIsLoading(false);
      })
      .catch((err) => console.error(err))
  }, [pageCount, queryString, paginationString, paginationKeyword])

  useEffect(() => {
    fetchData();
  }, [fetchData])

  return (
    <div className='container'>
      <h1 className='text-primary'>  <FaProjectDiagram className='text-primary mx-2' /> Repos </h1>
      <p>Hello, Welcome <span className='text-secondary txt-bold text-uppercase'>{username}</span></p>

      <Search
        totalCount={totalCount}
        pageCount={pageCount}
        queryString={queryString}
        onQueryChange={(str) => setQueryString(str)}
        onTotalChange={(total) => setPageCount(total)}
      />

      <PageNavigation
        start={startCursor}
        end={endCursor}
        next={hasNextPage}
        previous={hasPreviousPage}
        onPage={(keyword, string) => {
          setPaginationKeyword(keyword);
          setPaginationString(string);
        }}
      />

      {
        isloading ? <Loading /> : (
          <ul className="list-group list-group-flush">
            {
              repoList ? repoList.map((repo) => (
                <ListRepo repo={repo.node} key={repo.node.id} />
              )) : null
            }
          </ul>
        )
      }
    </div>
  )
}

export default App
