'use client'
import { useEffect, useState } from 'react'
import { ThemeProvider, Button, Input } from 'pcln-design-system'
import Confetti from 'react-confetti'

type Movies = string[]
type ProposedMovie = string | null

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function Congrats ({ secondChoice }) {
  const [isDisplayed, setIsDisplayed] = useState(false)
  const [confettiProps, setConfettiProps] = useState({})
  useEffect(() => {
    const container = {
      x: 0,
      y: 0,
      w: window.innerWidth,
      h: 0,
    }
    setIsDisplayed(true)
    setConfettiProps({
      numberOfPieces: window.innerWidth >= 1024 ? 600 : 375,
      gravity: 0.12,
      initialVelocityY: 10,
      confettiSource: container,
      tweenDuration: 5000,
      recycle: false,
      colors: ['#f68013', '#fedc2a', '#0068EF'],
    })
  }, [])

  return isDisplayed && secondChoice ? <Confetti {...confettiProps} /> : null
}

export default function Randomizer() {
	const [movieChoice, setMovieChoice] = useState('')
  const [secondChoice, setSecondChoice] = useState('')
  const [proposedMovie, setProposedMovie] = useState<ProposedMovie>('')
  const [movies, setMovies] = useState([])
    
  function handleChange(e) {
  	setProposedMovie(e.target.value)
  }
    
  function handleMovieProposal() {
  	setMovies([proposedMovie, ...movies])
		setProposedMovie('')
  }
    
  function randomizer (e: React.SyntheticEvent, movies: Movies) {
  	e.preventDefault()
    const selectedIndex = getRandomInt(movies.length)
    if (!movieChoice) {
      setMovieChoice(movies[selectedIndex])
      const moviesCopy = [...movies]
      moviesCopy.splice(selectedIndex, 1)
      setMovies(moviesCopy)
    } else {
      setSecondChoice(movies[selectedIndex])
      const moviesCopy = [...movies]
      moviesCopy.splice(selectedIndex, 1)
      setMovies(moviesCopy)
    }
	}
  
  function reset () {
  	setMovies([])
    setMovieChoice('')
    setSecondChoice('')
  }
  
  return (
    <ThemeProvider>
      <Congrats secondChoice={secondChoice} />
      <div className="flex flex-col items-center justify-between">
        <form onSubmit={e => randomizer(e, movies)}>
          <div className="flex flex-col items-center justify-between">
            <label htmlFor="movieTitle">Add a movie: </label>
            <div >
              <Input
                type="text"
                id="movieTitle"
                name="movieTitle"
                value={proposedMovie}
                onChange={handleChange} 
                className='text-white hover:text-white'
                color='text.lightest'
              />
            </div>
            <Button className="mt-4 w-full text-black" type="button" onClick={handleMovieProposal} color='pricePrimary.tone'>
              Propose a movie
            </Button>
          </div>
          {!movieChoice ? 
          <div className="flex flex-col items-center justify-between">
            {movies.map(movie => (
              <div className='mt-4 border-white' key={movie}>{movie}</div>
            ))}
          </div> : null}
          <div className="my-4 flex flex-col items-center justify-between">
            <Button className="w-full" type="submit" color='pricePrimary.tone'>{movieChoice ? 'Again!' : 'Randomize'}</Button>
          </div>
        </form>
        {movieChoice ? <div className='mb-4 text-6xl'>{movieChoice}</div> : null}
        {secondChoice ? <div className='mb-4 text-6xl'>{secondChoice}</div> : null}
        <Button className="w-full mb-4" color='pricePrimary.tone' onClick={reset}>Clear All</Button>
      </div>
    </ThemeProvider>
  )
}
