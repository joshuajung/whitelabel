import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("ping")
  getHello(): string {
    return "pong";
  }

  @Get("demoDtoSingle")
  getDemoDtoSingle() {
    return { id: "demoDtoSingle", name: "Hello", currentTime: 0, value: 23 };
  }

  @Get("demoDtoList")
  getDemoDtoList() {
    return [{ id: "demoDtoSingle", name: "Hello", currentTime: 0, value: 23 }];
  }
}
