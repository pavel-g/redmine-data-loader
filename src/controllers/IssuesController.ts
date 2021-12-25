import {Controller} from "@tsed/di";
import {IssuesLoaderService} from "../services/IssuesLoaderService";
import {Get} from "@tsed/schema";
import {PathParams} from "@tsed/common";
import {RedmineTypes} from "../types/redmine-types";

@Controller('/issues')
export class IssuesController {

  constructor(
    private issuesLoaderService: IssuesLoaderService
  ) {
  }

  @Get('/:id')
  async getIssue(@PathParams('id') issueId: number): Promise<RedmineTypes.Issue> {
    return await this.issuesLoaderService.getIssue(issueId);
  }

}