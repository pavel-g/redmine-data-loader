import {Service} from "@tsed/di";
import {RedmineTypes} from "../types/redmine-types";
import {redmineUrl, usersCouchdbParams} from "../config/env";
import axios from "axios";

@Service()
export class UsersLoaderService {

  async getUser(userId: number): Promise<RedmineTypes.User> {
    const cachedUser = await this.getUserFromCache(userId);
    if (cachedUser) {
      // @ts-ignore
      delete cachedUser._id;
      // @ts-ignore
      delete cachedUser._rev;
      return cachedUser;
    }

    const redmineUser = await this.getUserFromRedmine(userId);
    await this.saveUserToCache(redmineUser);

    return redmineUser;
  }

  private async getUserFromCache(userId: number): Promise<RedmineTypes.User|null> {
    const url = `${usersCouchdbParams.url}/${userId}`;
    const authParams = {
      username: usersCouchdbParams.username,
      password: usersCouchdbParams.password
    };
    let resp;
    try {
      resp = await axios.get(url, {auth: authParams});
    } catch (e) {
      return null;
    }
    if (resp?.status == 200 && resp?.data) {
      return resp.data as RedmineTypes.User;
    }
    return null;
  }

  private async getUserFromRedmine(userId: number): Promise<RedmineTypes.User> {
    const url = `${redmineUrl}/users/${userId}.json`;
    let resp = null;
    try {
      resp = await axios.get(url);
    } catch (e) {
      console.error('Error at get user from redmine:', e);
      resp = null;
    }
    if (resp?.status == 200 && resp?.data?.user) {
      return resp.data.user as RedmineTypes.User;
    }
    const unknownUser = RedmineTypes.Unknown.user;
    const user = {...unknownUser};
    user.id = userId;
    return user;
  }

  private async saveUserToCache(user: RedmineTypes.User): Promise<RedmineTypes.User> {
    const url = `${usersCouchdbParams.url}/${user.id}`;
    const authParams = {
      username: usersCouchdbParams.username,
      password: usersCouchdbParams.password
    };
    try {
      await axios.put(url, user, {auth: authParams});
    } catch (e) {
      console.error('Error at save user to couchdb:', e);
    }
    return user;
  }

}