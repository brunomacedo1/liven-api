import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateAddressUseCase } from "./CreateAddressUseCase";

class CreateAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { address, country, state, zipcode } = request.body;

    const createAddresUseCase = container.resolve(CreateAddressUseCase);

    await createAddresUseCase.execute({
      address,
      country,
      state,
      user_id: id,
      zipcode,
    });

    return response.status(201).send();
  }
}

export { CreateAddressController };
