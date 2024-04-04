import {
  Post,
  Get,
  Controller,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

const K = 1024;
const M = 1024 * 1024;

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'uploads',
    }),
  )
  uploadFile(@UploadedFile(
    new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 50 * M }), // 50MB
      // new FileTypeValidator({ fileType: 'image/*' }),
    ],
  }),
  ) file: Express.Multer.File) {
    console.log('file:', file);
// file: {
//   fieldname: 'file',
//   originalname: 'pretty-girl.png',
//   encoding: '7bit',
//   mimetype: 'image/png',
//   destination: 'uploads',
//   filename: '2c7bbcaf26be8b48c644dd4de11948b0',
//   path: 'uploads/2c7bbcaf26be8b48c644dd4de11948b0',
//   size: 2188151
// }
    return file.path;
  }
}
