import {Controller} from "@tsed/di";
import {PathParams} from "@tsed/common";
import {Get} from "@tsed/schema";
import {UsersLoaderService} from "../services/UsersLoaderService";
import {RedmineTypes} from "../types/redmine-types";

@Controller('/users')
export class UsersController {

  constructor(
    private usersLoaderService: UsersLoaderService
  ) {
  }

  @Get('/:id')
  async getUser(@PathParams('id') userId: number): Promise<RedmineTypes.User> {
    return await this.usersLoaderService.getUser(userId);
  }

}