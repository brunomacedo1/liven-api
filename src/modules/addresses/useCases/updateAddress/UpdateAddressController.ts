import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateAddressUseCase } from "./UpdateAddressUseCase";

class UpdateAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, address, zipcode, state, country } = request.body;

    const updateAddressUseCase = container.resolve(UpdateAddressUseCase);

    await updateAddressUseCase.execute({
      id,
      address,
      zipcode,
      state,
      country,
    });

    return response.status(201).send();
  }
}

export { UpdateAddressController };
