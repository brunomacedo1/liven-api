import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetAddressByIdUseCase } from "./GetAddressByIdUseCase";

class GetAddressByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getAddressByIdUseCase = container.resolve(GetAddressByIdUseCase);

    const address = await getAddressByIdUseCase.execute(id);

    return response.status(200).json(address);
  }
}

export { GetAddressByIdController };
