import type { ColumnType } from 'kysely'

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>

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

export interface Screening {
  id: Generated<number>
  movie_id: number
  time: string
  total_tickets: number
  taken_tickets: number
}

export interface ScreeningSeats {
  screeningId: number
  userId: number
}

export interface Stars {
  movieId: number
  personId: number
}

export interface Users {
  id: Generated<number>
}

export interface DB {
  directors: Directors
  movies: Movies
  people: People
  ratings: Ratings
  screening: Screening
  screeningSeats: ScreeningSeats
  stars: Stars
  users: Users
}
