import {Service} from "@tsed/di";
import {issuesCouchdbParams, redmineIssueEventEmitterUrl} from "../config/env";
import {RedmineTypes} from "../types/redmine-types";
import axios from "axios";

@Service()
export class IssuesLoaderService {

  async getIssue(issueId: number): Promise<RedmineTypes.Issue> {
    let issue: RedmineTypes.Issue | null = await this.getIssueFromCache(issueId);
    if (issue) return issue;
    return (await this.getIssueFromRedmine(issueId));
  }

  private async getIssueFromCache(issueId: number): Promise<RedmineTypes.Issue|null> {
    const url = `${issuesCouchdbParams.url}/issue_${issueId}`;
    const authParams = {
      username: issuesCouchdbParams.username,
      password: issuesCouchdbParams.password
    };
    const resp = await axios.get<any>(url, {auth: authParams});
    console.debug('Loaded issue data from couchdb', resp);
    if (resp?.status == 200 && resp?.data) {
      delete resp.data._id;
      delete resp.data._rev;
      return resp.data as RedmineTypes.Issue;
    }
    return null;
  }

  private async getIssueFromRedmine(issueId: number): Promise<RedmineTypes.Issue> {
    await this.sendIssueLoadingTask(issueId);
    const unknownIssue = RedmineTypes.Unknown.issue;
    const issue = {...unknownIssue};
    issue.id = issueId;
    return issue;
  }

  private async sendIssueLoadingTask(issueId: number): Promise<void> {
    const url = `${redmineIssueEventEmitterUrl}/append-issues`;
    const resp = await axios.post(url, [issueId]);
    console.debug('Send issue loading task to redmine-issue-event-emitter', resp);
  }

}