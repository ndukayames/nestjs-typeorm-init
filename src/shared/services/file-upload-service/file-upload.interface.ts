import { UploadedFileDto } from './dto/uploaded-file.dto';

export interface FileUploadProvider {
  upload(file: Express.Multer.File): Promise<UploadedFileDto>;
}
