import { Request, Response, NextFunction, response, query } from "express";
import axios,{ AxiosResponse} from "axios";
import "reflect-metadata";
import {createConnection, createQueryBuilder, Repository} from "typeorm";
import {List} from '../../src/entity/List';
import {getConnection, Connection} from "typeorm";

interface Film {
    count: Number;
    next: null;
    previous: null;
    results: Array<{
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
        _id: Number;
    }>
}
//Array<Array<String | Number | String | String | String | String | Array<String> | Array<String> | Array<String> | Array<String> | Array<String> | String | String | String >>;





//pobieranie wszystkich filmów
const getFilms = async (req: Request, res: Response, next: NextFunction) => {

    let result: AxiosResponse = await axios.get('https://swapi.dev/api/films');
    let films: Film = result.data;
    let filmy: any[] = [];
    var objOfMaxFilms = Object.keys(films.results);
    let arrayOfMaxIndexFilms: Array<number> = [];

    //function check max value in array| like max() in PHP
    function arrayMax(arr: any) {
        return arr.reduce(function (p: any, v:any) {
          return ( p > v ? p : v );
        });
      }

    //funcion checking last index of all films; pushing to: arrayOfMaxIndexFilms[];
    objOfMaxFilms.forEach(function(number: any) {
        let _index = parseInt(objOfMaxFilms[number]);
        arrayOfMaxIndexFilms.push(_index);

    });

    //filtering of intresting data from JSON
    function display_view(){
        for( let i = 0; i<=arrayMax(arrayOfMaxIndexFilms); i++){
            let id = Math.floor(Math.random() * 11375);
            let titleFilm = films.results[i].title;
            let dataFilm = films.results[i].release_date;        
            filmy.push(id, titleFilm, dataFilm);
        };
    }
    display_view();
    return res.status(200).json({
        message: filmy
    });
};





//dodawanie listy i filmow
const favorites = async (req: Request, res: Response, next: NextFunction) => {
    let ids: Array<number> = req.body.ids;
    let title: string = req.body.nameOfList;
    const list = new List()
    //let response: AxiosResponse = await axios.post(`forexample`);
    createConnection().then(async connection => {
        list.nameOfList = title;
        list.filmsIds = ids;
        await list.save()
        console.log('lista dodana')
      }).catch(error => console.log(error));

    return res.status(200).json({
        Identificators: req.body.ids, Name_of_list: req.body.nameOfList
    });
};




//pobieranie ulubionej listy
const favorites_id = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id;

const connection: Connection = await createConnection();
    const  result = await getConnection()
    .getRepository(List)
    .createQueryBuilder("list")
    .where("list.nameOfList = :id", { id: id })
    .getOne();
    console.log(result);

    return res.status(200).json({
        message: result
    });
};

export default { getFilms, favorites,favorites_id };