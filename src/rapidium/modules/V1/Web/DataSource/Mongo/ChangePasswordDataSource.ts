import { ChangePassword } from '@basePath/Web/Commands/ChangePassword';
import { ResourceNotFound, ResourceRecordNotFound }
  from '@basePath/Exceptions/ResourceNotFound';
import * as bcrypt from 'bcrypt';
import { UserSchema } from '@basePath/Admin/DataSource/Models/Schema/UserSchema';
/**
 * class ChangePasswordDataSource
 */
export default class ChangePasswordDataSource {
  /**
   * @param {data} data
   * @return {Object}
   */
  async changePassword(data: ChangePassword) {
    try {
      if (data.userData.user_id) {
        const userId = data.userData.user_id;
        if (data.oldPassword !== data.password) {
          if (data.password === data.confirmPassword) {
            return UserSchema.findById(userId)
              .then(async (doc: any) => {
                if (doc) {
                  // const salt = bcrypt.genSaltSync(10);
                  const match = await bcrypt.compareSync(
                    data.oldPassword,
                    doc['password'],
                  );
                  if (match) {
                    const salt = bcrypt.genSaltSync(10);
                    data.password = bcrypt.hashSync(data.password, salt);
                    //
                    await UserSchema.findByIdAndUpdate(userId, data, {
                      new: true,
                    })

                    return { message: 'Your password has been updated' };
                  } else {
                    throw new ResourceRecordNotFound(
                      'Old password is not correct',
                      '',
                    );
                  }
                } else {
                  throw new ResourceRecordNotFound(
                    'Something went wrong, Plaese try again later',
                    '',
                  );
                }
              })
              .catch((error: any) => {
                throw new ResourceRecordNotFound(
                  'Old password is not correct',
                  '',
                );
              });
          } else {
            throw new ResourceRecordNotFound(
              'New password and confirm password do not match',
              '',
            );
          }
        } else {
          throw new ResourceRecordNotFound(
            'New password cannot be same as the current password.' +
            '' +
            ' Please try a different password',
            '',
          );
        }
      } else {
        return 'Token Not Found';
      }
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }
}
