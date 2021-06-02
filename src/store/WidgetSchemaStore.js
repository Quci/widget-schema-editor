import { observable, computed, action, toJS } from 'mobx';
import { message } from 'antd';
import { isEqual, objClone, isFunction } from '$utils/index';

import {
  isNewSchemaData,
  getSchemaByIndexRoute,
  getSchemaByKeyRoute,
  oldSchemaToNewSchema,
  indexRoute2keyRoute,
} from '@wibetter/json-utils';

const initJSONSchemaData = {
  type: 'object',
  title: 'widgetSchemaObject',
  properties: {
    style: {
      type: 'object',
      format: 'style',
      title: '样式设置',
      readOnly: true,
      properties: {},
      required: [],
      propertyOrder: [],
    },
    func: {
      type: 'object',
      format: 'func',
      title: '功能设置',
      readOnly: true,
      properties: {},
      required: [],
      propertyOrder: [],
    },
    data: {
      type: 'object',
      format: 'data',
      title: '数据设置',
      readOnly: true,
      properties: {},
      required: [],
      propertyOrder: [],
    },
  },
  required: ['style', 'func', 'data'],
  propertyOrder: ['style', 'func', 'data'],
};

export default class WidgetSchemaStore {
  /**
   * triggerChange: 用于强制触发更新事件
   */
  @observable triggerChange = false;

  /**
   * jsonSchema: JSONSchema数据对象
   */
  @observable jsonSchema = {};

  /**
   * onChange: jsonSchema数据变动触发的onChange
   */
  @observable onChange = () => {}; // 函数类型

  /**
   * triggerChangeAction: 用于主动触发更新事件
   */
  @action.bound
  triggerChangeAction() {
    this.triggerChange = !this.triggerChange;
  }

  /** 根据索引路径获取对应的json数据[非联动式数据获取]  */
  @action.bound
  initJSONSchemaData(jsonSchemaData) {
    if (!jsonSchemaData || JSON.stringify(jsonSchemaData) === '{}') {
      // 使用默认的jsonschema数据进行初始化
      this.jsonSchema = objClone(initJSONSchemaData);
    } else if (!isEqual(jsonSchemaData, this.JSONSchemaObj)) {
      if (jsonSchemaData && isNewSchemaData(jsonSchemaData)) {
        // 如果有lastUpdateTime则说明是新版jsonSchema数据，无需转换直接进行赋值
        this.jsonSchema = jsonSchemaData;
      } else {
        // 进行一次转换，以便兼容旧版数据
        const newJSONSchema = oldSchemaToNewSchema(jsonSchemaData);
        this.jsonSchema = newJSONSchema;
      }
    }
  }

  @computed get JSONSchemaObj() {
    return toJS(this.jsonSchema);
  }

  /** 初始化jsonData */
  @action.bound
  initOnChange(newOnChangeFunc) {
    if (newOnChangeFunc || isFunction(newOnChangeFunc)) {
      this.onChange = newOnChangeFunc;
    }
  }

  /** 触发onChange  */
  @action.bound
  jsonSchemaChange(ignore) {
    // 更新jsonSchema数据的更新时间
    this.jsonSchema.lastUpdateTime = new Date();
    // 如果ignore为true则跳过，避免重复触发onChange
    if (!ignore) {
      this.onChange(this.JSONSchemaObj);
    }
  }

  /** 根据索引路径获取对应的key值路径 */
  @action.bound
  indexRoute2keyRoute(indexRoute) {
    return indexRoute2keyRoute(indexRoute, this.jsonSchema);
  }

  /** 根据索引路径获取对应的schema数据[非联动式数据获取]  */
  @action.bound
  getSchemaByIndexRoute(indexRoute) {
    return getSchemaByIndexRoute(indexRoute, this.jsonSchema, true); // useObjClone: true 避免后续产生数据联动
  }

  /** 根据key值路径获取对应的schema数据[非联动式数据获取]  */
  @action.bound
  getSchemaByKeyRoute(keyRoute) {
    return getSchemaByKeyRoute(keyRoute, this.jsonSchema, true); // useObjClone: true 避免后续产生数据联动
  }

  /** 根据索引路径值(indexRoute)插入新的兄弟节点元素-json数据对象
   *  备注：关键字(childKey)自动生成，json数据对象默认使用initInputData
   * */
  @action.bound
  addNextJsonData(curIndexRoute) {
    // 1.获取当前元素的父元素路径值和最后一个路径值，以便定位插入的位置
    const parentIndexRoute = getParentIndexRoute(curIndexRoute);
    // 2.生成新的jsonKey值
    const parentJSONObj = getSchemaByIndexRoute(
      parentIndexRoute,
      this.jsonSchema,
    );
    /** 如果没有设置jsonKey，则自动生成一个新的jsonKey */
    const newJsonKey = this.getNewJsonKeyIndex(parentJSONObj);
    this.insertJsonData(curIndexRoute, newJsonKey, initInputData); // 默认新增input类型字段
  }

  /** 根据索引路径值(indexRoute)插入指定的json数据对象（jsonKey、curJSONObj）
   * position（非必填）: after（表示插入到指定位置后面，默认值）、before（表示插入到指定位置前面）
   * */
  @action.bound
  insertJsonData(curIndexRoute, jsonKey, curJSONObj, position, ignoreOnChange) {
    // 1.获取当前元素的父元素路径值和最后一个路径值，以便定位插入的位置
    const parentIndexRoute_CurIndex =
      getParentIndexRoute_CurIndex(curIndexRoute);
    const parentIndexRoute = parentIndexRoute_CurIndex[0];
    const curIndex = parentIndexRoute_CurIndex[1];
    // 2.获取父级元素
    const parentJSONObj = getSchemaByIndexRoute(
      parentIndexRoute,
      this.jsonSchema,
    );
    // 3.插入新增的对象数据
    parentJSONObj.required.push(jsonKey);
    parentJSONObj.properties[jsonKey] = curJSONObj;
    // 4.在propertyOrder的对应位置插入newJsonKey【有序插入newJsonKey】
    const currentPropertyOrder = parentJSONObj.propertyOrder;
    // 5.获取插入位置
    const positionIndex =
      position === 'before' ? Number(curIndex) : Number(curIndex) + 1;
    const startArr = currentPropertyOrder.slice(0, positionIndex);
    const endArr = currentPropertyOrder.slice(positionIndex);
    parentJSONObj.propertyOrder = [...startArr, jsonKey, ...endArr];
    // 触发onChange事件
    this.jsonSchemaChange(ignoreOnChange);
  }

  /** 根据索引路径值(indexRoute)和关键字(childKey)删除对应的json数据对象 */
  @action.bound
  deleteJsonByIndex_CurKey(indexRoute, curKey, ignoreOnChange) {
    // 1.获取当前元素的父元素路径值
    const parentIndexRoute = getParentIndexRoute(indexRoute);
    const parentJsonObj = getSchemaByIndexRoute(
      parentIndexRoute,
      this.jsonSchema,
    );
    // 2.根据curKey删除在properties中删除对应的字段对象
    delete parentJsonObj.properties[curKey];
    // 3.删除propertyOrder中对应的curKey
    const deleteIndex = parentJsonObj.propertyOrder.indexOf(curKey);
    parentJsonObj.propertyOrder.splice(deleteIndex, 1);
    // 4.删除required中对应的curKey
    const deleteIndex2 = parentJsonObj.required.indexOf(curKey);
    parentJsonObj.required.splice(deleteIndex2, 1);
    // 触发onChange事件
    this.jsonSchemaChange(ignoreOnChange);
  }

  /** 根据索引路径值(indexRoute)删除对应的json数据对象 */
  @action.bound
  deleteJsonByIndex(indexRoute, ignoreOnChange) {
    // 1.获取当前元素的父元素路径值和最后一个路径值，以便定位插入的位置
    const parentIndexRoute_CurIndex = getParentIndexRoute_CurIndex(indexRoute);
    const parentIndexRoute = parentIndexRoute_CurIndex[0];
    const curIndex = parentIndexRoute_CurIndex[1];
    const parentJsonObj = getSchemaByIndexRoute(
      parentIndexRoute,
      this.jsonSchema,
    );
    const curKey = parentJsonObj.propertyOrder[curIndex];
    // 2.根据curKey删除在properties中删除对应的字段对象
    delete parentJsonObj.properties[curKey];
    // 3.删除propertyOrder中对应的curKey
    const deleteIndex = parentJsonObj.propertyOrder.indexOf(curKey);
    parentJsonObj.propertyOrder.splice(deleteIndex, 1);
    // 4.删除required中对应的curKey
    const deleteIndex2 = parentJsonObj.required.indexOf(curKey);
    parentJsonObj.required.splice(deleteIndex2, 1);
    // 触发onChange事件
    this.jsonSchemaChange(ignoreOnChange);
  }

  /** 以下用于设置可配置项的相关代码
   * 备注：jsonSchema新增configProps对象，以key-value的形式记录当前schema中的可配置字段
   */

  /** 根据key值路径(keyRoute)判断是否为可配置字段 */
  @action.bound
  checkConfigProp(keyRoute) {
    const conditionProps =
      this.jsonSchema && this.jsonSchema.conditionProps
        ? this.jsonSchema.conditionProps
        : {};
    let isConditionProp = false;
    if (conditionProps[keyRoute]) {
      isConditionProp = true;
    }
    return isConditionProp;
  }

  /** 添加条件字段
   * */
  @action.bound
  addConfigProp(conditionProp) {
    if (!this.jsonSchema) {
      message.error('当前schema为空');
      return;
    }
    if (!this.jsonSchema.conditionProps) {
      // 首次添加条件字段时
      this.jsonSchema.conditionProps = {};
    }
    // 获取当前schema中的条件字段
    const conditionProps = this.jsonSchema.conditionProps;
    if (conditionProp && conditionProp.keyRoute) {
      conditionProps[conditionProp.keyRoute] = conditionProp;
      // 触发onChange事件
      this.jsonSchemaChange();
    }
  }

  /** 移除条件字段
   * */
  @action.bound
  removeConfigProp(keyRoute) {
    if (!this.jsonSchema) {
      message.error('当前schema为空');
      return;
    }
    if (!this.jsonSchema.conditionProps) {
      // 首次添加条件字段时
      this.jsonSchema.conditionProps = {};
    }
    // 获取当前schema中的条件字段
    const conditionProps = this.jsonSchema.conditionProps;
    if (keyRoute && conditionProps[keyRoute]) {
      delete conditionProps[keyRoute];
      // 触发onChange事件
      this.jsonSchemaChange();
    }
  }

  /** 根据索引路径值(indexRoute)和propKey 删除对应的schema属性字段
   * 备注：目前仅用于删除隐藏规则
   * */
  @action.bound
  deleteSchemaProp(curIndexRoute, propKey, ignoreOnChange) {
    const schemaObj = getSchemaByIndexRoute(curIndexRoute, this.jsonSchema);
    delete schemaObj[propKey];
    // 触发onChange事件
    this.jsonSchemaChange(ignoreOnChange);
  }
}
