const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Get Banner Details
app.get('/api/banner', async (req, res) => {
    const banner = await prisma.banner.findFirst();
    res.json(banner);
});

// Update Banner Details
app.post('/api/banner', async (req, res) => {
    const { description, timer, link } = req.body;
    const updatedBanner = await prisma.banner.upsert({
        where: { id: 1 },
        update: { description, timer, link },
        create: { description, timer, link },
    });
    res.json(updatedBanner);
});

app.listen(5000, () => console.log('Server running on port 5000'));
