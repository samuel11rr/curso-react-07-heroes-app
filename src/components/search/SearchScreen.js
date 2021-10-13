import React, { useMemo } from 'react'
import queryString from 'query-string'
import { HeroCard } from '../heroes/HeroCard'
import { useForm } from '../../hooks/useForm'
import { useLocation } from 'react-router-dom'
import { getHeroesByName } from '../../selectors/getHeroByName'


export const SearchScreen = ({ history }) => {

  const location = useLocation();
  const { q = '' } = queryString.parse(location.search);

  // searchInput es el name del input
  const [ formValues, handleInputChange ] = useForm({ searchInput: q });
  const { searchInput } = formValues;

  // el listado de heroes cambiará cuando el query de la url cambie
  const heroesFiltered = useMemo(() => getHeroesByName( q ), [ q ]);

  const handleSearch = (e) => {
    e.preventDefault();    
    history.push(`?q=${ searchInput }`);
  }


  return (
    <div>
      <h1> Search screen </h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4> Search form </h4>
          <hr />

          <form onSubmit={ handleSearch }>
            <input
              type="text"
              placeholder="Find your hero"
              className="form-control"
              autoComplete="off"
              name="searchInput"
              value={ searchInput }
              onChange={ handleInputChange }
            />

            <button
              type="submit"
              className="btn mt-1 btn-block btn-outline-primary"
            >
              Search
            </button>
          </form>
        </div>

        <div className="col-7">
          <h4> Results </h4>
          <hr />

          {
            ( q === '' ) && <div className="alert alert-info"> Search a hero </div>
          }

          {
            ( q !== '' && heroesFiltered.length === 0 ) 
              && <div className="alert alert-danger"> There is not a hero with { q } </div>
          }

          {
            heroesFiltered.map( hero => (
              <HeroCard
                key={ hero.id }
                { ...hero }
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}
