import * as bunyan from "bunyan";
import * as yaml from "js-yaml";
import { BucketItem, Client } from "minio";
import * as path from "path";
import { IMinioSettings } from "../../common/models/IMinioSettings";
import { PostgresStore } from "../data/postgresStore";
import { IBuildType } from "./../../common/models/IBuildType";
import { MinioArrayWriteStream } from "./minioArrayWriteStream";
import { MinioArrayWriteStreamForFilename } from "./minioArrayWriteStreamForFilename";

export const BuilderFilenameConstant = ".builder.yml";
export const MinioEventArn = "arn:minio:sqs::1:webhook";
const ObjectDeletedEventName = "s3:ObjectRemoved:Delete";
const ObjectCreatedEventName = "s3:ObjectCreated:Put";

export class MinioManager {

    public MinioClient: Client;
    public Settings: IMinioSettings;
    public PostgresStore: PostgresStore;
    public Logger: bunyan;
    public BuilderDefinitionsBucketName: string;

    constructor(settings: IMinioSettings,
                postgresStore: PostgresStore,
                logger: bunyan,
                builderDefintionsBucket: string) {
        this.Settings = settings;
        this.PostgresStore = postgresStore;
        this.Logger = logger;
        this.BuilderDefinitionsBucketName = builderDefintionsBucket;
        this.MinioClient = new Client({
                endPoint: settings.Address,
                port: +settings.Port,
                secure: (settings.Secure === "true"),
                accessKey: settings.AccessKey,
                secretKey: settings.SecretKey
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

    public SetUpEventRegistration = async () => {
        this.Logger.info("Adding event registration.");
        const notificationFunction = this.MinioClient.listenBucketNotification(this.BuilderDefinitionsBucketName,
            "",
            "",
            ["s3:ObjectCreated:*", "s3:ObjectRemoved:*"]);
        notificationFunction.on("notification", async (record) => {
            const key = decodeURIComponent(record.s3.object.key);
            const eventName = record.eventName;
            if (path.basename(key) === BuilderFilenameConstant) {
                this.Logger.debug(`Updating ${key} due to event ${eventName}`);
                if (eventName === ObjectDeletedEventName) {
                    await this.RemoveBuilderFile(key);
                } else if (eventName === ObjectCreatedEventName) {
                    await this.InsertOrUpdateBuilderFile(key);
                }
            }
        });
    }

    public RemoveBuilderFile = async (minioKey: string) => {
        this.PostgresStore.DeleteBuildType(this.MinioKeyToFilePath(minioKey));
    }

    public InsertOrUpdateBuilderFile = async (minioKey: string) => {
        //const filePath = this.MinioKeyToFilePath(minioKey);
        this.PostgresStore.InsertOrUpdateBuildType(await
            this.LoadBuilderDefinitionFromMinio(this.BuilderDefinitionsBucketName, minioKey));
    }

    public ReloadBuilderYamlFiles = async () => {
        const buildTypes = await this.GetMinioBuildTypes(this.Settings.ContentBucket);
        await this.PostgresStore.SaveBuildTypes(buildTypes);
        this.Logger.info("Loaded contents of minio bucket. Total items loaded: "
            + buildTypes.length.toString());
    }

    public MinioListObjects = (bucketName: string, prefix: string): Promise<BucketItem[]> => {
        return new Promise<BucketItem[]>((resolve) => {
            const arrayStream = new MinioArrayWriteStream();
            this.MinioClient.listObjectsV2(bucketName, prefix, false)
                .pipe(arrayStream, { end: true }).on("finish", () => {
                resolve(arrayStream.ReturnArray);
            });
        });
    }

    private GetMinioBuildTypes = async (bucketName: string): Promise<IBuildType[]> => {
        const returnBuildTypeArray: IBuildType[] = [];
        const yamlFiles = await this.MinioScan(bucketName, BuilderFilenameConstant);
        for (const yamlFile of yamlFiles) {
            returnBuildTypeArray.push(await this.LoadBuilderDefinitionFromMinio(bucketName, yamlFile.name));
        }
        return returnBuildTypeArray;
    }

    private MinioScan = (bucketName: string, filename: string): Promise<BucketItem[]> => {
        return new Promise<BucketItem[]>((resolve) => {
            const arrayStream = new MinioArrayWriteStreamForFilename(filename);
            this.MinioClient.listObjects(bucketName, "", true).pipe(arrayStream, { end: true }).on("finish", () => {
                resolve(arrayStream.ReturnArray);
            });
        });
    }

    private LoadBuilderDefinitionFromMinio = async (bucketName: string, filePath: string): Promise<IBuildType> => {
        const fileContents =  await this.GetMinioFile(bucketName, filePath);
        const yamlFileParsed: any = yaml.load(fileContents);
        yamlFileParsed.Id = filePath;
        return yamlFileParsed;
    }

    private MinioKeyToFilePath = (key: string): string => {
        return key.substr(key.indexOf("/") + 1);
    }
}
