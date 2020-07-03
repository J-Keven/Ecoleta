import multer from "multer";
import { resolve } from "path";
import crypto from "crypto";

export default {
  dest: resolve(__dirname, "..", "..", "temp", "uploads"),
  storege: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, "..", "..", "temp", "uploads"));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, "");

        const filename = hash.toString("hex") + file.originalname;
        cb(null, filename);
      });
    },
  }),
  //   fileFilter: (
  //     req: Request,
  //     file: Express.Multer.File,
  //     cb: (Error: Error | null,) => void
  //   ) => {
  //     const allowedMimies = [
  //       "image/jpeg",
  //       "image/png",
  //       "image/pjpeg",
  //       "image/gif",
  // 	 ];

  // 	 if(allowedMimies.includes(file.mimetype)){
  // 		 cb(null, true)
  // 	 }
  //   },
};
