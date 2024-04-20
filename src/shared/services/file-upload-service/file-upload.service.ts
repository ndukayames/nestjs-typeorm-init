import { Inject, Injectable } from '@nestjs/common';
import { FileUploadProvider } from './file-upload.interface';

@Injectable()
export class FileUploadService {
  constructor(
    @Inject('FileUploadProvider')
    private fileUploadProvider: FileUploadProvider,
  ) {}

  async uploadPicture(file: Express.Multer.File) {
    return await this.fileUploadProvider.upload(file);
  }
}
