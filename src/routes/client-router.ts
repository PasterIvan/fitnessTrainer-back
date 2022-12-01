import {Request, Response, Router} from "express";
import {clientService} from "../domain/client-service";

export const clientRouter = Router()

clientRouter.get('/', async (req: Request, res: Response) => {
    const clients: any[] = await clientService.getAllClients();
    res.send(clients)
})
clientRouter.post('/', async (req: Request, res: Response) => {
    const newClient: any = await clientService.createClient(req.body.clientId)
    res.status(201).send(newClient)
})
clientRouter.get('/:clientId', async (req: Request, res: Response) => {
    const client: any | null = await clientService.getClientById(req.params.clientId)
    client ? res.send(client) : res.send(404)
})
clientRouter.delete('/:clientId', async (req: Request, res: Response) => {
    const isDeletedClient: boolean = await clientService.deleteClient(req.params.clientId)
    isDeletedClient ? res.send(204) : res.send(404)
})
