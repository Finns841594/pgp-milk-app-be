import express from 'express';
import { Request, Response, Application } from 'express';
import {db} from './database';
import cors from 'cors';
import { standardResponseWithPagination } from './tools';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get('/api/test', (_req: Request, res: Response) => {
  return res.status(200).json({ test: 'is working as it should' });
});

// Decided to always return paginated results
// Get all paginated milks
app.get('/api/milks', (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  return res.status(200).json(standardResponseWithPagination(db.results, page));
});

// Search milks
app.get('/api/milks/search', (req: Request, res: Response) => {
  const search = req.query.q as string;
  const page = Number(req.query.page) || 1;

  const filteredMilks = db.results.filter((milk) => milk.name.toLowerCase().includes(search.toLowerCase()));

  return res.status(200).json(standardResponseWithPagination(filteredMilks,page));
});

// Get all milk types, return string[]
app.get('/api/milks/types', (_req: Request, res: Response) => {
  const milkTypes = db.results.map((milk) => milk.type);
  const uniqueMilkTypes = [...new Set(milkTypes)];
  return res.status(200).json(uniqueMilkTypes);
})

// Get all milks of a type
// params: type must be strictly equal to a type in the database, CASE SENSITIVE
app.get('/api/milks/types/:type', (req: Request, res: Response) => {
  const type = req.params.type;
  const page = Number(req.query.page) || 1;

  if (type?.toLowerCase() != 'all') {
    const filteredMilks = db.results.filter((milk) => milk.type === type);
    return res.status(200).json(standardResponseWithPagination(filteredMilks,page));
  } else {
    return res.status(200).json(standardResponseWithPagination(db.results,page));
  }
})

// Get milk by id
app.get('/api/milks/id/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const milk = db.results.find((milk) => milk.id === id);
  if (milk) {
    return res.status(200).json(milk);
  } else {
    return res.status(404).json({error: 'Milk not found'});
  }
})

export default app;
