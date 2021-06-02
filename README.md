# widget-schema-editor

> WidgetSchema主要用于UI组件模型设置。

技术栈：React/Mobx/Ant Design

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
      jsonSchema: {},
    };
  }

  render() {
    const { jsonSchema } = this.state;
    return (
      <>
        <div className="json-action-container">
          <div className="json-schema-box">
             <WidgetSchemaEditor
                data={jsonSchema}
                onChange={(curWidgetSchemaData) => {
                  console.log(curWidgetSchemaData);
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
| `data`       | object   | {}      | 必填项，json schema（带结构的json数据）|
| `onChange`   | function | () => {}  | schemaData内容变动时会触发onChange |

