import multer from 'multer';
import { v4 } from 'uuid';

export default {
    // storage: multer.diskStorage({
    //     filename(_request, file, callback) {
    //         const uuid = v4();
    //
    //         const originalNameParts = file.originalname.split('.');
    //         const fileNameExtension = originalNameParts[originalNameParts.length - 1];
    //
    //         const fileName = `${uuid}.${fileNameExtension}`;
    //
    //         callback(null, fileName);
    //     }
    // })
    storage: multer.memoryStorage()
}