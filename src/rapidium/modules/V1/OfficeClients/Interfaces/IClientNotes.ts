export interface IClientNotes {
    'note_id': string;
    'note_name': string;
    'note_label': string;
    'description': string;
    'last_modified_by': any;
    'last_modified_date': string;
}

export interface IClientNotesData {
    'client_id': string;
    'note_id': string;
    'note_name': string;
    'note_label': string;
    'description': string;
    'last_modified_by': any;
    'last_modified_date': string;
}

export interface IClientNotesArr {
  [key: string]: {
    description: string;
    note_id: string;
    note_name: string;
    note_label: string;
    last_modified_by: string;
    last_modified_date: string;
  };
}
