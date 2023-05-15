import express from 'express';
import { Request, Response, Application } from 'express';
import {db} from './database';
import cors from 'cors';
import { idIncrementer } from './tools';

const app: Application = express();

// REMEMBER to add body-parser middleware!!!!!!!!!!!!!!
app.use(express.json());
// REMEMBER to add cors middleware!!!!!!!!!!!!!!
app.use(cors());

app.get('/api/test', (_req: Request, res: Response) => {
  return res.status(200).json({ test: 'is working as it should' });
});

app.get('/api/puppies', (_req: Request, res: Response) => {
  return res.status(200).json(db);
});

app.get('/api/puppies/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const puppy = db.find((puppy) => puppy.id === id);
  if (!puppy) {
    return res.status(404).json({ error: 'Puppy not found' });
  } else {
    return res.status(200).json(puppy);
  }
});

app.post('/api/puppies', (req: Request, res: Response) => {
  const puppy = req.body;
  const newId = idIncrementer(db);
  puppy.id = newId;
  db.push(puppy);
  return res.status(201).json(puppy);
});

app.put('/api/puppies/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const newPuppyInfo = req.body;
  const puppy = db.find((puppy) => puppy.id === id);
  if (!puppy) {
    return res.status(404).json({ error: 'Puppy not found' });
  } else if (!newPuppyInfo.name || !newPuppyInfo.breed || !newPuppyInfo.birthdate ) {
    return res.status(400).json({ error: 'Bad request' });
  } else {
    // Its COOL that you can change the value of a key in an object in an array like this !!!
      puppy.breed = newPuppyInfo.breed;
      puppy.name = newPuppyInfo.name;
      puppy.birthdate = newPuppyInfo.birthdate;
      return res.status(200).json(puppy);
    }
})

app.delete('/api/puppies/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const puppy = db.find((puppy) => puppy.id === id);
  if (!puppy) {
    return res.status(404).json({ error: 'Puppy not found' });
  } else {
    const index = db.indexOf(puppy);
    db.splice(index, 1);
    return res.status(204).json({ message: 'Puppy deleted' });
  }
});


export default app;
