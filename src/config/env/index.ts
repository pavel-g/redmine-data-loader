export const config = require("dotenv").config();

export const isProduction = process.env.NODE_ENV === "production";
export const issuesCouchdbParams = {
  url: process.env.REDMINE_DATA_LOADER_COUCHDB_ISSUES_DB_URL || '',
  username: process.env.REDMINE_DATA_LOADER_COUCHDB_ISSUES_DB_USERNAME || '',
  password: process.env.REDMINE_DATA_LOADER_COUCHDB_ISSUES_DB_PASSWORD || ''
};
export const redmineUrl = process.env.REDMINE_DATA_LOADER_REDMINE_URL || '';
export const redmineIssueEventEmitterUrl = process.env.REDMINE_DATA_LOADER_REDMINE_ISSUE_EVENT_EMITTER_URL || '';

export const usersCouchdbParams = {
  url: process.env.REDMINE_DATA_LOADER_COUCHDB_USERS_DB_URL || '',
  username: process.env.REDMINE_DATA_LOADER_COUCHDB_USERS_DB_USERNAME || '',
  password: process.env.REDMINE_DATA_LOADER_COUCHDB_USERS_DB_PASSWORD || ''
};