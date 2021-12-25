export module RedmineTypes {

  export type IdAndName = {
    id: number;
    name: string;
  };

  export type CustomField = {
    id: number;
    name: string;
    value: string;
  };

  export type JournalDetail = {
    property: string;
    name: string;
    old_value: string;
    new_value: string;
  };

  export type Journal = {
    id: number;
    user: IdAndName;
    notes: string;
    created_on: string;
    details?: JournalDetail[];
  };

  export type Issue = {
    id: number;
    project: IdAndName;
    tracker: IdAndName;
    status: IdAndName;
    priority: IdAndName;
    author: IdAndName;
    category: IdAndName;
    fixed_version: IdAndName;
    subject: string;
    description: string;
    start_date: string;
    done_ratio: number;
    spent_hours: number;
    total_spent_hours: number;
    custom_fields: CustomField[];
    created_on: string;
    updated_on?: string;
    closed_on?: string;
    relations?: Record<string, any>[];
  }

  export module Unknown {
    export const num = -1;
    export const str = '';
    export const idAndName: IdAndName = {
      id: -1,
      name: str
    };
    export const unknownName = 'Unknown';
    export const subject = 'Unknown';
    export const date = '1970-01-01T00:00:00Z';
    export const issue: Issue = {
      id: num,
      project: idAndName,
      tracker: idAndName,
      status: idAndName,
      priority: idAndName,
      author: idAndName,
      category: idAndName,
      fixed_version: idAndName,
      subject: subject,
      description: str,
      start_date: date,
      done_ratio: num,
      spent_hours: num,
      total_spent_hours: num,
      custom_fields: [],
      created_on: date
    };

    export const user: User = {
      id: num,
      firstname: unknownName,
      lastname: unknownName,
      mail: str
    };
  }

  export type User = {
    id: number;
    firstname: string;
    lastname: string;
    mail: string;
  }

}