import express from 'express';
import cors from 'cors';
import {mailer} from './mailer/mailer';



const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;



app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/status', (req, res) => {
    res.json({ status: 'ok' });
});

app.get('/version', (req, res) => {
    res.json({ version: '0.1.0' });
})

app.post('/api/email', async (req, res) => {
    const body = req.body;
    if (typeof body.message === 'string' && typeof body.subject === 'string' && typeof body.from === 'string') {
        const subject: string = body.subject;
        const message: string = body.message;
        const from: string = body.from;
        try {
            const result = await mailer(from, subject, message);
            res.json({ status: 'ok', messageId: result.messageId });
        } catch (err) {
            res.status(500).json({ status: 'error', message: 'Falló el envío', error: err });
        }
    }
    else{
        res.status(400).json({ status: 'error', error: 'Message is required and must be a non-empty string.' });
    }
})

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});