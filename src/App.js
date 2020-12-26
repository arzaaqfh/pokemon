import React, { useState, useEffect, useRef } from 'react';
import { getData } from './Pokemon';
import { Navbar, Box, BoxDetail, BoxImage, TableStyled, 
  BtnDetail, BtnRelease, BtnCatch, InputBox, BtnNext, 
  BtnPrev, BtnNextPrevDisabled, BtnGroup, GridContainer } from './style';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';

function App() {
  const [Pokemon, setPokemon] = useState( [] );
  const [NextList, setNextList] = useState( '' );
  const [PrevList, setPrevList] = useState( '' );
  const [Loading, setLoading] = useState(true);
  const Url = 'https://pokeapi.co/api/v2/pokemon';
  const [PokemonName, setPokemonName] = useState( '' );
  const PokNickname = useRef ( null );
  const [MyPokemon, setMyPokemon] = useState ( [{name: '', nickname: ''}] );
  const [PokemonDetail, setPokemonDetail] = useState( [{name: '', nickname: '', img: '', abilities: [], moves: [], height: '', weight: '', types: []}] );
  const [ShowForm, setShowForm] = useState(false);

  useEffect(() => {
    const dataPokemonName = localStorage.getItem('pokemon-name');
    const dataPokemonDetail = localStorage.getItem('pokemon-detail');
    const dataMyPokemon = localStorage.getItem('my-pokemon-data');

    if(dataPokemonName){
      setPokemonName(dataPokemonName);
    }
    if(dataPokemonDetail){
      setPokemonDetail(JSON.parse(dataPokemonDetail));
    }
    if(dataMyPokemon){
      setMyPokemon(JSON.parse(dataMyPokemon));
    }
  }, [] );

  useEffect(() => {
    if(PokemonDetail){
      localStorage.setItem('pokemon-detail', JSON.stringify(PokemonDetail));
    }
    if(MyPokemon){
      localStorage.setItem('my-pokemon-data', JSON.stringify(MyPokemon));
    }
    if(PokemonName !== ''){
      localStorage.setItem('pokemon-name', PokemonName);
    }
  } );

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
    if(PokemonName !== ''){
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
    setShowForm(catchPok);
    return(
      <>
      { catchPok ? alert('Catch pokemon SUCCESS') : alert('Catch pokemon FAILED')} 
      </>
    )  
  }

  const addMyPokemon = () => {
    let cek = MyPokemon.filter(val => val.nickname === PokNickname.current.value).length;
    
    if(cek === 0){
      setShowForm(false);
      setMyPokemon([...MyPokemon, {
        name: PokemonDetail.name,
        nickname: PokNickname.current.value
      }])
      PokNickname.current.value = '';
      alert('The pokemon is added!');
    }else{
      setShowForm(true);
      alert('Nickname is already exist!');
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
                <td>{MyPokemon.filter(val => val.name === pok.name).length}</td>
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
    return(
      <>
      { Loading ? <h1>LOADING...</h1> :(
        <>
        <Box>
          <label><h1>Pokemon Detail</h1></label>

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
                  Catch the Pokemon
                </BtnCatch>
              </center>
            ):(<></>)}
        </Box>
        {ShowForm ? (
        <Box>
          <InputBox>
          <h1>Give The Pokemon Nickname</h1>
          <form onSubmit={addMyPokemon}>
            <label>Pokemon Nickname: </label>
            <input name="nickname" type="text" ref={PokNickname} required/><br/>
            <input type='submit' value='ADD' />
          </form>
          </InputBox>
        </Box>
        ) : null}
        </>
      )}        
      </>  
    );
  }

  //MY POKEMON PAGE
  function myPokemonPage() {
    return(
      <Box>
      <div className="row">
        <center>
          <label><h1>My Pokemon List</h1></label>
        </center>

        {MyPokemon.length === 0 ? (<p>Doesn't have any pokemon!</p>):(
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
    );
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
