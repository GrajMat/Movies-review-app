
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let movies

export default class MoviesDAO {
    static async getMovieById(id) {
        try {
            return await movies.aggregate([
                {
                    $match: {
                        _id: new ObjectId(id),
                    }
                },
                {
                    $lookup:
                    {
                        from: 'reviews', //collection from witch we'll look up document - collection must exist in the same database
                        localField: '_id', //take _id from movies collection in thih case and compare it with movie_id from reviews collection
                        foreignField: 'movie_id',
                        as: 'reviews', // name of array witch will be add at the end of movies document
                    }
                }
            ]).next()
        } catch (e) {
            console.error(`something went wrong in getMovieById: ${e}`)
            throw e
        }
    }






    static async injectDB(conn) {
        if (movies) {
            return
        }
        try {
            movies = await conn.db(process.env.MOVIEREVIEWS_NS).collection('movies')
        } catch (e) {
            console.error(`unable to connect in MoviesDAO: ${e}`)
        }
    }


    //get All movies from database
    static async getMovies({//default filter
        filters = null,
        page = 0,
        moviesPerPage = 20 //will only get 20 movies at once


    } = {}) {
        let query
        if (filters) {
            // if ("title" in filters) {
            //     query = { $text: { $search: filters['title'] } }
            // } else if ("rated" in filters) {
            //     query = { "rated": { $eq: filters['rated'] } }

            // }
            if (filters.hasOwnProperty('title')) {
                query = { $text: { $search: filters.title } }
            } else if (filters.hasOwnProperty('rated')) {
                query = { "rated": { $eq: filters.rated } }

            }
        }
        let cursor
        try {
            cursor = await movies // find all query and assign it to cursor variable
                .find(query)
                .limit(moviesPerPage) //specify the maximum number of results to be returned
                .skip(moviesPerPage * page) //skips the first twenty results if page = 1 for example 

            const moviesList = await cursor.toArray()
            const totalNumMovies = await movies.countDocuments(query) //counts the number of documents that matches to the selection criteria
            return { moviesList, totalNumMovies }
        } catch (e) {
            console.error(`unable to issue find command: ${e}`)
            return { moviesList: [], totalNumMovies: 0 }
        }
    }



    static async getRatings() {
        let ratings = []
        try {
            ratings = await movies.distinct("rated")

            return ratings
        }
        catch (e) {
            console.error(`unable to get ratings, ${e}`)
            return ratings
        }
    }
}