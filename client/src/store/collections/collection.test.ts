import { COLLECTION_ACTION_TYPES } from "./collection.types";
import {
   deleteCollectionSuccess,

} from "./collection.slice";
import * as type from "./collection.types";
import * as matchers from "redux-saga-test-plan/matchers";
import { expectSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";
import {
   postRequest,
   API_URL,
   uploadFile,
   deleteRequest,
} from "../../api/axios-instance.api";
import {
   createCollectionWithItems,
   uploadImage,
   appendImage,
   ImageResponse,
   deleteCollection,
} from "./collection.saga";
import {
   collectionWithItems,
   collectionWithItemsAndImage,
   successMessage,
} from "../../test-utils/fake-data";

const image = new File(["hello"], "hello.png", { type: "image/png" });

const createCollectionWithItemsWihoutImageAction: type.CreateCollectionWithItemsStart = {
   type: COLLECTION_ACTION_TYPES.CREATE_COLLECTION_WITH_ITEMS_START,
   payload: { collectionWithItems },
};
const createCollectionWithItemsAction: type.CreateCollectionWithItemsStart = {
   type: COLLECTION_ACTION_TYPES.CREATE_COLLECTION_WITH_ITEMS_START,
   payload: { collectionWithItems, image: image },
};

const imageResponse: ImageResponse = {
   image: { url: "https://testlink.com", fileId: "test234" },
};

const deleteCollectionAction: type.DeleteCollectionStart = {
   type: COLLECTION_ACTION_TYPES.DELETE_COLLECTION_START,
   payload: "testid21234",
};

describe("create collection", () => {
   test("successful creation of collection with items, when collection doesn't have image", () => {
      return expectSaga(
         createCollectionWithItems,
         createCollectionWithItemsWihoutImageAction
      )
         .provide([
            [
               matchers.call(
                  postRequest,
                  API_URL.CREATE_COLLECTION_WITH_ITEMS,
                  collectionWithItems
               ),
               null,
            ],
         ])
         .run();
   });
   test("successful creation of collection with items, when collection has image", () => {
      return expectSaga(createCollectionWithItems, createCollectionWithItemsAction)
         .provide([
            [
               matchers.call(
                  postRequest,
                  API_URL.CREATE_COLLECTION_WITH_ITEMS,
                  collectionWithItems
               ),
               null,
            ],
            [
               matchers.call(uploadFile, API_URL.UPLOAD_IMAGE, image),
               { data: { url: "https://testlink.com", fileId: "test234" } },
            ],
         ])
         .call(uploadImage, image)
         .run();
   });
   test("append image method appends image to collection", () => {
      const result = appendImage(imageResponse, collectionWithItems);
      expect(result).toEqual(collectionWithItemsAndImage);
   });
});

describe("update collections", () => {
   test("delete collection success", () => {
      return (
         expectSaga(deleteCollection, deleteCollectionAction)
            .provide([[matchers.call.fn(deleteRequest), successMessage]])
            //@ts-ignore
            .put(deleteCollectionSuccess(successMessage.data))
            .run()
      );
   });
});
