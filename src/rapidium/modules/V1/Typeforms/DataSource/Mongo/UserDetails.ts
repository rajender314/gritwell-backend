import { UserSchema } from '@basePath/Admin/DataSource/Models/Schema/UserSchema';
export class UserDetails {
    public email: string;
    constructor(email) {
        this.email = email;
    }
    async get() {
        return await UserSchema.aggregate([
            { $match: { email: this.email } },
            {
                $lookup: {
                    from: 'customers',
                    localField: '_id',
                    foreignField: 'user_id',
                    as: 'user_data',
                },
            },
            {
                $unwind: {
                    path: '$user_data',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $project: {
                    first_name: 1,
                    last_name: 1,
                    email: 1,
                    phone: '$user_data.phone',
                    address: '$user_data.address',
                    state: '$user_data.state',
                    dob: '$user_data.dob',
                    ethnicity: '$user_data.ethnicity',
                    gender: '$user_data.gender',
                    height: '$user_data.height',
                    weight: '$user_data.weight'
                }
            }
        ]).then((userData: any) => {
            if (userData[0]) {
                return userData[0];
            }
        });
    }
}