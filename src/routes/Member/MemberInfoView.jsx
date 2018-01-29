import React, {Component} from "react";
import {connect} from "dva";
import {Card, Badge, Table, Divider} from "antd";
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import DescriptionList from "../../components/DescriptionList";
import {getRequest} from "../../utils/UrlUtil";

const {Description} = DescriptionList;


@connect(({member, loading}) => ({
  member,
  loading: loading.effects['member/loadMember'],
}))
export default class MemberInfoView extends Component {

  componentDidMount() {
    const param = getRequest(this.props.location.search);
    this.props.dispatch({
      type: 'member/loadMember',
      payload: param.id
    });
  }

  render() {
    const {member: {formData}} = this.props;
    return (
      <PageHeaderLayout title="用户详情">
        <Card bordered={false}>
          <DescriptionList size="large" title="基本信息" style={{marginBottom: 32}}>
            <Description term="用户姓名">{formData.result.userName}</Description>
            <Description term="年龄">{formData.result.age}</Description>
            <Description term="手机号">{formData.result.phone}</Description>
            <Description term="邮件">{formData.result.email}</Description>
          </DescriptionList>
        </Card>
      </PageHeaderLayout>
    );
  }
}
