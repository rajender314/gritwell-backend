import * as express from 'express';
import AdminController from '@basePath/Admin/Http/Controller/AdminController';
// import MiddlewareController
// from '@basePath/Middleware/Http/Controller/MiddlewareController';
import {MiddlewareFactory}
  from '@src/rapidium-core/src/Helpers/MiddlewareFactory';
import multer from 'multer';

const adminController = new AdminController();
// const middlewareController = new MiddlewareController();
const middlewareFactory = new MiddlewareFactory();
const AdminRouter = express.Router();

const usersLogosStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/profiles/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  },
});


const logoUpload = multer({storage: usersLogosStorage})
    .single('profile_pic');

AdminRouter.route('/uploadProfilePic').post(
    middlewareFactory.verifyRole, logoUpload,
    adminController.uploadProfilePic,
);

AdminRouter.route('/permission').get(
    middlewareFactory.verifyRole,
    adminController.getPermission,
);

AdminRouter.route('/specialists').get(
    middlewareFactory.verifyRole,
    adminController.getSpecialists,
);

AdminRouter.route('/experiences').get(
    middlewareFactory.verifyRole,
    adminController.getExperiences,
);

export {AdminRouter};
