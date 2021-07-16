import { Request, Response } from 'express'


const homePage = (req: Request, res: Response) => {
    res.send('Hi')
}

export default {
    homePage
}