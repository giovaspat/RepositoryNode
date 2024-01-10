import { Request, Response } from "express";
import Joi from "joi";
import { db } from "../db.js";


type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

let planets: Planets = [
    {
      id: 1,
      name: "Earth",
    },
    {
      id: 2,
      name: "Mars",
    },
  ];


const getAll =  async(req: Request, res: Response) => {
  const planets = await db.many(`SELECT * FROM planets;`);
  console.log(planets)
  res.status(200).json(planets);
}

const getOneById = async(req: Request, res: Response) => {
  const { id } = req.params;
  const planet = await db.one(`SELECT * FROM planets WHERE id=$1;`, Number(id));

  res.status(200).json(planet);
}

const planetScheme =  Joi.object ({
  id: Joi.number().integer().required(),
  name: Joi.string().required(), 
})

const create = async(req: Request, res: Response) => {
    const { id, name } = req.body;
    const newPlanet: Planet = {id:id, name};
    const newPlanetValidation = planetScheme.validate(newPlanet)

    if (newPlanetValidation.error) {
      return res.status(400).json ({msg: newPlanetValidation.error.details[0].message})
    } else {
      await db.none(`INSERT INTO planets (name) VALUES ($1)`,name)
      res.status(201).json({msg:"The planet was created"});
    }
}

const createImage = async(req: Request, res: Response) => {
  const { id } = req.params;
  const fileName = req.file?.path;

  if(fileName) {
    db.none(`UPDATE planets SET image=$2 WHERE id=$1`, [id, fileName])
    res.status(201).json({msg:"Planet image uploaded"});
  }else {
    res.status(400).json({msg:"Planet uploading failed"});
  }


}

const updateById = async(req: Request, res: Response) => {
  const { id } = req.params;
  const {name} = req.body;
  await db.none(`UPDATE planets SET name=$2 WHERE id=$1`, [id,name])

  res.status(201).json({msg:"The planet was updated"});
}

const deleteById = async(req: Request, res: Response) => {
  const { id } = req.params;
  await db.none(`DELETE FROM planets WHERE id=$1`, Number(id))

  console.log(planets)
  res.status(201).json({msg:"The planet was deleted"});
}

export {getAll, getOneById, create, createImage, updateById, deleteById}