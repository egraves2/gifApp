import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import TextField from '@material-ui/core/Textfield'
import Button from '@material-ui/core/Button'
import { Search } from '@material-ui/icons'
import { LinearProgress } from '@material-ui/core'

function App() {
  const [text, setText] = useState('')
  const [memes, setMemes] = useState([])
  const [loading, setLoading] = useState(false)

  async function getMemes(){
    setLoading(true)
    setMemes([])
    const key = 'O7X4eO7OX8mzODs1qClF1QNuuEK6EWIa'
    let url = 'https://api.giphy.com/v1/gifs/search?'
    url += 'api_key=' + key
    url += '&q=' + text
    const r = await fetch(url)
    const body = await r.json()
    setMemes(body.data)
    setText('')
    setLoading(false)
  }

  console.log(memes)

  return (
    <div className="App">
      <header className="App-header">
        <div className="input-wrap">
          <TextField fullWidth  variant="outlined" 
            label="Search for memes"
            value={text}
            onChange={e=> setText(e.target.value)}
            onKeyPress={e=>{
            if(e.key==='Enter')
                getMemes()
            }}
          />
          <Button variant="contained" color="primary"
            onClick={getMemes}
          >
            <Search />
          </Button>
        </div>
      
      </header>

      {loading && <LinearProgress />}

      <div className="memes">
        {memes.map((meme,i)=> <Meme key={i} {...meme}/>)}
      </div>

    </div>
  );
}

function Meme({images, title}){
  const url = images.fixed_height.url
  return (<div className="meme" onClick={()=>window.open(url, '_blank')}>
    <div className="meme-title">{title}</div>
    <img height="200" alt="meme" src={url}/>
  </div>)
}

export default App;
