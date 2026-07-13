import express from 'express'
import {startConversation,getMyConversations,getMessages,sendMessage} from '../controllers/chat.controller.js'
import {protect} from '../middleware/auth.middleware.js'

const router =express.Router()

//all chats required login first without that can't ...
router.post('/start',protect,startConversation)
router.get('/conversations',protect,getMyConversations)
router.get('/:conversationId/messages',protect,getMessages)
router.post('/:conversationId/message',protect,sendMessage)

export default router

