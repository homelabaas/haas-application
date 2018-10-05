import * as yaml from "js-yaml";
import { BucketItem, Client } from "minio";
import { IBuildType } from "./../../common/models/IBuildType";
import { IMinioConfig } from "./../dependencyManager";
import { MinioArrayWriteStream } from "./minioArrayWriteStream";

export class MinioManager {

    public MinioClient: Client;

    constructor(config: IMinioConfig) {
        this.MinioClient = new Client({
                endPoint: config.URL,
                port: config.Port,
                secure: config.Secure,
                accessKey: config.AccessKey,
                secretKey: config.SecretKey
            });
    }

    public GetMinioBuildTypes = async (bucketName: string): Promise<IBuildType[]> => {
        const returnArray: IBuildType[] = [];
        const yamlFiles = await this.MinioScan(bucketName, ".builder.yml");
        for (const yamlFile of yamlFiles) {
            const fileContents =  await this.GetMinioFile(bucketName, yamlFile.name);
            const yamlFileParsed: any = yaml.load(fileContents);
            yamlFileParsed.Id = yamlFile.name;
            returnArray.push(yamlFileParsed);
        }
        return returnArray;
    }

    public MinioScan = (bucketName: string, filename: string): Promise<BucketItem[]> => {
        return new Promise<BucketItem[]>((resolve) => {
            const arrayStream = new MinioArrayWriteStream(filename);
            this.MinioClient.listObjects(bucketName, "", true).pipe(arrayStream, { end: true }).on("finish", () => {
                resolve(arrayStream.ReturnArray);
            });
        });
    }

    public GetMinioFile = (bucket: string, objectName: string): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            let data = "";
            this.MinioClient.getObject(bucket, objectName, (err, dataStream) => {
                if (err) {
                  reject(err);
                }
                dataStream.on("data", (chunk) => {
                  data += chunk;
                });
                dataStream.on("end", () => {
                  resolve(data);
                });
                dataStream.on("error", (error) => {
                  reject(error);
                });
              });
        });
    }
}
