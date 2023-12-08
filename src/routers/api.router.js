import { Router, json } from 'express';
import { messagesManager } from '../services/MessageManager.js';

export const apiRouter = Router();
apiRouter.use(json());

apiRouter.post('/messages', async (req, res) => {
    try {
        const message = req.body
        await messagesManager.addMessage(message);
        res['greet']();
        res['notifyNewMessage']();
        // operation was successful
        res.status(201).json(message)
    } catch (error) {
        // operation failed
        res.status(500).json({error: error.message})
    }
});