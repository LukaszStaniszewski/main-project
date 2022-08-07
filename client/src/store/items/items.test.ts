import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { throwError } from "redux-saga-test-plan/providers";

import { API_URL, getRequest, postRequest } from "../../api/axios-instance.api";
import { createItemsSuccess, deleteItemsSuccess, getLatestItemsSuccess } from "./item.actions";
import { CreateItemsStart, ITEM_TYPES, DelteItemsStart, GetLatestItemsStart } from "./item.types";
import { createItems, deleteItems, getLatestItems } from "./item.saga";
import { dataToCreateItem, itemCreated, latestItems } from "../../test-utils/fake-data";

const createItemsStart: CreateItemsStart = {
   type: ITEM_TYPES.CREATE_ITEMS_START,
   payload: [dataToCreateItem],
};

const deleteItemsStart: DelteItemsStart = {
   type: ITEM_TYPES.DELETE_ITEMS_START,
   payload: [{ _id: "1234" }, { _id: "321" }],
};

const getLatestItemsStart: GetLatestItemsStart = {
   type: ITEM_TYPES.GET_LATEST_ITEMS_START,
   payload: 4,
};

describe("create item", () => {
   test("item created successfuly", () => {
      return expectSaga(createItems, createItemsStart)
         .provide([
            [
               matchers.call(postRequest, API_URL.CREATE_ITEM, createItemsStart.payload),
               itemCreated,
            ],
         ])
         .put(createItemsSuccess(itemCreated.data))
         .run();
   });

   test("show error toast after server error", () => {
      return expectSaga(createItems, createItemsStart)
         .provide([
            [
               matchers.call(postRequest, API_URL.CREATE_ITEM, createItemsStart.payload),
               throwError(new Error("it did not work")),
            ],
         ])
         .run();
   });
});

describe("update items", () => {
   test("items has been deleted successfuly", () => {
      return expectSaga(deleteItems, deleteItemsStart)
         .provide([
            [matchers.call(postRequest, API_URL.DELETE_ITEM, deleteItemsStart.payload), null],
         ])
         .put(deleteItemsSuccess())
         .run();
   });

   test.todo("show error toast after server error");
   test.todo("update items");
});

describe("get items from server", () => {
   test("latest items recived successfuly", () => {
      expectSaga(getLatestItems, getLatestItemsStart)
         .provide([
            [
               matchers.call(
                  getRequest,
                  `${API_URL.GET_LATEST_ITEMS}/${getLatestItemsStart.payload}}`
               ),
               latestItems,
            ],
         ])
         .put(getLatestItemsSuccess(latestItems.data))
         .run();
   });
});
