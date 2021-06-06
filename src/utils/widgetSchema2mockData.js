/**
 * widgetSchema2mockData：根据widgetSchema从widgetLayout中获取对应的配置数据，生成mockData
 * 【方法参数说明】
 * widgetSchema: 组件模型数据
 * widgetLayout: 组件内容数据
 * */
import { AntdUISchema, BoxSchemaList } from '@wibetter/ui-schema-editor';
import {
  getJsonDataByKeyRoute,
  indexRoute2keyRoute,
} from '@wibetter/json-utils';
import { isArray } from '../utils';

/**
 * 根据指定位置从currentWidgetLayout获取指定元素数据对象
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
 * 获取元素的schema数据
 */
export function getElemSchemaByElemData(curElem) {
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
  return curElemSchema;
}

/**
 * 获取元素的mockData数据
 */
export function getMockDataByElemData(curElem) {
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
  return elemMockData;
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
  const curElemSchema = getElemSchemaByElemData(curElem);
  // 3. 获取当前元素的mockData
  const elemMockData = getMockDataByElemData(curElem);
  // 4. 获取当前元素的propKeyRoute
  const propKeyRoute = indexRoute2keyRoute(propIndexRoute, curElemSchema);
  // 5. 根据propKeyRoute获取对应的配置数值
  const curPropValue = getJsonDataByKeyRoute(propKeyRoute, elemMockData);
  return curPropValue;
}

/**
 * Object类型的schema转jsonData
 * */
function objectSchema2mockData(objectSchema, widgetLayout) {
  const curMockData = {};
  if (
    objectSchema &&
    objectSchema.propertyOrder &&
    isArray(objectSchema.propertyOrder)
  ) {
    // 遍历当前schema数据
    for (
      let propIndex = 0, size = objectSchema.propertyOrder.length;
      propIndex < size;
      propIndex++
    ) {
      const propKey = objectSchema.propertyOrder[propIndex];
      const propSchema = objectSchema.properties[propKey];
      const propIndexRoute = propSchema.propIndexRoute;
      const elemIndexRoute = propSchema.elemIndexRoute;
      const propValue = getPropValueByWidgetLayout(
        widgetLayout,
        elemIndexRoute,
        propIndexRoute,
      );
      curMockData[propKey] = propValue;
    }
  }
  return curMockData;
}

/**
 * 根据widgetSchema从widgetLayout中获取对应的配置数据，生成mockData
 * */
export function widgetSchema2mockData(widgetSchema, widgetLayout) {
  let curMockData = {};
  if (widgetSchema && widgetSchema.properties && widgetSchema.propertyOrder) {
    // 遍历当前schema数据
    for (
      let propIndex = 0, size = widgetSchema.propertyOrder.length;
      propIndex < size;
      propIndex++
    ) {
      const propKey = widgetSchema.propertyOrder[propIndex];
      const propSchema = widgetSchema.properties[propKey];
      curMockData[propKey] = objectSchema2mockData(propSchema, widgetLayout);
    }
  }
  return curMockData;
}
