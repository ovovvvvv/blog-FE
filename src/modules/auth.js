import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
     createRequestActionTypes 
} from '../lib/craeteRequestSaga';
import * as authAPI from '../lib/api/auth';

// 액션 타입 정의
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
    'auth/REGISTER',
);

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
    'auth/LOGIN',
);

// 액션 생성 함수 정의
export const changeField = createAction(
    CHANGE_FIELD,
    ({ form, key, value}) => ({
        form,
        key,
        value,
    })
    );

export const initializeForm = createAction(INITIALIZE_FORM, form => form);
// register / login    

export const register = createAction(REGISTER, ({ username, password }) => ({
    username, 
    password,
}));
export const login = createAction(LOGIN, ({ username, password }) => ({
    username,
    password,
}));

// 사가 생성
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
export function* authSaga() {
    yield takeLatest(REGISTER, registerSaga);
    yield takeLatest(LOGIN, loginSaga);
}

// 초기 상태 정의
const initialState = {
    register : {
        username: '',
        password: '',
        passwordConfirm: '',
    },
    login : {
        username: '',
        password: '',
    },
    auth: null,
    authError: null,
};

// 리듀서 정의
const auth = handleActions(
    {
        [CHANGE_FIELD]: (state, { payload : {form, key, value}}) =>
        produce(state, draft => {
            draft[form][key] = value; // 예: state.register.username을 바꾼다
        }),
        [INITIALIZE_FORM] : (state, { payload : form }) => ({
            ...state,
            [form] : initialState[form],
            authError: null, // 폼 전환 시 회원 인증 에러 초기화
        }),
        // 회원가입 성공
        [REGISTER_SUCCESS] : (state, {payload: auth}) =>({
            ...state,
            authError: null,
            auth,
        }),
        // 회원가입 실패
        [REGISTER_FAILURE] : (state, { payload : auth }) =>({
            ...state,
            authError: null,
            auth,
        }),
        // 로그인 실패
        [LOGIN_FAILURE]: (state, {payload : error}) => ({
            ...state,
            authError: error,
        })
    },
    initialState,
);

export default auth;