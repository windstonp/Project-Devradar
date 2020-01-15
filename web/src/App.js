import React ,{useState,useEffect} from 'react';
import api from './services/api';
import './global.css';
import './app.css';
import './sideBar.css';
import './Main.css';
import Devitem from './components/devitem';
import DevForm from "./components/devform";
function App() {
  const [devs,setDevs] = useState([]);
  useEffect(()=>{
    async function loadDevs() {
      const response = await api.get('/devs');
      setDevs(response.data);
    };
    loadDevs();
  },[]);
  async function handleDevSubmit(data){
    const response = await api.post('/devs',data)
    setDevs([
      ...devs,
      response.data
    ]);
  }
  return (
    <div id="app">
      <aside>
        <strong>Sign-up</strong>
        <DevForm onSubmit={handleDevSubmit}/>
      </aside>
      <main>
        <ul>
          {devs.map(dev=>(
            <Devitem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}
export default App;

