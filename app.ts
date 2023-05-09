import express from 'express';
import { Request, Response, Application } from 'express';
import {db} from './database';

const app: Application = express();

// REMEMBER to add body-parser middleware!!!!!!!!!!!!!!
app.use(express.json());

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
  db.push(puppy);
  return res.status(201).json(puppy);
});

app.put('/api/puppies/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const newPuppyInfo = req.body;
  const puppy = db.find((puppy) => puppy.id === id);
  if (!puppy) {
    return res.status(404).json({ error: 'Puppy not found' });
  } else {
    // Its COOL that you can change the value of a key in an object in an array like this !!!
    if (newPuppyInfo.breed) {
      puppy.breed = newPuppyInfo.breed;
    } else if (newPuppyInfo.name) {
      puppy.name = newPuppyInfo.name;
    } else if (newPuppyInfo.birthdate) {
      puppy.birthdate = newPuppyInfo.birthdate;
    } else {
      return res.status(400).json({ error: 'Bad request' });
    }
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
