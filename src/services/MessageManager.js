import fs from 'fs/promises'
import {Message} from '../models/Message'

export class MessageManager {
  constructor(ruta) {
    this.ruta = ruta
  }

  async addMessage(datos) {
    const message = new Message(datos)
    const messages = JSON.parse(await fs.readFile(this.ruta, 'utf-8'))
    messages.push(message)
    await fs.writeFile(this.ruta, JSON.stringify(messages, null, 2))
    return message
  }

  async findAll() {
    const messages = JSON.parse(await fs.readFile(this.ruta, 'utf-8'))
    return messages
  }
}

export const messagesManager = new MessageManager('./db/message.json')