export interface Directors {
  movieId: number
  personId: number
}

export interface Movies {
  id: number | null
  title: string
  year: number | null
}

export interface People {
  id: number | null
  name: string
  birth: number | null
}

export interface Ratings {
  movieId: number
  rating: number
  votes: number
}

export interface Stars {
  movieId: number
  personId: number
}

export interface Screenings {
  screenId: number
  movieId: number
  totalTickets: number
}

export interface Seats {
  screenId: number
  seat: string
  taken: boolean
  userId: number
}

export interface User {
  userId: number
}

export interface DB {
  directors: Directors
  movies: Movies
  people: People
  ratings: Ratings
  stars: Stars
  screenings: Screenings
  seats: Seats
  user: User
}
