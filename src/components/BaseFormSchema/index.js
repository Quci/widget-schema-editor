import * as React from 'react';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Checkbox, Input, Select, Tooltip } from 'antd';
const { Option } = Select;
import { InfoCircleOutlined, ClearOutlined } from '@ant-design/icons';
import { getCurrentFormat, isFirstSchemaData } from '@wibetter/json-utils';
// import { getPropValueByWidgetLayout } from '$utils/index';
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
    this.setProp2configProp = this.setProp2configProp.bind(this);
  }

  /** 将当前字段设置为可配置项
   * elemIndexRoute：当前元素在widgetLayout中的索引路径值
   * curElemDataObj：当前元素在widgetLayout中存放的数据
   * jsonSchema：当前元素Schema数据
   * indexRoute：当前字段在jsonSchema中的索引路径值
   * jsonKey：当前字段在jsonSchema中的key值
   * targetJsonSchema：当前字段Schema数据
   * */
  setProp2configProp = () => {
    const { addConfigProp } = this.props;
    // 将当前字段设置为可配置项
    const {
      widgetLayoutObj,
      curElemDataObj,
      elemIndexRoute,
      jsonSchema,
      getPropValueByWidgetLayout,
    } = this.props; // 当前字段相关数据
    const { parentType, indexRoute, jsonKey, targetJsonSchema } = this.props; // 当前字段相关数据
    const elemJsonSchema = toJS(jsonSchema); // 当前元件Schema
    const propJsonSchema = toJS(targetJsonSchema); // 当前字段schema
    // 获取当前字段的配置数值
    const curPropValue = getPropValueByWidgetLayout(
      indexRoute,
      widgetLayoutObj,
    );
    // 1.增加"动态参数"标识
    propJsonSchema.isDynamicParam = true;
    // 2.在字段Schema中记录原始路径值
    propJsonSchema['elemIndexRoute'] = elemIndexRoute;
    propJsonSchema['propIndexRoute'] = indexRoute;
    // 3.在描述字段中增加元素标识
    if (propJsonSchema.description) {
      propJsonSchema[
        'description'
      ] = `${elemJsonSchema.title}(${elemIndexRoute})-${propJsonSchema.title}: ${propJsonSchema.description}`;
    } else {
      propJsonSchema[
        'description'
      ] = `${elemJsonSchema.title}(${elemIndexRoute})-${propJsonSchema.title}`;
    }
    // 4.设置默认值
    propJsonSchema['default'] = curPropValue; // 备注：此处不能增加默认值，因为类型不同其默认值也不同
    // 5.判断是否是条件字段
    const isConditionProp = this.checkConditionProp(); // 检查是否是条件字段
    propJsonSchema['isConditionProp'] = isConditionProp;
    // 6.记录当前配置项对应的元素类型和名称
    propJsonSchema['elemType'] = curElemDataObj.type;
    propJsonSchema['elemName'] = curElemDataObj.name;
    // 6.记录当前配置项所有分类和原始key值
    propJsonSchema['propType'] = parentType;
    propJsonSchema['jsonKey'] = jsonKey;
    // 7.添加可配置字段
    addConfigProp({
      elemIndexRoute: elemIndexRoute,
      propIndexRoute: indexRoute,
      propType: parentType,
      jsonKey,
      propSchema: propJsonSchema,
    });
  };

  // 可配置开关事件处理方法
  propCheckboxEvent = (event) => {
    const { checked } = event.target;
    if (checked) {
      // 将当前字段设置为可配置
      this.setProp2configProp();
    } else {
      this.cancelConfigProp();
    }
  };

  cancelConfigProp = () => {
    const { cancelConfigProp } = this.props;
    // 取消当前字段为可配置项
    const { parentType, elemIndexRoute, indexRoute, jsonKey } = this.props;
    cancelConfigProp({
      elemIndexRoute: elemIndexRoute,
      propIndexRoute: indexRoute,
      propType: parentType,
      jsonKey,
    });
  };

  /** 检查当前字段是否可配置 */
  checkConfigProp = () => {
    const { checkConfigProp } = this.props;
    const { parentType, elemIndexRoute, indexRoute, jsonKey } = this.props;

    const isConfigProp = checkConfigProp({
      elemIndexRoute: elemIndexRoute,
      propIndexRoute: indexRoute,
      propType: parentType,
      jsonKey,
    });
    return isConfigProp;
  };

  /** 检查当前字段是否是条件字段 */
  checkConditionProp = () => {
    const { indexRoute } = this.props;
    const { indexRoute2keyRoute, checkConditionProp } = this.props;
    // 获取对应的keyRoute
    const curKeyRoute = indexRoute2keyRoute(indexRoute);
    const isConfigProp = checkConditionProp(curKeyRoute);
    return isConfigProp;
  };

  clearConfigProp = () => {
    const { jsonKey, clearConfigProp } = this.props;
    clearConfigProp(jsonKey);
  };

  render() {
    const {
      parentType,
      nodeKey,
      jsonKey,
      elemIndexRoute,
      targetJsonSchema,
      indexRoute,
      curLastUpdateTime,
    } = this.props;
    const { checkConfigProp, keyRoute2indexRoute } = this.props;
    const currentFormat = getCurrentFormat(targetJsonSchema);
    const isFirstSchema = isFirstSchemaData(currentFormat) || false; // 是否是最外层的schema元素
    const readOnly = false; // 默认只读
    const isConfigProp = this.checkConfigProp(); // 检查是否可配置
    const isConditionProp = this.checkConditionProp(); // 检查是否是条件字段
    // 获取唯一id
    let curNodeKey = `${curLastUpdateTime}-${nodeKey}-${elemIndexRoute}-${indexRoute}-${indexRoute}`;

    /** 1、是否需要显示当前字段 */
    let isShowCurProp = true;
    let hiddenRule = {};
    /** 2、获取当前字段的条件规则 */
    if (targetJsonSchema.hiddenRule) {
      hiddenRule = targetJsonSchema.hiddenRule;
    }
    /** 用于记录对应的条件字段jsonKey，用于提示用户先将其条件字段设置为可配置 */
    let conditionPropKey = '';
    /** 3、当其对应的条件字段设置为可配置时才显示联动字段 */
    if (hiddenRule.conditionProp) {
      const curConditionProp = hiddenRule.conditionProp;
      conditionPropKey = curConditionProp.key;
      const conditionPropIndexRoute = keyRoute2indexRoute(
        curConditionProp.keyRoute,
      );
      /** 4、检查其条件字段是否设置为可配置（只有设置为可配置才显示当前字段） */
      isShowCurProp = checkConfigProp({
        elemIndexRoute: elemIndexRoute,
        propIndexRoute: conditionPropIndexRoute,
        propType: parentType,
        jsonKey: conditionPropKey,
      });
    }

    /** 识别特殊情况：当前设置为可配置，但其对应的条件字段不是可配置 */
    if (!isShowCurProp && isConfigProp) {
      setTimeout(() => {
        // 自动取消当前字段为可配置字段
        this.cancelConfigProp();
      }, 0);
    }

    let configCheckboxDisabled = false;
    /** 当前为关联字段，并且其条件字段设置为可配置，则其关联字段自动设置为可配置，并设置为只读（只能是可配置字段）*/
    /*if (conditionPropKey && isShowCurProp) {
      configCheckboxDisabled = true;
      setTimeout(() => {
        // 自动将当前字段为可配置字段
        this.setProp2configProp();
      }, 0);
    }*/

    // 将条件字段的数值作为key的一部分
    curNodeKey = `${curNodeKey}-${isShowCurProp}-${configCheckboxDisabled}`;

    return (
      <>
        {targetJsonSchema && (
          <div
            className={`base-schema-box ${
              isConditionProp ? 'is-condition-prop' : ''
            }`}
            id={curNodeKey}
            key={curNodeKey}
          >
            <div className="key-input-item">
              <Tooltip title={`${jsonKey || targetJsonSchema.title}是条件字段`}>
                <Input value={jsonKey || 'key值不存在'} disabled={readOnly} />
              </Tooltip>
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
              <Tooltip title={`${targetJsonSchema.title || jsonKey}是条件字段`}>
                <Input value={targetJsonSchema.title} disabled={readOnly} />
              </Tooltip>
            </div>
            <div className="operate-item">
              {isFirstSchema && targetJsonSchema.propertyOrder.length > 0 && (
                <Tooltip title="点击清空此对象下面的可配置项">
                  <ClearOutlined onClick={this.clearConfigProp} />
                </Tooltip>
              )}
              {isShowCurProp && !isFirstSchema && (
                <Tooltip title="设置为可配置项">
                  <Checkbox
                    id={curNodeKey}
                    key={curNodeKey}
                    onChange={this.propCheckboxEvent}
                    defaultChecked={isConfigProp}
                    disabled={configCheckboxDisabled}
                  >
                    可配置
                  </Checkbox>
                </Tooltip>
              )}
              {!isShowCurProp && (
                <Tooltip
                  title={`请先将条件字段${
                    conditionPropKey ? conditionPropKey : ''
                  }设置为可配置`}
                >
                  <InfoCircleOutlined />
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
  elemIndexRoute: stores.elemSchemaStore.elemIndexRoute,
  curElemDataObj: stores.elemSchemaStore.curElemDataObj,
  jsonSchema: stores.elemSchemaStore.jsonSchema,
  indexRoute2keyRoute: stores.elemSchemaStore.indexRoute2keyRoute,
  keyRoute2indexRoute: stores.elemSchemaStore.keyRoute2indexRoute,
  checkConditionProp: stores.elemSchemaStore.checkConditionProp,
  getPropValueByWidgetLayout: stores.elemSchemaStore.getPropValueByWidgetLayout,
  widgetLayoutObj: stores.widgetSchemaStore.widgetLayoutObj,
  checkConfigProp: stores.widgetSchemaStore.checkConfigProp,
  addConfigProp: stores.widgetSchemaStore.addConfigProp,
  cancelConfigProp: stores.widgetSchemaStore.cancelConfigProp,
  curLastUpdateTime: stores.widgetSchemaStore.lastUpdateTime,
  clearConfigProp: stores.widgetSchemaStore.clearConfigProp,
}))(observer(BaseFormSchema));
