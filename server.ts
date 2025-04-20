import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import { Request, Response, NextFunction } from 'express';


const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());


app.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

app.post('/users', async (req, res) => {
    const { email, name } = req.body;
    try {
        const newUser = await prisma.user.create({
            data: { email, name },
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});


app.get('/riders', async(req, res) => {
    try {
        const riders =await prisma.riders.findMany();
        res.json(riders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch riders' });
    }
})

app.post('/riders', async (req, res) => {
    const { title, name } = req.body;
    try {
        const newRider = await prisma.riders.create({
            data: { title, name },
        });
        res.status(201).json(newRider);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create rider' });
    }
});

// Fetch all user-rider relationships
app.get('/users-riders', async (req, res) => {
    try {
        const userRiders = await prisma.userRiders.findMany({
            include: { user: true, rider: true },
        });
        res.json(userRiders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user-rider relationships' });
    }
});

// Create a new user-rider relationship
app.post('/users-riders', async (req, res) => {
    const { userID, riderId, rank } = req.body;
    try {
        const userRider = await prisma.userRiders.create({
            data: { userID, riderId, rank },
        });
        res.status(201).json(userRider);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user-rider relationship' });
    }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${1000}`);
});