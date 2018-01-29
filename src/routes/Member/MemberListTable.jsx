import React, {PureComponent, Fragment} from "react";
import moment from "moment";
import {routerRedux} from "dva/router";
import {Table, Alert, Badge, Divider,Popconfirm} from "antd";
import styles from "./MemberListTable.less";

class MemberTable extends PureComponent {
  state = {
    selectedRowKeys: [],
    totalCallNo: 0,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedRows.length === 0) {
      this.setState({
        selectedRowKeys: [],
        totalCallNo: 0,
      });
    }
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    const totalCallNo = selectedRows.reduce((sum, val) => {
      return sum + parseFloat(val.callNo, 10);
    }, 0);
    if (this.props.onSelectRow) {
      this.props.onSelectRow(selectedRows);
    }
    this.setState({selectedRowKeys, totalCallNo});
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
  }

  render() {
    const {selectedRowKeys} = this.state;

    const {super1, data: {result, pagination}, loading} = this.props;
    const {dispatch, match} = super1.props;

    const columns = [
      {
        title: '用户姓名',
        dataIndex: 'userName',
        render: (text, record) => {
          return (
            <div>
              <a onClick={function () {
                dispatch(routerRedux.push(`/member/member-manager/info?id=`+record["memberId"]));
              }}>{text}</a>
            </div>
          );
        }
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render: (text, record) => {
          return record['sex'] ? '男' : '女'
        }
      },
      {
        title: '年龄',
        dataIndex: 'age'
        // align: 'right'
      },
      {
        title: '手机号',
        dataIndex: 'phone'
        // align: 'right'
      },
      {
        title: '邮件',
        dataIndex: 'email'
        // align: 'right'
      },
      {
        title: '创建时间',
        dataIndex: 'createDateTime',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        render: (text, record) => {
          return (
            <Fragment>
              <a onClick={function () {
                dispatch(routerRedux.push(`/member/member-manager/edit?id=`+record["memberId"]));
              }}>编辑</a>
              <Divider type="vertical"/>

              <Popconfirm title="确定删除?" onConfirm={function () {
                dispatch({
                  type: 'member/remove',
                  payload: record["memberId"],
                });
                dispatch({
                  type: 'member/fetch',
                });
              }}>
                <a href="#">删除</a>
              </Popconfirm>
            </Fragment>
          );
        }
      },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      total: result.recordsTotal
      //...pagination,
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    };

    return (
      <div className={styles.standardTable}>
        <Table
          loading={loading}
          rowKey={record => record.key}
          rowSelection={rowSelection}
          dataSource={result.data}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default MemberTable;
