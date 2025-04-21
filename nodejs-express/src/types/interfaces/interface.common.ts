import { Request, Response } from 'express';

export interface IRequest extends Request {}

export interface IResponse extends Request {}

export default interface IController {
  (req: IRequest, res: Response): void;
}