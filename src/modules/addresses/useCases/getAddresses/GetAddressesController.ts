import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetAddressesUseCase } from "./GetAddressesUseCase";

class GetAddressesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { country } = request.query;

    const getAddressesUseCase = container.resolve(GetAddressesUseCase);

    const addresses = await getAddressesUseCase.execute({
      user_id,
      country: country as string,
    });

    return response.status(200).json(addresses);
  }
}

export { GetAddressesController };
