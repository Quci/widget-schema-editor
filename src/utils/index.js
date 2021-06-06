import { AntdUISchema, BoxSchemaList } from '@wibetter/ui-schema-editor';
import {
  getJsonDataByKeyRoute,
  indexRoute2keyRoute,
} from '@wibetter/json-utils';
import { widgetSchema2mockData } from './widgetSchema2mockData';

/** js对象数据深拷贝，避免数据联动 */
export function objClone(targetObj) {
  const newObj = JSON.stringify(targetObj);
  return JSON.parse(newObj);
}

/** 对比两个json数据是否相等 */
export function isEqual(targetObj, nextTargetObj) {
  return JSON.stringify(targetObj) === JSON.stringify(nextTargetObj);
}

/**
 *  判断是否是数组类型
 * */
export function isArray(curObj) {
  let isArray = false;
  if (Object.prototype.toString.call(curObj).slice(8, -1) === 'Array') {
    isArray = true;
  }
  return isArray;
}

/**
 *  判断是否是对象类型
 * */
export function isObject(curObj) {
  let isObject = false;
  if (Object.prototype.toString.call(curObj).slice(8, -1) === 'Object') {
    isObject = true;
  }
  return isObject;
}

/**
 *  判断是否是函数类型
 * */
export function isFunction(curObj) {
  let isFunction = false;
  if (Object.prototype.toString.call(curObj).slice(8, -1) === 'Function') {
    isFunction = true;
  }
  return isFunction;
}

/** 判断当前属性是否存在
 * 备注：要识别boolean类型的数值 */
export function exitPropertie(targetPropertie) {
  let exitPropertie = false;
  if (targetPropertie !== undefined) {
    // targetPropertie为""、0、false时均认为是存在的属性
    exitPropertie = true;
  }
  return exitPropertie;
}

/** 根据className判断是否是基本类型元素
 *  基本类型元素：input、boolean、 date、date-time、 time、 url、
 *  textarea、number、 radio、 select、color、quantity
 * */
export function isBaseSchemaElem(elemClassName) {
  let isBaseSchema = false;
  if (
    elemClassName.indexOf('input-schema') >= 0 ||
    elemClassName.indexOf('boolean-schema') >= 0 ||
    elemClassName.indexOf('date-schema') >= 0 ||
    elemClassName.indexOf('date-time-schema') >= 0 ||
    elemClassName.indexOf('time-schema') >= 0 ||
    elemClassName.indexOf('url-schema') >= 0 ||
    elemClassName.indexOf('textarea-schema') >= 0 ||
    elemClassName.indexOf('number-schema') >= 0 ||
    elemClassName.indexOf('radio-schema') >= 0 ||
    elemClassName.indexOf('select-schema') >= 0 ||
    elemClassName.indexOf('color-schema') >= 0 ||
    elemClassName.indexOf('quantity-schema') >= 0
  ) {
    isBaseSchema = true;
  }
  return isBaseSchema;
}

/** 根据className判断是否是容器类型元素
 *  容器类型元素：func、style、data、object
 *  主要用于判断当前元素点击新增时是添加子元素还是添加兄弟节点，容器类型点击新增时则添加子节点。
 *  备注：array类型字段只有固定的一个items属性，不能新增其他子元素。
 * */
export function isBoxSchemaElem(elemClassName) {
  let isBoxSchema = false;
  if (
    elemClassName.indexOf('func-schema') >= 0 ||
    elemClassName.indexOf('style-schema') >= 0 ||
    elemClassName.indexOf('data-schema') >= 0 ||
    elemClassName.indexOf('object-schema') >= 0
  ) {
    isBoxSchema = true;
  }
  return isBoxSchema;
}

/** 根据className判断是否是一级固定类型元素
 *  容器类型元素：func、style、data
 * */
export function isFirstSchemaElem(elemClassName) {
  let isFirstSchema = false;
  if (
    (elemClassName.indexOf('func-schema') >= 0 ||
      elemClassName.indexOf('style-schema') >= 0 ||
      elemClassName.indexOf('data-schema') >= 0) &&
    elemClassName.indexOf('dynamic-data-schema') < 0
  ) {
    isFirstSchema = true;
  }
  return isFirstSchema;
}

/**
 * 获取元素的默认名称
 */
export function getElemDefaultName(elemType) {
  let curElemName = '';
  switch (elemType) {
    case 'container':
      curElemName = '块级容器';
      break;
    case 'row':
      curElemName = '行级容器';
      break;
    case 'column':
      curElemName = '列级容器';
      break;
    case 'ui-widget':
      curElemName = 'UI组件';
      break;
    case 'ui-materiel':
      curElemName = 'ui元件';
      break;
    case 'elem-slot':
      curElemName = '占位'; // 通用占位：可放置任何实体元素，包括其他类型的占位
      break;
    case 'embed-widget-slot':
      curElemName = '嵌套组件占位';
      break;
    // 兼容jdw搭建能力
    case 'widget':
      curElemName = 'jdw内容组件';
      break;
    case 'widget-slot':
      curElemName = '内容组件占位';
      break;
    case 'project':
      curElemName = '项目信息';
      break;
  }
  return curElemName;
}

/**
 * 判断当前元素是否是占位元素
 * 【备注】可视化组件编辑器有四种占位：
 * 通用占位（elem-slot），默认是通用占位；
 * jdw组件占位（widget-slot）；
 * jdw内嵌组件占位（embed-widget-slot）
 */
export function isSlotElem(uiElemType) {
  let isSlot = false; // 默认不是占位元素
  if (
    uiElemType === 'widget-slot' ||
    uiElemType === 'elem-slot' ||
    uiElemType === 'embed-widget-slot'
  ) {
    isSlot = true;
  }
  return isSlot;
}

/**
 * 判断当前元素是否是实体元素
 * 【备注】可视化组件编辑器有三种实体元素：
 * ui元件（ui-materiel）；
 * 标准化的UI组件（ui-widget）: 由可视化组件编辑器发布的组件；
 * jdw内容组件（widget）；
 */
export function isEntityElem(elemType) {
  let isEntity = false; // 默认不是实体元素
  if (
    elemType === 'ui-materiel' ||
    elemType === 'ui-widget' ||
    elemType === 'widget'
  ) {
    isEntity = true;
  }
  return isEntity;
}

/**
 * 根据指定位置从currentWidgetLayout获取指定对象数据
 */
export function getElemByActiveIndex(currentActiveIndex, currentWidgetLayout) {
  let currentElem = {};
  if (
    currentWidgetLayout &&
    currentWidgetLayout.length > 0 &&
    currentActiveIndex
  ) {
    const activeIndexArr = currentActiveIndex.split('-');
    if (activeIndexArr.length === 1) {
      // 说明选中的是widgetLayout的直接widget-container容器
      currentElem = currentWidgetLayout[activeIndexArr[0]];
    } else {
      currentElem = currentWidgetLayout[activeIndexArr[0]];
      for (let ind = 1, size = activeIndexArr.length; ind < size; ind++) {
        const currentIndexTemp = activeIndexArr[ind];
        if (
          currentElem &&
          currentElem.child &&
          currentElem.child[currentIndexTemp]
        ) {
          currentElem = currentElem.child[currentIndexTemp];
        }
      }
    }
  }
  return currentElem;
}

/**
 * 根据索引值从currentWidgetLayout获取配置字段的数值
 */
export function getPropValueByWidgetLayout(
  currentWidgetLayout,
  elemIndexRoute,
  propIndexRoute,
) {
  // 1. 先从widgetLayout中获取当前元素对象数据
  const curElem = getElemByActiveIndex(elemIndexRoute, currentWidgetLayout);
  // 2. 获取当前元素的SchemaData
  let curElemSchema = {};
  if (curElem.type === 'container') {
    // 块级容器元素
    if (curElem.elemName === '固定布局') {
      // 固定定位块级容器元素
      curElemSchema = BoxSchemaList['container'] || {};
    } else if (curElem.elemName === '绝对布局') {
      // 绝对定位块级容器元素
      curElemSchema = BoxSchemaList['container'] || {};
    } else {
      // 普通块级容器元素
      curElemSchema = BoxSchemaList['container'] || {};
    }
  } else if (curElem.type === 'row' || curElem.type === 'column') {
    // 行级和列级容器元素
    curElemSchema = BoxSchemaList[curElem.type] || {};
  } else if (curElem.type === 'ui-materiel') {
    // 基础物料（基础元件和功能元件）
    curElemSchema = AntdUISchema[`${curElem.name}Schema`] || {};
  }
  // 3. 获取当前元素的mockData
  let elemMockData = {};
  if (
    curElem.type === 'container' ||
    curElem.type === 'row' ||
    curElem.type === 'column'
  ) {
    // 容器元素
    elemMockData = {
      style: curElem.style || {},
    };
  } else if (curElem.type === 'ui-materiel') {
    // 元件
    elemMockData =
      curElem.data && curElem.data.mockData
        ? JSON.parse(curElem.data.mockData)
        : {};
  }
  // 4. 获取当前元素的propKeyRoute
  const propKeyRoute = indexRoute2keyRoute(propIndexRoute, curElemSchema);
  // 5. 根据propKeyRoute获取对应的配置数值
  const curPropValue = getJsonDataByKeyRoute(propKeyRoute, elemMockData);
  return curPropValue;
}

/**
 * 输入最新的widgetLayout和widgetSchema，输出最新的mockData。
 */
export function getMockDataByWidgetLayout(widgetSchema, currentWidgetLayout) {
  return widgetSchema2mockData(widgetSchema, currentWidgetLayout);
}
