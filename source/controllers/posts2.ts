import { Request, Response, NextFunction } from "express";
import axios,{ AxiosResponse} from "axios";


interface Film {
    title: String;
    episode_id: Number;
    opening_crawl: String;
    director: String;
    producer: String;
    release_date: String;
    characters: Array <String>;
    planets: Array<String>;
    starships: Array<String>;
    vehicles: Array<String>;
    species: Array<String>;
    created: String;
    edited: String;
    url: String;
}

//pobieranie wszystkich filmów

const getFilms = async (req: Request, res: Response, next: NextFunction) => {
    let result: AxiosResponse = await axios.get('https://swapi.dev/api/films');
    let films: [Film] = result.data;


    let response: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    });


    return res.status(200).json({
        message: films
    });
};

//pobieranie pojedynczego filmu

const getFilm = async ( req: Request, res: Response, next: NextFunction) => {

    //pobieranie id filmu
    let id: string = req.params.id;

    //pobieranie konkretnego filmu
    let result: AxiosResponse = await axios.get(`https://swapi.dev/api/films/${id}`);
    let film: Film = result.data;
    return res.status(200).json({
        message: film
    });
};

export default { getFilms, getFilm };


___________________________________________
//pobieranie pojedynczego filmu
const favorites = async (req: Request, res: Response, next: NextFunction) => {
    let ids: Array<number> = [1,2,3];
    let response: AxiosResponse = await axios.post(`https://jsonplaceholder.typicode.com/posts`, {

    });
    return res.status(200).json({
        message: req.body
    });
    console.log(req.body);

};
