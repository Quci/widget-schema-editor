import * as React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Tree } from 'antd';
import ObjectSchema from '$components/ObjectSchema/index';
import MappingRender from '$components/MappingRender';
import ConditionPropsSchema from '$components/ConditionPropsSchema/index';
import { isEqual } from '$utils/index';
import { getCurrentFormat, isEmptySchema } from '@wibetter/json-utils';
import './index.scss';

class ElemSchema extends React.PureComponent {
  static propTypes = {
    elemIndexRoute: PropTypes.string,
    curElemData: PropTypes.object,
    curSchemaData: PropTypes.object,
  };

  constructor(props) {
    super(props);
    if (props.elemIndexRoute) {
      this.props.updateCurElemIndex(props.elemIndexRoute);
    }
    if (props.curElemData) {
      this.props.initCurElemData(props.curElemData);
    }
    // 根据props.data对jsonSchema进行初始化
    if (props.curSchemaData) {
      this.props.initJSONSchemaData(props.curSchemaData);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.elemIndexRoute, this.props.elemIndexRoute)) {
      this.props.updateCurElemIndex(nextProps.elemIndexRoute);
    }
    if (!isEqual(nextProps.curElemData, this.props.curElemData)) {
      this.props.initCurElemData(nextProps.curElemData);
    }
    if (!isEqual(nextProps.curSchemaData, this.props.curSchemaData)) {
      this.props.initJSONSchemaData(nextProps.curSchemaData);
    }
  }

  /**
   * 默认展开二级schema面板
   */
  catchExpandedKeys = (jsonSchema) => {
    const defaultExpandedKeys = [];
    if (jsonSchema && jsonSchema.propertyOrder && jsonSchema.properties) {
      jsonSchema.propertyOrder.map((key, index) => {
        /** 1. 获取当前元素的key值 */
        const currentJsonKey = key;
        /** 2. 获取当前元素的json数据对象 */
        const currentSchemaData = jsonSchema.properties[currentJsonKey];
        /** 3. 判断是否是容器类型元素，如果是则禁止选中 */
        const currentFormat = getCurrentFormat(currentSchemaData);
        /** 4. 获取当前元素的id，用于做唯一标识 */
        let nodeKey = `${currentFormat}-${currentJsonKey}`; // 使用当前format+jsonKey作为nodeKey
        defaultExpandedKeys.push(nodeKey);
      });
    }
    return defaultExpandedKeys;
  };

  render() {
    const { jsonSchema } = this.props;
    const isEmpty = isEmptySchema(jsonSchema);
    const currentFormat = getCurrentFormat(jsonSchema);
    /**
     * 备注：此处单独将object进行渲染，主要是为了将Tree根组件抽离出来（以便在此处进行拖拽事件的处理），
     * JSONSchema的一级字段必须为object类型（规避非法的jsonSchema数据，以及结构单一的jsonSchema数据，
     * 后续再单独考虑如何兼容单一结构的jsonSchema数据）。
     * */
    return (
      <div className="json-schema-container scroll-ability">
        {!isEmpty && (
          <>
            <ConditionPropsSchema />
            <Tree
              selectable={false}
              defaultExpandedKeys={
                currentFormat === 'object' && !isEmpty
                  ? this.catchExpandedKeys(jsonSchema)
                  : []
              }
            >
              {currentFormat === 'object' &&
                ObjectSchema({
                  parentType: '',
                  jsonKey: '',
                  indexRoute: '',
                  nodeKey: '',
                  targetJsonSchema: jsonSchema,
                  isOnlyShowChild: true, // 一级object类型不显示，仅显示其子项
                })}
              {currentFormat !== 'object' &&
                MappingRender({
                  parentType: '',
                  jsonKey: '',
                  indexRoute: '',
                  nodeKey: 'first-schema',
                  targetJsonSchema: jsonSchema,
                  key: 'schema',
                  isFirstSchema: true,
                })}
            </Tree>
          </>
        )}
        {isEmpty && (
          <p className="json-schema-empty">当前jsonSchema没有数据内容</p>
        )}
      </div>
    );
  }
}

export default inject((stores) => ({
  jsonSchema: stores.elemSchemaStore.jsonSchema,
  initCurElemData: stores.elemSchemaStore.initCurElemData,
  initJSONSchemaData: stores.elemSchemaStore.initJSONSchemaData,
  updateCurElemIndex: stores.elemSchemaStore.updateCurElemIndex,
  getSchemaByIndexRoute: stores.elemSchemaStore.getSchemaByIndexRoute,
  indexRoute2keyRoute: stores.elemSchemaStore.indexRoute2keyRoute,
}))(observer(ElemSchema));
