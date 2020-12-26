import React, { useState, useEffect } from 'react';
import { getData } from './Pokemon';
import { Navbar, Box, BoxDetail, BoxImage, TableStyled, 
  BtnDetail, BtnRelease, BtnCatch, InputBox, BtnNext, 
  BtnPrev, BtnNextPrevDisabled, BtnGroup, GridContainer,
  BoxInfo, BoxWarning } from './style';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';

window.onbeforeunload = function() {
  localStorage.clear();
}

function App() {
  const [Pokemon, setPokemon] = useState( [] );
  const [NextList, setNextList] = useState( '' );
  const [PrevList, setPrevList] = useState( '' );
  const [Loading, setLoading] = useState(true);
  const Url = 'https://pokeapi.co/api/v2/pokemon';
  const [PokemonName, setPokemonName] = useState( localStorage.getItem('pokemon-name') );
  const [PokNickname, setPokNickName] = useState ( localStorage.getItem('pokemon-nickname') );
  const [MyPokemon, setMyPokemon] = useState ( localStorage.getItem('my-pokemon-data') );
  const [PokemonDetail, setPokemonDetail] = useState( localStorage.getItem('pokemon-detail') );
  const [ShowForm, setShowForm] = useState( localStorage.getItem('show-form') );
  const [ClickAdd, setClickAdd] = useState( 0 );

  useEffect(() => {
    localStorage.setItem('pokemon-name', PokemonName);
  }, [PokemonName] );

  useEffect(() => {
    localStorage.setItem('pokemon-nickname', PokNickname);
  }, [PokNickname] );

  useEffect(() => {
    localStorage.setItem('pokemon-detail', JSON.stringify(PokemonDetail));
  }, [PokemonDetail]);

  useEffect(() => {
    localStorage.setItem('my-pokemon-data', JSON.stringify(MyPokemon));
  }, [MyPokemon] );

  useEffect(() => {
    localStorage.setItem('show-form', ShowForm);
  }, [ClickAdd, ShowForm] );
  
  useEffect(() =>  {
    async function fetchData() {
      let data = await getData(Url);
      setNextList(data.next);
      setPrevList(data.previous);
      setPokemon(data.results);
      setLoading(false);
    }
    fetchData();
  }, [] );
  
  useEffect(() => {
    if(PokemonName){
      let name = PokemonName.split(';');
      let data = getData(Url+'/'+name[0]);
      
      data.then(val => 
        setPokemonDetail({
          name: name[0],
          nickname: name[1],
          img: val.sprites.front_shiny,
          abilities: val.abilities,
          moves: val.moves,
          height: val.height,
          weight: val.weight,
          types: val.types
        })
      )
    }
  }, [PokemonName]);

  const next = async () => {
    if(!NextList) return;
    let data = await getData(NextList);
    setPokemon(data.results);
    setNextList(data.next);
    setPrevList(data.previous);
  }

  const prev = async () => {
    if(!PrevList) return;
    let data = await getData(PrevList);
    setPokemon(data.results);
    setNextList(data.next);
    setPrevList(data.previous);
  }

  function catchPokemon() {
    var catchPok = Boolean(Math.round(0 + Math.random() * (1 - 0)));
    setClickAdd(1);
    setShowForm(catchPok);
    
    localStorage.setItem('click add: ',ClickAdd);
    if(catchPok){
      return alert('Catch pokemon SUCCESS')
    }else{
      return alert('Catch pokemon FAILED')
    }
  }

  const ChangeNickname = (e) => {
    setPokNickName(e.target.value);
  }

  const addMyPokemon = (e) => {
    e.preventDefault();
    if(PokNickname !== ''){
      let cek = 0;
      if(MyPokemon !== null){
        cek = MyPokemon.filter(val => val.nickname === PokNickname).length;
      }

      if(cek === 0){ 
        setMyPokemon([...MyPokemon, {
          name: PokemonDetail.name,
          nickname: PokNickname
        }])
        setPokNickName('');
        setShowForm(false);    
        alert('The pokemon is added!');
      }else{
        alert('Nickname is already exist!');
      }
    }else{
      return alert('Symbol is not allowed!');
    }
  }
  const releasePokemon = (data) => {
    let newData  = MyPokemon.filter(val => { return val.nickname !== data.nickname});
    setMyPokemon(newData);    
  }

  //POKEMON PAGE
  function pokemonPage() {
    return(
      <Box>
        <center>
          <label><h1>Pokemon List</h1></label>
          <BtnGroup>
            {PrevList ? (<BtnPrev onClick={prev}>PREV</BtnPrev>) : (<BtnNextPrevDisabled>PREV</BtnNextPrevDisabled>) }
            {NextList ? (<BtnNext onClick={next}>NEXT</BtnNext>) : (<BtnNextPrevDisabled>NEXT</BtnNextPrevDisabled>) }
          </BtnGroup>
        </center>
        <TableStyled>
          <table>
            <tr>
              <th>Name</th>
              <th>Total Owned</th>
              <th>Action</th>
            </tr>
            {Pokemon.map((pok, i) =>
              <tr key={pok.name}>
                <td>{pok.name}</td>
                <td>
                  {MyPokemon ? (MyPokemon.filter(val => val.name === pok.name).length):(0)}
                </td>
                <td><BtnDetail><Link to={'/pokemon/'+pok.name+';'}>Detail</Link></BtnDetail></td>
              </tr>
            )}
          </table>
        </TableStyled>
        <center>
          <BtnGroup>
            {PrevList ? (<BtnPrev onClick={prev}>PREV</BtnPrev>) : (<BtnNextPrevDisabled>PREV</BtnNextPrevDisabled>) }
            {NextList ? (<BtnNext onClick={next}>NEXT</BtnNext>) : (<BtnNextPrevDisabled>NEXT</BtnNextPrevDisabled>) }
          </BtnGroup>
        </center>
      </Box>
    );
  }

  //POKEMON DETAIL PAGE
  function showDetail( {match} ) {
    setPokemonName(match.params.name);
    if(PokemonDetail){
      return(
        <>
        { Loading ? <h1>LOADING...</h1> :(
          <>
          <Box>
            <center>
              <label><h1>Pokemon Detail</h1></label>
            </center>
            <BoxDetail>
              <BoxImage>
                <img src={PokemonDetail.img} alt='Pokemon Pict'/>
              </BoxImage>
              {PokemonDetail.nickname !== '' ? (
                <>
                <div className='labelBox'>  
                  <label><b>Nickname</b></label>
                </div>
                <div className='labelVal'>
                  {PokemonDetail.nickname}
                </div>
                </>
              ):(<></>)}
              <div className='labelBox'>
                <label><b>Name</b></label>
              </div>
              <div className='labelVal'>
                {PokemonDetail.name}
              </div>
              <div className='labelBox'>
                <label><b>Moves</b></label>
              </div>
              <GridContainer>
                {PokemonDetail.moves.map(val=><div>{val.move.name}</div>)}
              </GridContainer>
              <div className='labelBox'>
                <label><b>Abilities</b></label>
              </div>
              <GridContainer>
                {PokemonDetail.abilities.map(val=><div>{val.ability.name}</div>)}
              </GridContainer>
              <div className='labelBox'> 
                <label><b>Types</b></label>
              </div>
              <GridContainer>
                {PokemonDetail.types.map(val=><div>{val.type.name}</div>)}
              </GridContainer>
              <div className='labelBox'>
                <label><b>Weight</b></label>
              </div>
              <div className='labelVal'>
                {PokemonDetail.weight}
              </div>
              <div className='labelBox'>
                <label><b>Height</b></label>
              </div>
              <div className='labelVal'>
                {PokemonDetail.height}
              </div>
            </BoxDetail>
              {PokemonDetail.nickname === '' ? (
                <center>
                  <BtnCatch onClick={catchPokemon}>
                    Catch The Pokemon
                  </BtnCatch>
                </center>
              ):(<></>)}
          </Box>
          {ShowForm ? (
          <InputBox>
            <div id="myModal" className="modal">
              <div className="modal-content">
                <h1>Give The Pokemon Nickname</h1><br/>
                <form onSubmit={addMyPokemon}>
                  <input type="text" placeholder='Put the nickname here' pattern="[0-9][A-Za-z]*" value={PokNickname} to={ChangeNickname} title="Symbol are not allowed!" required/><br/>
                  <input type='submit' value='ADD'/>
                </form>
              </div>
          </div>
          </InputBox>
          ) : null}
          </>
        )}        
        </>  
      );
    }else{      
      return null
    }
  }

  //MY POKEMON PAGE
  function myPokemonPage() {
    return(
      <Box>
      <div className="row">
        <center>
          <label><h1>My Pokemon List</h1></label>
        </center>
        
        {MyPokemon === null || MyPokemon.length === 0 ? (
          <>
          <BoxWarning>
            <p><b>Doesn't have any pokemon!</b></p>
          </BoxWarning>
          <BoxInfo>
            <p>
              <b>How to catch the pokemon?</b><br/>
              <ul>
                <li>Go to the pokemon page</li>
                <li>Choose the pokemon and click <b>Detail</b></li>
                <li>From the detail page you can catch the pokemon by clicking <b>Catch The Pokemon</b></li>
                <li>If <b>Catch The Pokemon SUCCESS</b> then put nickname for the pokemon and click <b>ADD</b></li>
              </ul>
            </p>
          </BoxInfo>
          </>
          ):(
        <TableStyled>
          <table>
            <tr>
              <th>Name</th>
              <th>Nickname</th>
              <th>Action</th>
            </tr>
            {MyPokemon.map(pok => 
              <tr key={pok.id}>
                <td>{pok.name}</td>
                <td>{pok.nickname}</td>
                <td>
                  <BtnDetail><Link to={'/pokemon/'+pok.name+';'+pok.nickname}>Detail</Link></BtnDetail>
                  <BtnRelease><Link to={'/mypokemon'} className='btn-remove' onClick={releasePokemon.bind(this, pok)} >Release</Link></BtnRelease>
                </td>
              </tr>
            )}
          </table>
        </TableStyled>
        )}
      </div>
      </Box>
    )
  }
  
  return (
    <BrowserRouter>
    { Loading ? <h1>LOADING...</h1> :(
      <>
      <Navbar>
        <ul>
          <li><Link to='/'>Pokemon</Link></li>
          <li><Link to='/mypokemon'>My Pokemon</Link></li>
        </ul>
      </Navbar>

      <main>
        <Switch>
          <Route path='/' exact component={pokemonPage} />
          <Route path='/pokemon/:name' exact component={showDetail} />
          <Route path='/mypokemon' exact component={myPokemonPage} />
        </Switch>
      </main>
      </>
    )}
    </BrowserRouter>
  );
}

export default App;
