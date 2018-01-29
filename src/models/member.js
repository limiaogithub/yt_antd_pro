import {removeMember,updateMemberForm,loadMember, queryRule, removeRule, addRule, submitMemberForm} from "../services/memberService";
import {queryBasicProfile, queryAdvancedProfile} from "../services/api";
import {message} from "antd";

export default {
  namespace: 'member',

  state: {
    formData: {
      result: {}
    },
    data: {
      result: {
        data: [],
        recordsTotal: 0,
      },
      pagination: {},
    }
  },

  effects: {
    *fetch({payload}, {call, put}) {
      const response = yield call(queryRule, payload);
      yield put({
        type: 'show',
        payload: response,
      });
    },
    *saveMember({payload}, {call}) {
      yield call(submitMemberForm, payload);
      message.success('提交成功');
    },
    *updateMember({payload}, {call}) {
      yield call(updateMemberForm, payload);
      message.success('提交成功');
    },
    *remove({payload, callback}, {call, put}) {
      yield call(removeMember, payload);
      message.success('删除成功');
    },
    *loadMember({payload}, {call, put}) {
      const response = yield call(loadMember, payload);
      console.log(response);
      yield put({
        type: 'loadMember1',
        payload: response
      });
    }
  },

  reducers: {
    show(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    loadMember1(state, action) {
      return {
        ...state,
        formData: action.payload,
      };
    }
  },
};
