import multer from "multer";
 
const multerMiddleware = () => {
  const diskStorage = multer.diskStorage({});
  return multer({ storage: diskStorage });
};

export default multerMiddleware;