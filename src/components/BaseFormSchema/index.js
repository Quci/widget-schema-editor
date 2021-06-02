import * as React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Checkbox, Input, Select, Tooltip } from 'antd';
const { Option } = Select;
import { getCurrentFormat, isFirstSchemaData } from '@wibetter/json-utils';
import './index.scss';

class BaseFormSchema extends React.PureComponent {
  static propTypes = {
    parentType: PropTypes.string,
    jsonKey: PropTypes.string,
    indexRoute: PropTypes.string,
    nodeKey: PropTypes.string,
    targetJsonSchema: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      isShowAdvance: false,
    };
    // 这边绑定是必要的，这样 `this` 才能在回调函数中使用
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  /** 将当前字段设置为可配置项 */
  setProp2configZProps = (event) => {
    const { value } = event.target;
    const { indexRoute, jsonKey, editJsonData, targetJsonSchema } = this.props;
    // 待开发
  };

  render() {
    const { jsonKey, nodeKey, targetJsonSchema } = this.props;
    const currentFormat = getCurrentFormat(targetJsonSchema);
    const isFirstSchema = isFirstSchemaData(currentFormat) || false; // 是否是最外层的schema元素
    const readOnly = false; // 默认只读

    return (
      <>
        {targetJsonSchema && (
          <div className="base-schema-box" id={nodeKey}>
            <div className="key-input-item">
              <Input value={jsonKey || 'key值不存在'} disabled={readOnly} />
            </div>
            <div className="type-select-item">
              <Select
                value={currentFormat}
                style={{ width: 150 }}
                disabled={readOnly}
              >
                <Option value={currentFormat}>{currentFormat}</Option>
              </Select>
            </div>
            <div className="title-input-item">
              <Input value={targetJsonSchema.title} disabled={readOnly} />
            </div>
            <div className="operate-item">
              {!isFirstSchema && (
                <Tooltip title="设置为可配置项（静态参数转为动态参数）">
                  <Checkbox onChange={this.setProp2configZProps}>
                    可配置
                  </Checkbox>
                </Tooltip>
              )}
            </div>
          </div>
        )}
        {!targetJsonSchema && (
          <div className="base-schema-box">
            <div className="warn-text">{jsonKey}：数据元素为空</div>
          </div>
        )}
      </>
    );
  }
}

export default inject((stores) => ({
  getSchemaByIndexRoute: stores.widgetSchemaStore.getSchemaByIndexRoute,
  indexRoute2keyRoute: stores.widgetSchemaStore.indexRoute2keyRoute,
}))(observer(BaseFormSchema));
