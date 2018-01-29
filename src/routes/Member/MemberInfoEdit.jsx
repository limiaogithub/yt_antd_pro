import React, {PureComponent} from "react";
import {connect} from "dva";
import {Spin, Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip} from "antd";
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import {getRequest} from "../../utils/UrlUtil";
const FormItem = Form.Item;

@connect(({member, loading}) => ({
  member
}))

@Form.create()
export default class MemberForms extends PureComponent {

  state = {
    id: null
  };

  componentDidMount() {
    const param = getRequest(this.props.location.search);
    if (param.id) {
      this.setState({
        id: param.id
      });
      this.props.dispatch({
        type: 'member/loadMember',
        payload: param.id
      });
    } else {
      this.resetForm();
    }
  }

  resetForm = (e) => {
    this.setState({
      id: null
    });
    this.props.form.setFieldsValue({userName: ""});
    this.props.form.setFieldsValue({age: ""});
    this.props.form.setFieldsValue({phone: ""});
    this.props.form.setFieldsValue({email: ""});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values["memberId"] = this.state.id;
        this.props.dispatch({
          type: this.state.id ? 'member/updateMember' : 'member/saveMember',
          payload: values,
        });
        this.resetForm();
        this.props.dispatch({
          type: 'member/fetch',
        });
        window.history.go(-1);
      }
    });
  }

  render() {
    const {submitting} = this.props;
    const {getFieldDecorator, getFieldValue} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 7},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
        md: {span: 10},
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 10, offset: 7},
      },
    };
    const titleConfig = {
      title: this.state.id ? "修改用户" : "新建用户"
    };
    const {member: {formData}} = this.props;

    return (
      <PageHeaderLayout {...titleConfig} >

        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{marginTop: 8}}
          >
            <FormItem
              {...formItemLayout}
              label="用户姓名"
            >
              {getFieldDecorator('userName', {
                rules: [{
                  required: true, message: '请输入用户姓名',
                }], initialValue: formData.result.userName
              })(
                <Input placeholder="用户姓名"/>
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="年龄"
            >
              {getFieldDecorator('age', {
                rules: [{
                  required: true, message: '请输入年龄',
                }], initialValue: formData.result.age
              })(
                <Input placeholder="年龄"/>
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="手机号"
            >
              {getFieldDecorator('phone', {
                rules: [{
                  required: true, message: '请输入手机号',
                }], initialValue: formData.result.phone
              })(
                <Input placeholder="手机号"/>
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="邮件"
            >
              {getFieldDecorator('email', {
                rules: [{
                  required: true, message: '请输入邮件',
                }], initialValue: formData.result.email
              })(
                <Input placeholder="邮件"/>
              )}
            </FormItem>


            <FormItem {...submitFormLayout} style={{marginTop: 32}}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                保存
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
