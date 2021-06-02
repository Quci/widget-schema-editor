import * as React from 'react';
import { toJS } from 'mobx';
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
    // 这边绑定是必要的，这样 `this` 才能在回调函数中使用
    this.setProp2configZProps = this.setProp2configZProps.bind(this);
  }

  /** 将当前字段设置为可配置项
   * curElemIndex：当前元素在widgetLayout中的索引路径值
   * curElemDataObj：当前元素在widgetLayout中存放的数据
   * jsonSchema：当前元素Schema数据
   * indexRoute：当前字段在jsonSchema中的索引路径值
   * jsonKey：当前字段在jsonSchema中的key值
   * targetJsonSchema：当前字段Schema数据
   * */
  setProp2configZProps = (event) => {
    const { checked } = event.target;
    if (checked) {
      // 将当前字段设置为可配置项
      const { curElemIndex, curElemDataObj, jsonSchema } = this.props; // 当前字段相关数据
      const { indexRoute, jsonKey, targetJsonSchema } = this.props; // 当前字段相关数据
      const elemJsonSchema = toJS(jsonSchema);
      const propJsonSchema = toJS(targetJsonSchema);

      // 待开发
      console.log(curElemIndex);
      console.log(curElemDataObj);
      console.log(elemJsonSchema);

      console.log(indexRoute);
      console.log(jsonKey);
      console.log(propJsonSchema);
    } else {
      // 取消当前字段为可配置项
      const { curElemIndex, indexRoute, jsonKey } = this.props;
      console.log(curElemIndex);
      console.log(indexRoute);
      console.log(jsonKey);
    }
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
  curElemIndex: stores.widgetSchemaStore.curElemIndex,
  curElemDataObj: stores.widgetSchemaStore.curElemDataObj,
  jsonSchema: stores.widgetSchemaStore.jsonSchema,
  getSchemaByIndexRoute: stores.widgetSchemaStore.getSchemaByIndexRoute,
  indexRoute2keyRoute: stores.widgetSchemaStore.indexRoute2keyRoute,
}))(observer(BaseFormSchema));
