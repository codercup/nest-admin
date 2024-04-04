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
import { storage } from './file-upload-storage';

const K = 1024;
const M = 1024 * 1024;

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'uploads',
      storage
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
    
// file: {
//   fieldname: 'file',
//   originalname: 'pretty-girl.png',
//   encoding: '7bit',
//   mimetype: 'image/png',
//   destination: '/Users/burtlai/nestjs10-workspace/nest10-starter/uploads',
//   filename: '1712218289638-261082738-pretty-girl.png',
//   path: '/Users/burtlai/nestjs10-workspace/nest10-starter/uploads/1712218289638-261082738-pretty-girl.png',
//   size: 2188151
    // }
    // return file.path;
    
    // 这里如何获取到完整文件路径？ 类似 http://localhost:3000/uploads/file-1712218189297-853241156-pretty-girl.png 的
    // 其中路径中的 uploads 需要与 main.ts 的 useStaticAssets 的 prefix 配套
    // TODO: refine the return value
    return `http://localhost:3000/uploads/${file.filename}`
  }
}
