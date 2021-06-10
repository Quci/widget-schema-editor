# widget-schema-editor

> WidgetSchema主要用于UI组件模型设置。

技术栈：React/Mobx/Ant Design

在线Demo：
[点击访问在线Demo](https://widget-editor.github.io/widget-schema-editor/demo1/index.html)

## 安装

```bash
npm install --save @wibtter/widget-schema-editor
```

## 使用示例

```js
import * as React from 'react';
import WidgetSchemaEditor from '@wibetter/widget-schema-editor';
import '@wibetter/json-schema-editor/dist/index.css';

class IndexDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      widgetLayout: [],
      currentActiveIndex: '',
      widgetSchema: {},
      mockData: {},
    };
  }

  render() {
    const {
      widgetLayout,
      currentActiveIndex,
      widgetSchema,
      mockData,
    } = this.state;
    return (
      <>
        <div className="json-action-container">
          <div className="json-schema-box">
             <WidgetSchemaEditor
                currentWidgetLayout={widgetLayout}
                currentActiveIndex={currentActiveIndex}
                updateCurrentActiveIndex={(activeIndex) => {}}
                widgetSchema={widgetSchema}
                mockData={mockData}
                onChange={(newWidgetSchema) => {
                  console.log('schemaDataChange', newWidgetSchema);
                  this.setState({
                    widgetSchema: newWidgetSchema,
                  });
                }}
             />
          </div>
        </div>
      </>
    );
  }
}
```

## WidgetSchemaEditor 可配置参数说明

| name         | type     | default | desc                            |
| ------------ | -------- | ------- | ------------------------------- |
| `currentWidgetLayout`| object   | {}    | 必填项，当前组件内容数据（widgetLayout） |
| `currentActiveIndex`| object   | {}    | 必填项，当前组件楼层处于选中元素的索引路径值 |
| `updateCurrentActiveIndex`| function   | () => {}      | 必填项，currentActiveIndex更新的回调函数 |
| `widgetSchema`| object   | {}      | 非必填项，当前组件模型数据 |
| `mockData`| object   | {}      | 非必填项，当前组件配置数据 |
| `onChange`   | function | () => {}  | schemaData内容变动时会触发onChange |

