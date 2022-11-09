import { takeLatest, put, all, call, select, debounce } from "typed-redux-saga/macro";
import {
  COLLECTION_ACTION_TYPES,
  ICollection,
  ICollectionWithoutItems,
  ICreateCollection,
  ILargestCollection,
} from "./collection.types";

import * as action from "./collection.slice";
import * as type from "./collection.types";
import { setItems } from "../items";
import {
  postRequest,
  API_URL,
  optionsUploadImage,
  uploadFile,
  getRequest,
  deleteRequest,
} from "../../api/axios-instance.api";
import { show404Page } from "../local/local.slice";
import { showToast, selectToast, closeToast } from "../user";

export type ImageResponse = {
  image: {
    url: string;
    fileId: string;
  };
};

export function* createCollectionWithItems({
  payload: { collectionWithItems, image },
}: type.CreateCollectionWithItemsStart) {
  try {
    yield* put(action.startLoading());
    let payload = collectionWithItems;
    if (image) {
      const response = yield* call(uploadImage, image);
      // if(!response?.data) throw new Error()
      payload = appendImage(response.data, payload);
    }
    const response = yield* call(
      postRequest<ICollection>,
      API_URL.CREATE_COLLECTION_WITH_ITEMS,
      payload
    );
    yield* all([
      // put(createCollectionWithItemsSuccess()),
      put(showToast({ type: "success", message: "Collection has been saved" })),
    ]);
  } catch (error) {
    yield* all([
      put(showToast({ type: "error", message: "Collection couldn't be created" })),
      // put(createCollectionWithItemsFailure(error as AxiosError))
    ]);
  }
}

export function* uploadImage(image: File) {
  return yield* call(
    uploadFile<ImageResponse>,
    API_URL.UPLOAD_IMAGE,
    { image: image },
    optionsUploadImage
  );
}

export function appendImage(data: ImageResponse, itemsCollection: ICreateCollection) {
  const url = data.image.url;
  const imageId = data.image.fileId;
  return { ...itemsCollection, image: { url: url, imageId: imageId } };
}

export function* deleteCollection({ payload: collectionId }: type.DeleteCollectionStart) {
  try {
    yield* put(action.startLoading());
    const response = yield* call(
      deleteRequest,
      `${API_URL.DELETE_COLLECTION}/${collectionId}`
    );
    yield* put(action.deleteCollectionSuccess(response.data));
  } catch (error) {
    // yield* put(deleteColletionFailure(error as AxiosError))
  }
}

function* getCollectionWithItemsStart({
  payload: collectionId,
}: type.GetCollectionWithItemsStart) {
  try {
    yield* put(action.startLoading());
    const response = yield* call(
      getRequest<ICollection>,
      `${API_URL.GET_COLLECTION_WITH_ITEMS}/${collectionId}`
    );
    const collectionWithItems = response.data;
    const { items, ...collection } = collectionWithItems;
    yield* all([put(show404Page(false)), put(action.setCollection(collection))]);
    if (items) yield* put(setItems(items));
  } catch (error) {
    yield* put(show404Page(true));
    // yield* put(getCollectionWithItemsFailure(error as AxiosError))
  }
}

function* getCollectionsWithoutItems({
  payload: userName,
}: type.GetCollectionsWithoutItemsStart) {
  yield* put(action.startLoading());
  const toast = yield* select(selectToast);
  try {
    const repsonse = yield* call(
      getRequest<ICollectionWithoutItems[]>,
      `${API_URL.GET_COLLECTIONS_BY_USER}/${userName}`
    );
    if (toast?.type !== "success") {
      yield* put(closeToast());
    }
    yield* all([
      put(show404Page(false)),
      put(action.setCollectionsWihoutItems(repsonse.data)),
    ]);
  } catch (error) {
    yield* put(action.setCollectionsWihoutItems([]));
    //@ts-ignore
    if (error.message?.match(/409/g)) {
      yield* put(show404Page(true));
    } else if (toast) {
      put(show404Page(false));
    } else {
      yield* all([
        put(show404Page(false)),
        put(showToast({ message: "This user has no collections", type: "warning" })),
      ]);
    }
  }
}

function* getLargestCollections({ payload: amount }: type.GetLargestCollectionsStart) {
  try {
    yield* put(action.startLoading());
    const repsonse = yield* call(
      getRequest<ILargestCollection[]>,
      `${API_URL.GET_LARGEST_COLLECTIONS}/${amount}`
    );
    yield* put(action.setLargestCollections(repsonse.data));
  } catch (error) {
    // yield* put(getLargestCollectionsFailure(error as  AxiosError))
  }
}

function* autocomplete({ payload: query }: type.AutocompleteStart) {
  try {
    yield* put(action.startLoading());
    const response = yield* call(postRequest, API_URL.AUTOCOMPLETE, query);
    yield* put(action.autocompleteSuccess(response.data));
  } catch (error) {
    // yield* put(autocompeleteFailure(error as AxiosError))
  }
}

function* onAutocompleteStart() {
  yield* debounce(1000, COLLECTION_ACTION_TYPES.AUTOCOMPLETE_START, autocomplete);
}

function* onGetLargestCollectionsStart() {
  yield* takeLatest(
    COLLECTION_ACTION_TYPES.GET_LARGEST_COLLECTIONS_START,
    getLargestCollections
  );
}

function* onGetCollectionsWihoutItemStart() {
  yield* takeLatest(
    COLLECTION_ACTION_TYPES.GET_COLLECTIONS_WIHOUT_ITEMS_START,
    getCollectionsWithoutItems
  );
}

function* onGetCollectionWithItemsStart() {
  yield* takeLatest(
    COLLECTION_ACTION_TYPES.GET_COLLECTION_WITH_ITEMS_START,
    getCollectionWithItemsStart
  );
}

function* onCreateCollectionWithItemsStart() {
  yield* takeLatest(
    COLLECTION_ACTION_TYPES.CREATE_COLLECTION_WITH_ITEMS_START,
    createCollectionWithItems
  );
}

function* onDeleteCollectionStart() {
  yield* takeLatest(COLLECTION_ACTION_TYPES.DELETE_COLLECTION_START, deleteCollection);
}

export default function* collectionSagas() {
  yield* all([
    ,
    call(onDeleteCollectionStart),
    call(onCreateCollectionWithItemsStart),
    call(onGetCollectionWithItemsStart),
    call(onGetCollectionsWihoutItemStart),
    call(onGetLargestCollectionsStart),
    call(onAutocompleteStart),
  ]);
}
