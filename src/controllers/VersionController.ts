import {Controller} from "@tsed/di";
import {Get} from "@tsed/schema";

@Controller("/version")
export class VersionController {

  @Get('/')
  get() {
    return {
      name: 'redmine-data-loader',
      version: '0.1.0'
    }
  }

}