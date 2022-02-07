import "reflect-metadata";
import {createConnection} from "typeorm";
import {List} from "./entity/List";


createConnection().then(async connection => {

  const list = new List()
  list.nameOfList = 'nazwa2';
  list.filmsIds = [1,2,3];

  await list.save()
  console.log('lista dodana')


}).catch(error => console.log(error));
