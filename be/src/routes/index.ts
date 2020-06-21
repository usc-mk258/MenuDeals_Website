import * as fileUpload from 'express-fileupload';
import * as path from 'path';
import { Router } from "express";
import restaurant from "./restaurant";
import admin from "./admin";
import { authorize } from "../middlewares/authorize";


const routes = Router();


routes.use("/restaurant", restaurant);
routes.use("/admin", admin);

routes.post('/file-upload', function(req, res, next) {
  const fileData = Object.values(req.files)[0] as fileUpload.UploadedFile;
  fileData.mv(path.join(__dirname, `../save-files/${fileData.name}`), function(err) {
    if (err) return res.status(500).send(err);
    req.body = {
      message: 'File uploaded!',
      url: 'https://techventcs.com/images/' + fileData.name
    };
    next();
  });
  
});

export default routes;