
export interface IUsers {
    '_id': string;
    'first_name': string;
    'last_name': string;
    'email': string;
    'status': boolean;
    'role_name': any;
    'code': string;
    'img_name': string;
    'img_unique_name': string;
    'display_url': string;
}


export interface IUser {
    '_id': string;
    'first_name': string;
    'last_name': string;
    'email': string;
    'phone': string;
    'user_type': number;
    'office_user_id': string;
    'specialists': Array<string>;
    'day_of_the_week': Array<string>;
    'status': boolean;
    'role_name': any;
    'role_id': any;
    'code': any;
    'img_name': string;
    'display_url': string;
    'zoom_link': string;
    'qualifications': string;
    'background': string;
    'experience': any;
    'time_zone': any;
    'allocation': number;
}


export interface IExperience {
    'id': string;
    'name': string;
    'status': boolean;
    'label': string;
    'value': any;
}

export interface ITimeZone {
    'id': string;
    'name': string;
    'code': string;
    'offset_value': string;
    'label': string;
    'value': string;
    'utc_offset': string;
    'gmt_offset': string;
    'status': boolean;
}

export interface IUsersResponseData {
    paginated_results: Array<IUsers>;
    total_count: number
}

export interface ITextLineData {
    data: string;
}
