import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.json())

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
        {
      id: 3,
      name: "Jupiters",
    },
    {
      id: 4,
      name: "Venus",
    },
    {
      id: 5,
      name: "Mercury",
    },
    {
      id: 6,
      name: "Uranus",
    },
    {
      id: 7,
      name: "Neptune",
    },
    {
      id: 8,
      name: "Saturn",
    },
  ];

app.get("/api/planets", (req, res) => {
  res.status(200).json(planets);
});


app.get("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  const planet = planets.find((p) => p.id === Number(id));

  res.status(200).json(planet);
});

app.post("/api/planets", (req, res) => {
    const { id, name } = req.body;
    const newPlanet = {id, name};
    planets = [...planets, newPlanet]

    console.log(planets)

  res.status(201).json({msg:"The planet was created"});
});

/*
Col metodo POST ho inserito su Postman un nuovo pianeta,
 {
    "id": 9,
    "name" : "Moon"
}

e facendo l'upload risulta aggiunto agli altri pianeti
*/

app.put("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  const {name} = req.body;
  planets = planets.map((p) => p.id === Number(id) ? ({...p, name}) : p);

  console.log(planets)
  res.status(201).json({msg:"The planet was updated"});
});

/*
Col metodo PUT ho modificato su Postman il nome del pianeta 2,
 {
    "name" : "Mars Attacks!"
}

e facendo l'upload risulta aggiornato
*/

app.delete("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  planets = planets.filter((p) => p.id !== Number(id));

  console.log(planets)
  res.status(201).json({msg:"The planet was deleted"});
});


/*
Col metodo PUT ho semplicemente inserito su Postman il percorso del pianeta da eliminare

http://localhost:3000/api/planets/7

e facendo l'upload il pianeta con "id":7 risulta eliminato
*/


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});


