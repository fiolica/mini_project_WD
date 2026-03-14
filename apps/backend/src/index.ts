import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import ExampleRouter from './routes/example.route';

const app: Application = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

app.get('/ping', (req: Request, res: Response) => {
  res.send('pong! testing branch');
});

// example routes
app.use('/api/example', ExampleRouter);

// Not Found Route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(
      `✅ Server Api Running... \n ➜  [API] 🚀 Local: http://localhost:${String(PORT)}`
    );
  });
}

export default app;
