import * as React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Tooltip, Tree, Modal, Badge } from 'antd';
const { TreeNode } = Tree;
import { FormOutlined } from '@ant-design/icons';
import ElemSchema from '$components/ElemSchema';
import {
  getElemDefaultName,
  getElemByActiveIndex,
  getElemSchemaByElemData,
  isSlotElem,
  isEntityElem,
  isEqual,
} from '$utils';
import '$assets/scss/widget-layout-tree.scss'; // 引进组件内容树形tree相关样式
import './index.scss';

/**
 * 左侧操作栏/UI组件楼层导航
 * 备注：可用于查看当前UI组件结构
 */

class UIWidgetSchema extends React.PureComponent {
  static propTypes = {
    currentWidgetLayout: PropTypes.any,
    currentActiveIndex: PropTypes.string,
    updateCurrentActiveIndex: PropTypes.func,
    widgetSchema: PropTypes.object,
    mockData: PropTypes.object,
    onChange: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      defaultSelectedKeys: [], // 楼层导航默认选中的项
      elemIndexRoute: '', // 记录当前元素在widgetLayout中的位置
      curElemData: {}, // 记录当前元素在widgetLayout中存放的数据对象
      curSchemaData: {}, // 记录当前元素Schema数据
      elemSchemaVisible: false, // 是否显示当前元素模型设置面板
    };

    // 记录当前组件内容数据
    if (props.currentWidgetLayout) {
      this.props.initWidgetLayout(props.currentWidgetLayout);
    }
    // 记录当前组件模型数据
    if (props.widgetSchema) {
      this.props.initWidgetSchema(props.widgetSchema);
    }
    // 记录当前组件配置数据
    if (props.mockData) {
      this.props.initCurMockData(props.mockData);
    }
    // 记录onChange事件
    if (props.onChange) {
      this.props.initOnChange(props.onChange);
    }
    // 这边绑定是必要的，这样 `this` 才能在回调函数中使用
    this.closeElemSchema = this.closeElemSchema.bind(this);
  }

  componentWillMount() {
    // 设置当前选中的子节点
    if (this.props.currentActiveIndex) {
      const newDefaultSelectedKeys = [];
      newDefaultSelectedKeys.push(this.props.currentActiveIndex);
      this.setState({
        defaultSelectedKeys: newDefaultSelectedKeys,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    // 当前选中路径值
    if (this.props.currentActiveIndex !== nextProps.currentActiveIndex) {
      // 设置当前选中的子节点
      const newDefaultSelectedKeys = [];
      if (nextProps.currentActiveIndex) {
        newDefaultSelectedKeys.push(nextProps.currentActiveIndex);
        this.setState({
          defaultSelectedKeys: newDefaultSelectedKeys,
        });
      } else {
        this.setState({
          defaultSelectedKeys: [],
        });
      }
    }

    // 记录当前组件内容数据
    if (
      !isEqual(nextProps.currentWidgetLayout, this.props.currentWidgetLayout)
    ) {
      this.props.initWidgetLayout(nextProps.widgetLayout);
    }
    // 记录当前组件模型数据
    if (!isEqual(nextProps.widgetSchema, this.props.widgetSchema)) {
      this.props.initWidgetSchema(nextProps.widgetSchema);
    }
    // 记录当前组件配置数据
    if (!isEqual(nextProps.mockData, this.props.mockData)) {
      this.props.initCurMockData(nextProps.mockData);
    }
    // 记录onChange事件
    if (!isEqual(nextProps.onChange, this.props.onChange)) {
      this.props.initOnChange(nextProps.onChange);
    }
  }

  /* 楼层导航选择事件 */
  onTreeSelect = (selectedKeys) => {
    this.props.updateCurrentActiveIndex(selectedKeys[0]);
  };

  // 隐藏当前元素模型设置面板
  closeElemSchema() {
    this.setState({
      elemSchemaVisible: false,
    });
  }

  // 开启元素级模型设置面板
  showElemSchemaEditor(currentIndex) {
    // 获取当前元素信息
    const curElem = getElemByActiveIndex(
      currentIndex,
      this.props.currentWidgetLayout,
    );
    if (curElem && curElem.data && curElem.data.schema) {
      // 当前Schema在widgetLayout中
      this.setState({
        elemIndexRoute: currentIndex,
        curElemData: curElem,
        curSchemaData: curElem.data.schema,
        elemSchemaVisible: true,
      });
    } else if (curElem && curElem.type) {
      // 获取当前元素Schema数据
      const curElemSchema = getElemSchemaByElemData(curElem);
      this.setState({
        elemIndexRoute: currentIndex,
        curElemData: curElem,
        curSchemaData: curElemSchema,
        elemSchemaVisible: true,
      });
    }
  }

  /**
   * 各级元素Title和编辑配置项icon
   */
  elemTitleSchema = (title, currentIndex) => {
    const hasConfigProp = this.props.checkHasConfigProp(currentIndex);
    let configPropCount = 0;
    if (hasConfigProp) {
      configPropCount = this.props.checkConfigPropCount(currentIndex);
    }

    return (
      <div className="layout-item-cont">
        <div className="layout-item-title" title={title}>
          {title}
        </div>
        <div className="layout-item-icon">
          <div className="icon-add-schema">
            {hasConfigProp && (
              <Tooltip title={`当前元素有${configPropCount}个可配置项`}>
                <Badge count={configPropCount} size={'small'} />{' '}
                {/*color='#2c63ff'*/}
              </Tooltip>
            )}
          </div>
          <div
            className="icon-add-schema"
            onClick={(event) => {
              event.preventDefault(); // 阻止默认的行为，比如链接的点击跳转
              event.stopPropagation(); // 阻止冒泡
              this.showElemSchemaEditor(currentIndex);
            }}
          >
            <Tooltip title="点击添加配置项">
              <FormOutlined />
            </Tooltip>
          </div>
        </div>
      </div>
    );
  };

  /**
   * 楼层导航/遍历widget-container布局容器
   */
  getTreeContainer = (widgetContainerList, parentIndex) => {
    return (
      widgetContainerList &&
      widgetContainerList.length > 0 &&
      widgetContainerList.map((widgetContainerItem, index) => {
        const currentIndex = parentIndex
          ? parentIndex + '-' + index
          : index + '';

        return (
          widgetContainerItem.type === 'container' && (
            <TreeNode
              className="tree-widget-container"
              key={currentIndex}
              title={this.elemTitleSchema(
                widgetContainerItem.elemName
                  ? widgetContainerItem.elemName
                  : getElemDefaultName(widgetContainerItem.type),
                currentIndex,
              )}
            >
              {this.getTreeRow(widgetContainerItem.child, currentIndex)}
            </TreeNode>
          )
        );
      })
    );
  };

  /**
   * 楼层导航/遍历widget-row 行级布局容器
   */
  getTreeRow = (widgetRowList, parentIndex) => {
    return (
      widgetRowList &&
      widgetRowList.length > 0 &&
      widgetRowList.map((widgetRowItem, index) => {
        const currentIndex = parentIndex
          ? parentIndex + '-' + index
          : index + '';
        return (
          widgetRowItem.type === 'row' && (
            <TreeNode
              className="tree-widget-row"
              key={currentIndex}
              title={this.elemTitleSchema(
                widgetRowItem.elemName
                  ? widgetRowItem.elemName
                  : getElemDefaultName(widgetRowItem.type),
                currentIndex,
              )}
            >
              {this.getTreeColumn(widgetRowItem.child, currentIndex)}
            </TreeNode>
          )
        );
      })
    );
  };

  /**
   * 楼层导航/遍历widget-column 列级布局容器
   */
  getTreeColumn = (widgetColumnList, parentIndex) => {
    return (
      widgetColumnList &&
      widgetColumnList.length > 0 &&
      widgetColumnList.map((widgetColumnItem, index) => {
        const currentIndex = parentIndex
          ? parentIndex + '-' + index
          : index + '';
        return (
          widgetColumnItem.type === 'column' && (
            <TreeNode
              className="tree-widget-column"
              key={currentIndex}
              title={this.elemTitleSchema(
                widgetColumnItem.elemName
                  ? widgetColumnItem.elemName
                  : getElemDefaultName(widgetColumnItem.type),
                currentIndex,
              )}
            >
              {this.getTreeWidgetBox(widgetColumnItem.child, currentIndex)}
            </TreeNode>
          )
        );
      })
    );
  };

  /**
   * 楼层导航/遍历widget-column中的组件/占位/widget-container
   */
  getTreeWidgetBox = (uiWidgetList, parentIndex) => {
    return (
      uiWidgetList &&
      uiWidgetList.length > 0 &&
      uiWidgetList.map((uiWidgetItem, index) => {
        const currentIndex = parentIndex
          ? parentIndex + '-' + index
          : index + '';
        if (isEntityElem(uiWidgetItem.type)) {
          return (
            <TreeNode
              className="tree-jdw-widget"
              title={this.elemTitleSchema(
                uiWidgetItem.elemName
                  ? uiWidgetItem.elemName
                  : uiWidgetItem.name || getElemDefaultName(uiWidgetItem.type),
                currentIndex,
              )}
              key={currentIndex}
            />
          );
        } else if (isSlotElem(uiWidgetItem.type)) {
          /**
           * 【备注】可视化组件编辑器有三种占位：
           * 占位（elem-slot），默认是ui组件占位；
           * jdw组件占位（widget-slot）；
           * jdw内嵌组件占位（embed-widget-slot）
           */
          return (
            <TreeNode
              className={`tree-${uiWidgetItem.type}`}
              title={this.elemTitleSchema(
                uiWidgetItem.elemName
                  ? uiWidgetItem.elemName
                  : getElemDefaultName(uiWidgetItem.type),
                currentIndex,
              )}
              key={currentIndex}
            />
          );
        } else if (uiWidgetItem.type === 'container') {
          {
            return (
              <TreeNode
                className="tree-widget-container"
                key={currentIndex}
                title={this.elemTitleSchema(
                  uiWidgetItem.elemName
                    ? uiWidgetItem.elemName
                    : getElemDefaultName(uiWidgetItem.type),
                  currentIndex,
                )}
              >
                {this.getTreeRow(uiWidgetItem.child, currentIndex)}
              </TreeNode>
            );
          }
        } else {
          return <TreeNode title={'未知元素'} key={currentIndex} />;
        }
      })
    );
  };

  render() {
    const { currentWidgetLayout } = this.props;
    const { elemIndexRoute, curElemData, curSchemaData, elemSchemaVisible } =
      this.state;

    return (
      <div id="widget-schema-editor" className="widget-schema-editor-container">
        <div id="widgetLayoutTree" className="content widget-layout-tree">
          {currentWidgetLayout && currentWidgetLayout.length > 0 && (
            <Tree
              showLine={true}
              defaultExpandAll={true}
              selectedKeys={
                this.state.defaultSelectedKeys.length >= 1
                  ? this.state.defaultSelectedKeys
                  : []
              }
              blockNode={false}
              virtual={false}
              onSelect={this.onTreeSelect}
            >
              {this.getTreeContainer(currentWidgetLayout, '')}
            </Tree>
          )}
          {currentWidgetLayout && currentWidgetLayout.length === 0 && (
            <p className="text-center">暂无模型数据</p>
          )}
        </div>
        {/* 为当前组件添加可配置项 */}
        {elemSchemaVisible && (
          <Modal
            title={
              curSchemaData && curSchemaData.title
                ? `${curSchemaData.title}（添加配置项）`
                : `添加配置项`
            }
            width={700}
            visible={elemSchemaVisible}
            onCancel={this.closeElemSchema}
            onOk={this.closeElemSchema}
          >
            <ElemSchema
              elemIndexRoute={elemIndexRoute}
              curElemData={curElemData}
              curSchemaData={curSchemaData}
            />
          </Modal>
        )}
      </div>
    );
  }
}

export default inject((stores) => ({
  initWidgetLayout: stores.widgetSchemaStore.initWidgetLayout,
  initWidgetSchema: stores.widgetSchemaStore.initWidgetSchema,
  initCurMockData: stores.widgetSchemaStore.initCurMockData,
  initOnChange: stores.widgetSchemaStore.initOnChange,
  checkHasConfigProp: stores.widgetSchemaStore.checkHasConfigProp,
  checkConfigPropCount: stores.widgetSchemaStore.checkConfigPropCount,
}))(observer(UIWidgetSchema));
