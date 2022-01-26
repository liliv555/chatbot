import { Router, Request, Response } from 'express'
import { startChatbotDTO } from '../dto/startChatbot.dto'
import { receiveMessageDTO } from '../dto/receiveMessage.dto'
import * as controller from  '../controllers/index'

const router = Router()

router.post('/startchatbot', async (req: Request, res: Response) => {
    try {
        const payload: startChatbotDTO = req.body
        const result = await controller.startChatbot(payload.phoneNumber)
        return res.status(200).send(result)
    } catch (error) {
        res.status(error.status).json( { error: { code: error.code, message: error.message } });
    }
})

router.post('/receivemessage', async (req: Request, res: Response) => {
    try {
        const payload: receiveMessageDTO = req.body;
        const result = await controller.receiveMessage(payload.phoneNumber, payload.answerText);
        return res.status(200).send(result);
    } catch (error) {
        res.status(error.status).json( { error: { code: error.code, message: error.message } });
    }
})

export default router