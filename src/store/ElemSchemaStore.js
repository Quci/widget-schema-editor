import { observable, computed, action, toJS } from 'mobx';
import { isEqual, objClone } from '$utils/index';
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

/**
 * 容器和元件的schema相关状态数据
 */
export default class ElemSchemaStore {
  /**
   * triggerChange: 用于强制触发更新事件
   */
  @observable triggerChange = false;

  /**
   * 记录当前元素在widgetLayout中的位置
   */
  @observable elemIndexRoute = '';

  /**
   * curElemData: 当前元素在widgetLayout中记录的数据对象（type、title、class、data等）
   */
  @observable curElemData = {};

  /**
   * jsonSchema: 当前元素Schema数据
   */
  @observable jsonSchema = {};

  @computed get curElemDataObj() {
    return toJS(this.curElemData);
  }

  @computed get JSONSchemaObj() {
    return toJS(this.jsonSchema);
  }

  /**
   * triggerChangeAction: 用于主动触发更新事件
   */
  @action.bound
  triggerChangeAction() {
    this.triggerChange = !this.triggerChange;
  }

  @action.bound
  updateCurElemIndex(elemIndexRoute) {
    this.elemIndexRoute = elemIndexRoute;
  }

  @action.bound
  initCurElemData(curElemData) {
    if (!curElemData || JSON.stringify(curElemData) === '{}') {
      this.curElemData = {}; // 重置为空
    } else if (!isEqual(curElemData, this.curElemDataObj)) {
      this.curElemData = curElemData;
    }
  }

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
}
