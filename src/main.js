import * as React from 'react';
import { Provider } from 'mobx-react';
import PropTypes from 'prop-types';
import JSONStore from '$store/index';
import UIWidgetSchema from '$components/UIWidgetSchema';
// 输出方法widgetSchema2mockData：生成mockData
export { widgetSchema2mockData } from '$utils/index';

/**
 * WidgetSchemaEditor功能组件
 * @param props
 * @constructor
 */
export default class WidgetSchemaEditor extends React.PureComponent {
  static propTypes = {
    currentWidgetLayout: PropTypes.any,
    currentActiveIndex: PropTypes.string,
    updateCurrentActiveIndex: PropTypes.func,
    widgetSchema: PropTypes.object,
    mockData: PropTypes.object,
    onChange: PropTypes.func,
  };

  render() {
    const renderContent = (
      <Provider
        widgetSchemaStore={JSONStore.widgetSchemaStore}
        elemSchemaStore={JSONStore.elemSchemaStore}
      >
        <UIWidgetSchema {...this.props} />
      </Provider>
    );
    return renderContent; // 直接输出dom元素
  }
}
