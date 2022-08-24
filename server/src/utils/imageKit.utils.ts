import ImageKit from "imagekit";

import { imageKitPublicKey, imageKitPrivateKey, imageKitUrl } from "../config/keys";
import getErrorMessage from "./getErrorMessage";
import { ICreateItemCollection } from "../models/collection.model";

const imageKit = new ImageKit({
   publicKey: imageKitPublicKey,
   privateKey: imageKitPrivateKey,
   urlEndpoint: imageKitUrl,
});

export const uploadImage = async (file: Buffer, name: ICreateItemCollection["name"]) => {
   try {
      const image = await imageKit.upload({
         file: file,
         useUniqueFileName: true,
         fileName: `${name}`,
      });
      if (!image) throw new Error("Couldn't find image with given name");
      return image;
   } catch (error) {
      throw new Error(getErrorMessage(error));
   }
};
export const findFile = async (collectionId: string) => {
   const imageName = collectionId.toString();
   try {
      const imageList = await imageKit.listFiles({
         name: imageName,
      });
      return imageList[0].url;
   } catch (error) {
      throw new Error(getErrorMessage(error));
   }
};
