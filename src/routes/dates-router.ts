import {Request, Response, Router} from "express";
import {DateType} from "../stateTypes";
import {datesService} from "../domain/dates-service";

export const datesRouter = Router()

datesRouter.get('/', async (req: Request, res: Response) => {
    const dates: DateType[] = await datesService.getAllDates();
    res.send(dates)
})
datesRouter.post('/', async (req: Request, res: Response) => {
    const newDate: DateType = await datesService.createDate(req.body.dateId)
    res.status(201).send(newDate)
})
datesRouter.get('/:dateId', async (req: Request, res: Response) => {
    const date: DateType | null = await datesService.getDatesById(req.params.dateId)
    date ? res.send(date) : res.send(404)
})

datesRouter.delete('/:dateId', async (req: Request, res: Response) => {
    const isDeletedDate: boolean = await datesService.deleteDates(req.params.dateId)
    isDeletedDate ? res.send(204) : res.send(404)
})
