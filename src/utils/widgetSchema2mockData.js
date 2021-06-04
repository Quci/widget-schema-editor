/**
 * widgetSchema2mockData：根据widgetSchema从widgetLayout中获取对应的配置数据，生成mockData
 * 【方法参数说明】
 * widgetSchema: 组件模型数据
 * widgetLayout: 组件内容数据
 * */
import { isArray, getPropValueByPropIndex } from '../utils';

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
      const propValue = getPropValueByPropIndex(
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
 * 遍历widgetSchema从widgetLayout中获取对应的配置数据，组装mockData
 * */
export function widgetSchema2mockData(widgetSchema, widgetLayout) {
  let curMockData = {};
  if (widgetSchema && widgetSchema.properties) {
    // 获取style相关配置数值
    if (widgetSchema.properties.style) {
      curMockData.style = objectSchema2mockData(
        widgetSchema.properties.style,
        widgetLayout,
      );
    }
    // 获取func相关配置数值
    if (widgetSchema.properties.func) {
      curMockData.func = objectSchema2mockData(
        widgetSchema.properties.func,
        widgetLayout,
      );
    }
    // 获取data相关配置数值
    if (widgetSchema.properties.data) {
      curMockData.data = objectSchema2mockData(
        widgetSchema.properties.data,
        widgetLayout,
      );
    }
  }
  return curMockData;
}
