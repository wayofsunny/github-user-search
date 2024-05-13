import {useState}from "react"
import"./App.css"

const API_URL = "https://api.github.com"


async function fetchResults(query){
  try{
    const response = await fetch(`${API_URL}/search/users?q=${query}`);
    const json = await response.json();
    return json.items || [];
  } catch(e){
    throw new Error(e);
  }
}





export default function App() {
  const[query,setQuery] = useState("");
  const[results,setResults] = useState([]);

  function onSearchchange(event){
    setQuery(event.target.value)

  }
 
  async function onSubmitchange(event){
    event.preventDefault();
    const results = await fetchResults(query);
    setResults(results);

  }

  return (
   <div className = "app">
    <div className = "main">
      <h2>GITHub User Search</h2>
      <Form
      onSubmit={onSubmitchange}
      onChange={onSearchchange}
      value={query}/>
      <h3>Results</h3>
      <div className="results">
          <div>
            {results.map((user) => (
              <User
               
                avatar={user.avatar_url}
                url={user.html_url}
                username={user.login}
              />
            ))}
          </div>
        </div>
      
    </div>
   </div>
  )
}

function User({ avatar, url, username }) {
  return (
    <div className="user">
      <img src={avatar} alt="Profile" width="100" height="100" />
      <a href={url} target="_blank" rel="noopener noreferrer">
        {username}
      </a>
    </div>
  );
}


function Form({ onSubmit,onChange, value})   {
  return(
    <form className="search" onSubmit = {onSubmit}>
      <input
      id="search"
      type="text"
      placeholder="enter user name or email"
      onChange ={onChange}
      value={value}
      />
      <button type="submit">Search</button>
    </form>
  );
}