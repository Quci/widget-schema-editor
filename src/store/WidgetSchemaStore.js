import { observable, computed, action, toJS } from 'mobx';
import { message } from 'antd';
import { isEqual, objClone, isFunction } from '$utils/index';

import {
  getSchemaByIndexRoute,
  getSchemaByKeyRoute,
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
 * UI组件的schema相关状态数据
 */
export default class WidgetSchemaStore {
  /**
   * triggerChange: 用于强制触发更新事件
   */
  @observable triggerChange = false;

  /**
   * widgetSchema: 当前组件Schema数据
   */
  @observable widgetSchema = {};

  /**
   * curMockData: 当前元素在widgetLayout中记录的数据对象（type、title、class、data等）
   */
  @observable curMockData = {};

  @computed get widgetSchemaObj() {
    return toJS(this.widgetSchema);
  }

  @computed get curMockDataObj() {
    return toJS(this.curMockData);
  }

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

  @action.bound
  initWidgetSchema(widgetSchema) {
    if (!widgetSchema || JSON.stringify(widgetSchema) === '{}') {
      this.widgetSchema = initJSONSchemaData; // 重置为空
    } else if (!isEqual(widgetSchema, this.widgetSchema)) {
      this.widgetSchema = widgetSchema;
    }
  }

  @action.bound
  initCurMockData(curMockData) {
    if (!curMockData || JSON.stringify(curMockData) === '{}') {
      this.curMockData = {}; // 重置为空
    } else if (!isEqual(curMockData, this.curMockData)) {
      this.curMockData = curMockData;
    }
  }

  /** 初始化jsonData */
  @action.bound
  initOnChange(newOnChangeFunc) {
    if (newOnChangeFunc || isFunction(newOnChangeFunc)) {
      this.onChange = newOnChangeFunc;
    }
  }

  /** 触发onChange */
  @action.bound
  widgetSchemaChange(ignore) {
    // 更新jsonSchema数据的更新时间
    this.widgetSchema.lastUpdateTime = new Date();
    // 如果ignore为true则跳过，避免重复触发onChange
    if (!ignore) {
      this.onChange(this.widgetSchemaObj);
    }
  }

  /** 根据索引路径获取对应的key值路径 */
  @action.bound
  indexRoute2keyRoute(indexRoute) {
    return indexRoute2keyRoute(indexRoute, this.widgetSchema);
  }

  /** 根据索引路径获取对应的schema数据[非联动式数据获取]  */
  @action.bound
  getSchemaByIndexRoute(indexRoute) {
    return getSchemaByIndexRoute(indexRoute, this.widgetSchema, true); // useObjClone: true 避免后续产生数据联动
  }

  /** 根据key值路径获取对应的schema数据[非联动式数据获取]  */
  @action.bound
  getSchemaByKeyRoute(keyRoute) {
    return getSchemaByKeyRoute(keyRoute, this.widgetSchema, true); // useObjClone: true 避免后续产生数据联动
  }

  /**
   * 以下用于设置可配置项的相关代码
   */

  /** 判断是否为可配置字段 */
  @action.bound
  checkConfigProp(configProp) {
    let isConfigProp = false; // 是否可配置
    // 1.生成propKey
    const propKey = `${
      configProp.jsonKey
    }__${configProp.elemIndexRoute.replaceAll(
      '-',
      'x',
    )}_${configProp.propIndexRoute.replaceAll('-', 'x')}`;
    isConfigProp =
      this.widgetSchema.properties[configProp.propType] &&
      this.widgetSchema.properties[configProp.propType].properties[propKey]
        ? true
        : false;
    return isConfigProp;
  }

  /** 判断是否有可配置字段 */
  @action.bound
  checkHasConfigProp(curElemIndexRoute) {
    let hasConfigProp = false; // 是否有可配置字段
    if (!curElemIndexRoute) return hasConfigProp;
    // 1.生成propKey
    const elemIndexRoute = `__${curElemIndexRoute.replaceAll('-', 'x')}_`;
    // 先判断style中是否有对应的配置项
    hasConfigProp =
      this.widgetSchema.properties['style'].propertyOrder
        .join(',')
        .indexOf(elemIndexRoute) > -1
        ? true
        : false;
    if (!hasConfigProp) {
      // 判断func中是否有对应的配置项
      hasConfigProp =
        this.widgetSchema.properties['func'].propertyOrder
          .join(',')
          .indexOf(elemIndexRoute) > -1
          ? true
          : false;
    }
    if (!hasConfigProp) {
      // 判断data中是否有对应的配置项
      hasConfigProp =
        this.widgetSchema.properties['data'].propertyOrder
          .join(',')
          .indexOf(elemIndexRoute) > -1
          ? true
          : false;
    }
    return hasConfigProp;
  }

  /** 检查有多少可配置字段 */
  @action.bound
  checkConfigPropCount(curElemIndexRoute) {
    let configPropCount = 0;
    if (!curElemIndexRoute) return configPropCount;
    // 1.生成propKey
    const elemIndexRoute = `__${curElemIndexRoute.replaceAll('-', 'x')}_`;
    // 检查style中有多少对应的配置项
    const styleProps = this.widgetSchema.properties[
      'style'
    ].propertyOrder.filter((keyItem) => keyItem.indexOf(elemIndexRoute) > -1);
    if (styleProps && styleProps.length) {
      configPropCount += styleProps.length;
    }
    // 检查func中有多少对应的配置项
    const funcProps = this.widgetSchema.properties['func'].propertyOrder.filter(
      (keyItem) => keyItem.indexOf(elemIndexRoute) > -1,
    );
    if (funcProps && funcProps.length) {
      configPropCount += funcProps.length;
    }
    // 检查data中有多少对应的配置项
    const dataProps = this.widgetSchema.properties['data'].propertyOrder.filter(
      (keyItem) => keyItem.indexOf(elemIndexRoute) > -1,
    );
    if (dataProps && dataProps.length) {
      configPropCount += dataProps.length;
    }
    return configPropCount;
  }

  /**
   * 设置为可配置字段
   * */
  @action.bound
  addConfigProp(configProp) {
    // 1.生成propKey
    const propKey = `${
      configProp.jsonKey
    }__${configProp.elemIndexRoute.replaceAll(
      '-',
      'x',
    )}_${configProp.propIndexRoute.replaceAll('-', 'x')}`;
    // 2.插入widgetSchema
    this.widgetSchema.properties[configProp.propType].properties[propKey] =
      configProp.propSchema;
    this.widgetSchema.properties[configProp.propType].required.push(propKey);
    this.widgetSchema.properties[configProp.propType].propertyOrder.push(
      propKey,
    );
    // 触发onChange事件
    this.widgetSchemaChange();
  }

  /**
   * 取消可配置字段
   * */
  @action.bound
  cancelConfigProp(configProp) {
    // 1.生成propKey
    const propKey = `${
      configProp.jsonKey
    }__${configProp.elemIndexRoute.replaceAll(
      '-',
      'x',
    )}_${configProp.propIndexRoute.replaceAll('-', 'x')}`;
    // 2.删除对应数据widgetSchema
    delete this.widgetSchema.properties[configProp.propType].properties[
      propKey
    ];
    // 3.删除propertyOrder中对应的curKey
    const deleteIndex =
      this.widgetSchema.properties[configProp.propType].propertyOrder.indexOf(
        propKey,
      );
    this.widgetSchema.properties[configProp.propType].propertyOrder.splice(
      deleteIndex,
      1,
    );
    // 4.删除propertyOrder中对应的curKey
    const deleteIndex2 =
      this.widgetSchema.properties[configProp.propType].required.indexOf(
        propKey,
      );
    this.widgetSchema.properties[configProp.propType].required.splice(
      deleteIndex2,
      1,
    );
    // 触发onChange事件
    this.widgetSchemaChange();
  }
}
