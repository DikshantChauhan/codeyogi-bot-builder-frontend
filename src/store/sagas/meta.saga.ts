import { call, put, takeLatest } from 'redux-saga/effects'
import { metaActions } from '../slices/meta.slice'
import { createMetaAPI, deleteMetaAPI, fetchMetaAPI, updateMetaAPI } from '../../api/api'
import { Meta } from '../../models/Meta.model'
import { toast } from 'react-toastify'

export function* fetchMetaSaga(): Generator {
  try {
    yield put(metaActions.setMetaLoading(true))
    yield put(metaActions.setMetaError(null))

    const response = (yield call(fetchMetaAPI)) as Meta[]
    yield put(metaActions.setMetaList(response))
  } catch (error) {
    yield put(metaActions.setMetaError(String(error)))
  } finally {
    yield put(metaActions.setMetaLoading(false))
  }
}

function* createMetaSaga({ payload }: ReturnType<typeof metaActions.createMetaTry>): Generator {
  try {
    yield put(metaActions.setMetaSaveLoading(true))
    yield put(metaActions.setMetaSaveError(null))

    const response = (yield call(createMetaAPI, payload)) as Meta
    yield put(metaActions.addMeta(response))
    toast.success('Meta created successfully')
  } catch (error) {
    yield put(metaActions.setMetaSaveError(String(error)))
    toast.error('Failed to create meta')
  } finally {
    yield put(metaActions.setMetaSaveLoading(false))
  }
}

function* updateMetaSaga({ payload }: ReturnType<typeof metaActions.updateMetaTry>): Generator {
  try {
    yield put(metaActions.setMetaSaveLoading(true))
    yield put(metaActions.setMetaSaveError(null))

    const response = (yield call(updateMetaAPI, payload)) as Meta
    yield put(metaActions.updateMeta(response))
    toast.success('Meta updated successfully')
  } catch (error) {
    yield put(metaActions.setMetaSaveError(String(error)))
    toast.error('Failed to update meta')
  } finally {
    yield put(metaActions.setMetaSaveLoading(false))
  }
}

function* deleteMetaSaga({ payload }: ReturnType<typeof metaActions.deleteMetaTry>): Generator {
  try {
    yield put(metaActions.setMetaDeleteLoading({ id: payload, loading: true }))

    yield call(deleteMetaAPI, payload)
    yield put(metaActions.removeMeta(payload))
    toast.success('Meta deleted successfully')
  } catch (error) {
    console.error(error)
    toast.error('Failed to delete meta')
  } finally {
    yield put(metaActions.setMetaDeleteLoading({ id: payload, loading: false }))
  }
}

export function* watchMetaSaga(): Generator {
  yield takeLatest(metaActions.fetchMetaTry.type, fetchMetaSaga)
  yield takeLatest(metaActions.createMetaTry.type, createMetaSaga)
  yield takeLatest(metaActions.updateMetaTry.type, updateMetaSaga)
  yield takeLatest(metaActions.deleteMetaTry.type, deleteMetaSaga)
}
