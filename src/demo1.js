import * as React from 'react';
import ReactDOM from 'react-dom';
import { Switch } from 'antd';
import JSONEditor from '@wibetter/json-editor';
import WidgetSchemaEditor from './main';
import AceEditor from 'react-ace';
import { widgetSchema2mockData } from '$utils/index';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-solarized_light'; // ace-builds
import '@wibetter/json-editor/dist/index.css';
import './index.scss';

/**
 * WidgetSchemaEditor的测试Demo
 */
class IndexDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      widgetLayout: [
        {
          type: 'container',
          class: ['widget-container'],
          child: [
            {
              type: 'row',
              class: ['widget-row'],
              child: [
                {
                  type: 'column',
                  class: ['widget-column'],
                  child: [
                    {
                      type: 'ui-materiel',
                      class: ['ui-materiel'],
                      data: {
                        schema: {
                          type: 'object',
                          name: 'text',
                          title: '普通文本',
                          'ui-type': 'ui-materiel',
                          'ui-name': 'antd',
                          'ui-framework': 'react',
                          format: 'object',
                          properties: {
                            props: {
                              type: 'object',
                              format: 'func',
                              title: '属性设置',
                              readOnly: false,
                              properties: {
                                textCont: {
                                  type: 'string',
                                  title: '文本内容',
                                  format: 'textarea',
                                  default: '普通文本内容',
                                  description: '',
                                  placeholder: '',
                                  isRequired: false,
                                  readOnly: false,
                                },
                              },
                              required: ['textCont'],
                              propertyOrder: ['textCont'],
                            },
                            style: {
                              type: 'object',
                              format: 'style',
                              title: '样式设置',
                              readOnly: false,
                              properties: {
                                margin: {
                                  type: 'object',
                                  format: 'box-style',
                                  title: '外边距',
                                  isRequired: false,
                                  readOnly: false,
                                  properties: {
                                    unit: {
                                      type: 'string',
                                      title: '单位数值',
                                      format: 'string',
                                      default: '0',
                                      description: '',
                                      isRequired: false,
                                      readOnly: false,
                                    },
                                    quantity: {
                                      type: 'string',
                                      format: 'typeSelect',
                                      default: 'px',
                                      enum: ['px', 'rem', 'em', '%'],
                                      enumextra: ['px', 'rem', 'em', '%'],
                                      title: '单位类型',
                                      isRequired: false,
                                      readOnly: false,
                                    },
                                  },
                                  required: ['unit', 'quantity'],
                                  propertyOrder: ['unit', 'quantity'],
                                },
                                padding: {
                                  type: 'object',
                                  format: 'box-style',
                                  title: '内边距',
                                  isRequired: false,
                                  readOnly: false,
                                  properties: {
                                    unit: {
                                      type: 'string',
                                      title: '单位数值',
                                      format: 'string',
                                      default: '0',
                                      description: '',
                                      isRequired: false,
                                      readOnly: false,
                                    },
                                    quantity: {
                                      type: 'string',
                                      format: 'typeSelect',
                                      default: 'px',
                                      enum: ['px', 'rem', 'em', '%'],
                                      enumextra: ['px', 'rem', 'em', '%'],
                                      title: '单位类型',
                                      isRequired: false,
                                      readOnly: false,
                                    },
                                  },
                                  required: ['unit', 'quantity'],
                                  propertyOrder: ['unit', 'quantity'],
                                },
                                lineHeight: {
                                  type: 'object',
                                  format: 'quantity',
                                  title: '行高',
                                  isRequired: false,
                                  readOnly: false,
                                  properties: {
                                    unit: {
                                      type: 'number',
                                      title: '单位数值',
                                      format: 'number',
                                      default: 30,
                                      minimum: 0,
                                      maximum: 1000,
                                      description: '',
                                      isRequired: false,
                                      readOnly: false,
                                    },
                                    quantity: {
                                      type: 'string',
                                      format: 'typeSelect',
                                      default: 'px',
                                      enum: ['px', 'rem', 'em', '%'],
                                      enumextra: ['px', 'rem', 'em', '%'],
                                      title: '单位类型',
                                      isRequired: false,
                                      readOnly: false,
                                    },
                                  },
                                  required: ['unit', 'quantity'],
                                  propertyOrder: ['unit', 'quantity'],
                                },
                                height: {
                                  type: 'object',
                                  format: 'quantity',
                                  title: '高度',
                                  isRequired: false,
                                  readOnly: false,
                                  properties: {
                                    unit: {
                                      type: 'number',
                                      title: '单位数值',
                                      format: 'number',
                                      default: 50,
                                      minimum: 0,
                                      maximum: 1000,
                                      description: '',
                                      isRequired: false,
                                      readOnly: false,
                                    },
                                    quantity: {
                                      type: 'string',
                                      format: 'typeSelect',
                                      default: 'px',
                                      enum: ['px', 'rem', 'em', '%'],
                                      enumextra: ['px', 'rem', 'em', '%'],
                                      title: '单位类型',
                                      isRequired: false,
                                      readOnly: false,
                                    },
                                  },
                                  required: ['unit', 'quantity'],
                                  propertyOrder: ['unit', 'quantity'],
                                  hiddenRule: {
                                    conditionProp: {
                                      key: 'fixedHeight',
                                      keyRoute: 'style-fixedHeight',
                                      title: '定高',
                                      format: 'boolean',
                                      type: 'boolean',
                                    },
                                    conditionValue: false,
                                  },
                                },
                                width: {
                                  type: 'object',
                                  format: 'quantity',
                                  title: '宽度',
                                  isRequired: false,
                                  readOnly: false,
                                  properties: {
                                    unit: {
                                      type: 'number',
                                      title: '单位数值',
                                      format: 'number',
                                      default: 200,
                                      minimum: 0,
                                      maximum: 1000,
                                      description: '',
                                      isRequired: false,
                                      readOnly: false,
                                    },
                                    quantity: {
                                      type: 'string',
                                      format: 'typeSelect',
                                      default: 'px',
                                      enum: ['px', 'rem', 'em', '%'],
                                      enumextra: ['px', 'rem', 'em', '%'],
                                      title: '单位类型',
                                      isRequired: false,
                                      readOnly: false,
                                    },
                                  },
                                  required: ['unit', 'quantity'],
                                  propertyOrder: ['unit', 'quantity'],
                                  hiddenRule: {
                                    conditionProp: {
                                      key: 'fixedWidth',
                                      keyRoute: 'style-fixedWidth',
                                      title: '定宽',
                                      format: 'boolean',
                                      type: 'boolean',
                                    },
                                    conditionValue: false,
                                  },
                                },
                                fontSize: {
                                  type: 'object',
                                  format: 'quantity',
                                  title: '字体大小',
                                  isRequired: false,
                                  readOnly: false,
                                  properties: {
                                    unit: {
                                      type: 'number',
                                      title: '单位数值',
                                      format: 'number',
                                      default: 14,
                                      minimum: 0,
                                      maximum: 1000,
                                      description: '',
                                      isRequired: false,
                                      readOnly: false,
                                    },
                                    quantity: {
                                      type: 'string',
                                      format: 'typeSelect',
                                      default: 'px',
                                      enum: ['px', 'rem', 'em', '%'],
                                      enumextra: ['px', 'rem', 'em', '%'],
                                      title: '单位类型',
                                      isRequired: false,
                                      readOnly: false,
                                    },
                                  },
                                  required: ['unit', 'quantity'],
                                  propertyOrder: ['unit', 'quantity'],
                                },
                                fontWeight: {
                                  type: 'number',
                                  title: '字体粗细',
                                  format: 'number',
                                  default: 400,
                                  minimum: 0,
                                  maximum: '2000',
                                  description:
                                    '正常粗细与400等值； 加粗与700等值。',
                                  isRequired: false,
                                  readOnly: false,
                                },
                                textAlign: {
                                  type: 'string',
                                  title: '文本排列',
                                  format: 'radio',
                                  items: {
                                    type: 'string',
                                    enum: ['left', 'right', 'center'],
                                    enumextra: ['左', '右', '居中'],
                                  },
                                  description: '',
                                  isRequired: false,
                                  readOnly: false,
                                  default: 'left',
                                },
                                color: {
                                  type: 'string',
                                  title: '字体颜色',
                                  format: 'color',
                                  default: '#000000',
                                  description: '',
                                  isRequired: false,
                                  readOnly: false,
                                },
                                textIndent: {
                                  type: 'object',
                                  format: 'quantity',
                                  title: '缩进量',
                                  isRequired: false,
                                  readOnly: false,
                                  properties: {
                                    unit: {
                                      type: 'number',
                                      title: '单位数值',
                                      format: 'number',
                                      default: 0,
                                      minimum: 0,
                                      maximum: 1000,
                                      description: '',
                                      isRequired: false,
                                      readOnly: false,
                                    },
                                    quantity: {
                                      type: 'string',
                                      format: 'typeSelect',
                                      default: 'px',
                                      enum: ['px', 'rem', 'em', '%'],
                                      enumextra: ['px', 'rem', 'em', '%'],
                                      title: '单位类型',
                                      isRequired: false,
                                      readOnly: false,
                                    },
                                  },
                                  required: ['unit', 'quantity'],
                                  propertyOrder: ['unit', 'quantity'],
                                  description: '首行文本内容之前的缩进量',
                                },
                                fontFamily: {
                                  type: 'string',
                                  title: '字体',
                                  format: 'single-select',
                                  items: {
                                    type: 'string',
                                    enum: [
                                      'serif',
                                      'PingFangSC-Semibold',
                                      'PingFangSC-Regular',
                                      'PingFangSC-Medium',
                                      'sans-serif',
                                      'monospace',
                                      'cursive',
                                      'fantasy',
                                      'system-ui',
                                      'math',
                                      'emoji',
                                      'fangsong',
                                    ],
                                    enumextra: [
                                      'serif',
                                      'PingFangSC-Semibold',
                                      'PingFangSC-Regular',
                                      'PingFangSC-Medium',
                                      'sans-serif',
                                      'monospace',
                                      'cursive',
                                      'fantasy',
                                      'system-ui',
                                      'math',
                                      'emoji',
                                      'fangsong',
                                    ],
                                  },
                                  description:
                                    '参考：https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-family',
                                  isRequired: false,
                                  readOnly: false,
                                  default: 'serif',
                                },
                                fixedHeight: {
                                  type: 'boolean',
                                  title: '定高',
                                  format: 'boolean',
                                  default: false,
                                  description: '',
                                  isRequired: false,
                                  readOnly: false,
                                },
                                fixedWidth: {
                                  type: 'boolean',
                                  title: '定宽',
                                  format: 'boolean',
                                  default: false,
                                  description: '',
                                  isRequired: false,
                                  readOnly: false,
                                },
                              },
                              required: [
                                'margin',
                                'padding',
                                'lineHeight',
                                'height',
                                'width',
                                'fontSize',
                                'fontWeight',
                                'textAlign',
                                'color',
                                'textIndent',
                                'fontFamily',
                                'fixedHeight',
                                'fixedWidth',
                              ],
                              propertyOrder: [
                                'margin',
                                'padding',
                                'fixedHeight',
                                'height',
                                'fixedWidth',
                                'width',
                                'fontFamily',
                                'fontSize',
                                'fontWeight',
                                'textIndent',
                                'lineHeight',
                                'textAlign',
                                'color',
                              ],
                            },
                            data: {
                              type: 'object',
                              format: 'data',
                              title: '数据设置',
                              readOnly: false,
                              properties: {},
                              required: [],
                              propertyOrder: [],
                            },
                            event: {
                              type: 'object',
                              format: 'event-schema',
                              title: '事件设置',
                              isFixedSchema: true,
                              readOnly: false,
                              properties: {},
                              required: [],
                              propertyOrder: [],
                            },
                          },
                          required: ['props', 'style', 'data', 'event'],
                          propertyOrder: ['props', 'style', 'data', 'event'],
                          lastUpdateTime: '2021-04-29T07:53:18.352Z',
                          conditionProps: {
                            'style-fixedHeight': {
                              key: 'fixedHeight',
                              keyRoute: 'style-fixedHeight',
                              title: '定高',
                              format: 'boolean',
                              type: 'boolean',
                            },
                            'style-fixedWidth': {
                              key: 'fixedWidth',
                              keyRoute: 'style-fixedWidth',
                              title: '定宽',
                              format: 'boolean',
                              type: 'boolean',
                            },
                          },
                        },
                        mockData:
                          '{"props":{"textCont":"成功案例"},"style":{"margin":{"unit":"0px 0px 8px 0px","quantity":"px"},"padding":{"unit":"0","quantity":"px"},"fixedHeight":false,"height":{"unit":50,"quantity":"px"},"fixedWidth":false,"width":{"unit":200,"quantity":"px"},"fontFamily":"PingFangSC-Semibold","fontSize":{"unit":28,"quantity":"px"},"fontWeight":400,"textIndent":{"unit":0,"quantity":"px"},"lineHeight":{"unit":42,"quantity":"px"},"textAlign":"left","color":"#ffffff"},"data":{},"event":{}}',
                      },
                      name: 'text',
                      title: '普通文本',
                    },
                    {
                      type: 'ui-materiel',
                      class: ['ui-materiel'],
                      name: 'text',
                      title: '普通文本',
                      data: {
                        schema: {
                          type: 'object',
                          name: 'text',
                          title: '普通文本',
                          'ui-type': 'ui-materiel',
                          'ui-name': 'antd',
                          'ui-framework': 'react',
                          format: 'object',
                          properties: {
                            props: {
                              type: 'object',
                              format: 'func',
                              title: '属性设置',
                              readOnly: false,
                              properties: {
                                textCont: {
                                  type: 'string',
                                  title: '文本内容',
                                  format: 'textarea',
                                  default: '普通文本内容',
                                  description: '',
                                  placeholder: '',
                                  isRequired: false,
                                  readOnly: false,
                                },
                              },
                              required: ['textCont'],
                              propertyOrder: ['textCont'],
                            },
                            style: {
                              type: 'object',
                              format: 'style',
                              title: '样式设置',
                              readOnly: false,
                              properties: {
                                margin: {
                                  type: 'object',
                                  format: 'box-style',
                                  title: '外边距',
                                  isRequired: false,
                                  readOnly: false,
                                  properties: {
                                    unit: {
                                      type: 'string',
                                      title: '单位数值',
                                      format: 'string',
                                      default: '0',
                                      description: '',
                                      isRequired: false,
                                      readOnly: false,
                                    },
                                    quantity: {
                                      type: 'string',
                                      format: 'typeSelect',
                                      default: 'px',
                                      enum: ['px', 'rem', 'em', '%'],
                                      enumextra: ['px', 'rem', 'em', '%'],
                                      title: '单位类型',
                                      isRequired: false,
                                      readOnly: false,
                                    },
                                  },
                                  required: ['unit', 'quantity'],
                                  propertyOrder: ['unit', 'quantity'],
                                },
                                padding: {
                                  type: 'object',
                                  format: 'box-style',
                                  title: '内边距',
                                  isRequired: false,
                                  readOnly: false,
                                  properties: {
                                    unit: {
                                      type: 'string',
                                      title: '单位数值',
                                      format: 'string',
                                      default: '0',
                                      description: '',
                                      isRequired: false,
                                      readOnly: false,
                                    },
                                    quantity: {
                                      type: 'string',
                                      format: 'typeSelect',
                                      default: 'px',
                                      enum: ['px', 'rem', 'em', '%'],
                                      enumextra: ['px', 'rem', 'em', '%'],
                                      title: '单位类型',
                                      isRequired: false,
                                      readOnly: false,
                                    },
                                  },
                                  required: ['unit', 'quantity'],
                                  propertyOrder: ['unit', 'quantity'],
                                },
                                lineHeight: {
                                  type: 'object',
                                  format: 'quantity',
                                  title: '行高',
                                  isRequired: false,
                                  readOnly: false,
                                  properties: {
                                    unit: {
                                      type: 'number',
                                      title: '单位数值',
                                      format: 'number',
                                      default: 30,
                                      minimum: 0,
                                      maximum: 1000,
                                      description: '',
                                      isRequired: false,
                                      readOnly: false,
                                    },
                                    quantity: {
                                      type: 'string',
                                      format: 'typeSelect',
                                      default: 'px',
                                      enum: ['px', 'rem', 'em', '%'],
                                      enumextra: ['px', 'rem', 'em', '%'],
                                      title: '单位类型',
                                      isRequired: false,
                                      readOnly: false,
                                    },
                                  },
                                  required: ['unit', 'quantity'],
                                  propertyOrder: ['unit', 'quantity'],
                                },
                                height: {
                                  type: 'object',
                                  format: 'quantity',
                                  title: '高度',
                                  isRequired: false,
                                  readOnly: false,
                                  properties: {
                                    unit: {
                                      type: 'number',
                                      title: '单位数值',
                                      format: 'number',
                                      default: 50,
                                      minimum: 0,
                                      maximum: 1000,
                                      description: '',
                                      isRequired: false,
                                      readOnly: false,
                                    },
                                    quantity: {
                                      type: 'string',
                                      format: 'typeSelect',
                                      default: 'px',
                                      enum: ['px', 'rem', 'em', '%'],
                                      enumextra: ['px', 'rem', 'em', '%'],
                                      title: '单位类型',
                                      isRequired: false,
                                      readOnly: false,
                                    },
                                  },
                                  required: ['unit', 'quantity'],
                                  propertyOrder: ['unit', 'quantity'],
                                  hiddenRule: {
                                    conditionProp: {
                                      key: 'fixedHeight',
                                      keyRoute: 'style-fixedHeight',
                                      title: '定高',
                                      format: 'boolean',
                                      type: 'boolean',
                                    },
                                    conditionValue: false,
                                  },
                                },
                                width: {
                                  type: 'object',
                                  format: 'quantity',
                                  title: '宽度',
                                  isRequired: false,
                                  readOnly: false,
                                  properties: {
                                    unit: {
                                      type: 'number',
                                      title: '单位数值',
                                      format: 'number',
                                      default: 200,
                                      minimum: 0,
                                      maximum: 1000,
                                      description: '',
                                      isRequired: false,
                                      readOnly: false,
                                    },
                                    quantity: {
                                      type: 'string',
                                      format: 'typeSelect',
                                      default: 'px',
                                      enum: ['px', 'rem', 'em', '%'],
                                      enumextra: ['px', 'rem', 'em', '%'],
                                      title: '单位类型',
                                      isRequired: false,
                                      readOnly: false,
                                    },
                                  },
                                  required: ['unit', 'quantity'],
                                  propertyOrder: ['unit', 'quantity'],
                                  hiddenRule: {
                                    conditionProp: {
                                      key: 'fixedWidth',
                                      keyRoute: 'style-fixedWidth',
                                      title: '定宽',
                                      format: 'boolean',
                                      type: 'boolean',
                                    },
                                    conditionValue: false,
                                  },
                                },
                                fontSize: {
                                  type: 'object',
                                  format: 'quantity',
                                  title: '字体大小',
                                  isRequired: false,
                                  readOnly: false,
                                  properties: {
                                    unit: {
                                      type: 'number',
                                      title: '单位数值',
                                      format: 'number',
                                      default: 14,
                                      minimum: 0,
                                      maximum: 1000,
                                      description: '',
                                      isRequired: false,
                                      readOnly: false,
                                    },
                                    quantity: {
                                      type: 'string',
                                      format: 'typeSelect',
                                      default: 'px',
                                      enum: ['px', 'rem', 'em', '%'],
                                      enumextra: ['px', 'rem', 'em', '%'],
                                      title: '单位类型',
                                      isRequired: false,
                                      readOnly: false,
                                    },
                                  },
                                  required: ['unit', 'quantity'],
                                  propertyOrder: ['unit', 'quantity'],
                                },
                                fontWeight: {
                                  type: 'number',
                                  title: '字体粗细',
                                  format: 'number',
                                  default: 400,
                                  minimum: 0,
                                  maximum: '2000',
                                  description:
                                    '正常粗细与400等值； 加粗与700等值。',
                                  isRequired: false,
                                  readOnly: false,
                                },
                                textAlign: {
                                  type: 'string',
                                  title: '文本排列',
                                  format: 'radio',
                                  items: {
                                    type: 'string',
                                    enum: ['left', 'right', 'center'],
                                    enumextra: ['左', '右', '居中'],
                                  },
                                  description: '',
                                  isRequired: false,
                                  readOnly: false,
                                  default: 'left',
                                },
                                color: {
                                  type: 'string',
                                  title: '字体颜色',
                                  format: 'color',
                                  default: '#000000',
                                  description: '',
                                  isRequired: false,
                                  readOnly: false,
                                },
                                textIndent: {
                                  type: 'object',
                                  format: 'quantity',
                                  title: '缩进量',
                                  isRequired: false,
                                  readOnly: false,
                                  properties: {
                                    unit: {
                                      type: 'number',
                                      title: '单位数值',
                                      format: 'number',
                                      default: 0,
                                      minimum: 0,
                                      maximum: 1000,
                                      description: '',
                                      isRequired: false,
                                      readOnly: false,
                                    },
                                    quantity: {
                                      type: 'string',
                                      format: 'typeSelect',
                                      default: 'px',
                                      enum: ['px', 'rem', 'em', '%'],
                                      enumextra: ['px', 'rem', 'em', '%'],
                                      title: '单位类型',
                                      isRequired: false,
                                      readOnly: false,
                                    },
                                  },
                                  required: ['unit', 'quantity'],
                                  propertyOrder: ['unit', 'quantity'],
                                  description: '首行文本内容之前的缩进量',
                                },
                                fontFamily: {
                                  type: 'string',
                                  title: '字体',
                                  format: 'single-select',
                                  items: {
                                    type: 'string',
                                    enum: [
                                      'serif',
                                      'PingFangSC-Semibold',
                                      'PingFangSC-Regular',
                                      'PingFangSC-Medium',
                                      'sans-serif',
                                      'monospace',
                                      'cursive',
                                      'fantasy',
                                      'system-ui',
                                      'math',
                                      'emoji',
                                      'fangsong',
                                    ],
                                    enumextra: [
                                      'serif',
                                      'PingFangSC-Semibold',
                                      'PingFangSC-Regular',
                                      'PingFangSC-Medium',
                                      'sans-serif',
                                      'monospace',
                                      'cursive',
                                      'fantasy',
                                      'system-ui',
                                      'math',
                                      'emoji',
                                      'fangsong',
                                    ],
                                  },
                                  description:
                                    '参考：https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-family',
                                  isRequired: false,
                                  readOnly: false,
                                  default: 'serif',
                                },
                                fixedHeight: {
                                  type: 'boolean',
                                  title: '定高',
                                  format: 'boolean',
                                  default: false,
                                  description: '',
                                  isRequired: false,
                                  readOnly: false,
                                },
                                fixedWidth: {
                                  type: 'boolean',
                                  title: '定宽',
                                  format: 'boolean',
                                  default: false,
                                  description: '',
                                  isRequired: false,
                                  readOnly: false,
                                },
                              },
                              required: [
                                'margin',
                                'padding',
                                'lineHeight',
                                'height',
                                'width',
                                'fontSize',
                                'fontWeight',
                                'textAlign',
                                'color',
                                'textIndent',
                                'fontFamily',
                                'fixedHeight',
                                'fixedWidth',
                              ],
                              propertyOrder: [
                                'margin',
                                'padding',
                                'fixedHeight',
                                'height',
                                'fixedWidth',
                                'width',
                                'fontFamily',
                                'fontSize',
                                'fontWeight',
                                'textIndent',
                                'lineHeight',
                                'textAlign',
                                'color',
                              ],
                            },
                            data: {
                              type: 'object',
                              format: 'data',
                              title: '数据设置',
                              readOnly: false,
                              properties: {},
                              required: [],
                              propertyOrder: [],
                            },
                            event: {
                              type: 'object',
                              format: 'event-schema',
                              title: '事件设置',
                              isFixedSchema: true,
                              readOnly: false,
                              properties: {},
                              required: [],
                              propertyOrder: [],
                            },
                          },
                          required: ['props', 'style', 'data', 'event'],
                          propertyOrder: ['props', 'style', 'data', 'event'],
                          lastUpdateTime: '2021-04-29T07:53:18.352Z',
                          conditionProps: {
                            'style-fixedHeight': {
                              key: 'fixedHeight',
                              keyRoute: 'style-fixedHeight',
                              title: '定高',
                              format: 'boolean',
                              type: 'boolean',
                            },
                            'style-fixedWidth': {
                              key: 'fixedWidth',
                              keyRoute: 'style-fixedWidth',
                              title: '定宽',
                              format: 'boolean',
                              type: 'boolean',
                            },
                          },
                        },
                        mockData:
                          '{"props":{"textCont":"沉淀多年的京东技术能力，助力合作伙伴搭建商业生态"},"style":{"margin":{"unit":"0px 0px 42px 0px","quantity":"px"},"padding":{"unit":"0","quantity":"px"},"fixedHeight":false,"height":{"unit":50,"quantity":"px"},"fixedWidth":false,"width":{"unit":200,"quantity":"px"},"fontFamily":"PingFangSC-Regular","fontSize":{"unit":18,"quantity":"px"},"fontWeight":400,"textIndent":{"unit":0,"quantity":"px"},"lineHeight":{"unit":28,"quantity":"px"},"textAlign":"left","color":"#f8f6f6"},"data":{},"event":{}}',
                      },
                    },
                    {
                      type: 'ui-materiel',
                      class: ['ui-materiel'],
                      name: 'imgCarousel',
                      title: 'imgCarousel 图片轮播',
                      data: {
                        schema: {
                          type: 'object',
                          name: 'imgCarousel',
                          title: 'imgCarousel 图片轮播',
                          'ui-type': 'ui-materiel',
                          'ui-name': 'antd',
                          'ui-framework': 'react',
                          format: 'object',
                          properties: {
                            props: {
                              type: 'object',
                              format: 'func',
                              title: '属性设置',
                              readOnly: false,
                              properties: {
                                autoplay: {
                                  type: 'boolean',
                                  title: '自动切换',
                                  format: 'boolean',
                                  default: true,
                                  description: '',
                                  isRequired: false,
                                  readOnly: false,
                                },
                                dotPosition: {
                                  type: 'string',
                                  title: '指示点位置',
                                  format: 'radio',
                                  items: {
                                    type: 'string',
                                    enum: ['top', 'bottom', 'left', 'right'],
                                    enumextra: [
                                      'top',
                                      'bottom',
                                      'left',
                                      'right',
                                    ],
                                  },
                                  description: '面板指示点位置',
                                  isRequired: false,
                                  readOnly: false,
                                  default: 'bottom',
                                },
                                dots: {
                                  type: 'boolean',
                                  title: '显示指示点',
                                  format: 'boolean',
                                  default: true,
                                  description: '是否显示面板指示点',
                                  isRequired: false,
                                  readOnly: false,
                                },
                                easing: {
                                  type: 'string',
                                  title: '动画效果',
                                  format: 'input',
                                  default: 'linear',
                                  description: '',
                                  placeholder: '',
                                  isRequired: false,
                                  readOnly: false,
                                },
                              },
                              required: [
                                'autoplay',
                                'dotPosition',
                                'dots',
                                'easing',
                              ],
                              propertyOrder: [
                                'autoplay',
                                'dotPosition',
                                'dots',
                                'easing',
                              ],
                            },
                            style: {
                              type: 'object',
                              format: 'style',
                              title: '样式设置',
                              readOnly: false,
                              properties: {
                                height: {
                                  type: 'object',
                                  format: 'quantity',
                                  title: '轮播图高度',
                                  isRequired: false,
                                  readOnly: false,
                                  properties: {
                                    unit: {
                                      type: 'number',
                                      title: '单位数值',
                                      format: 'number',
                                      default: 250,
                                      minimum: 0,
                                      maximum: 1000,
                                      description: '',
                                      isRequired: false,
                                      readOnly: false,
                                    },
                                    quantity: {
                                      type: 'string',
                                      format: 'typeSelect',
                                      default: 'px',
                                      enum: ['px', 'rem', 'em', '%'],
                                      enumextra: ['px', 'rem', 'em', '%'],
                                      title: '单位类型',
                                      isRequired: false,
                                      readOnly: false,
                                    },
                                  },
                                  required: ['unit', 'quantity'],
                                  propertyOrder: ['unit', 'quantity'],
                                },
                                width: {
                                  type: 'object',
                                  format: 'quantity',
                                  title: '轮播图宽度',
                                  isRequired: false,
                                  readOnly: false,
                                  properties: {
                                    unit: {
                                      type: 'number',
                                      title: '单位数值',
                                      format: 'number',
                                      default: 300,
                                      minimum: 0,
                                      maximum: 1000,
                                      description: '',
                                      isRequired: false,
                                      readOnly: false,
                                    },
                                    quantity: {
                                      type: 'string',
                                      format: 'typeSelect',
                                      default: 'px',
                                      enum: ['px', 'rem', 'em', '%'],
                                      enumextra: ['px', 'rem', 'em', '%'],
                                      title: '单位类型',
                                      isRequired: false,
                                      readOnly: false,
                                    },
                                  },
                                  required: ['unit', 'quantity'],
                                  propertyOrder: ['unit', 'quantity'],
                                },
                                padding: {
                                  type: 'object',
                                  format: 'box-style',
                                  title: '内边距',
                                  isRequired: false,
                                  readOnly: false,
                                  properties: {
                                    unit: {
                                      type: 'string',
                                      title: '单位数值',
                                      format: 'string',
                                      default: '0',
                                      description: '',
                                      isRequired: false,
                                      readOnly: false,
                                    },
                                    quantity: {
                                      type: 'string',
                                      format: 'typeSelect',
                                      default: 'px',
                                      enum: ['px', 'rem', 'em', '%'],
                                      enumextra: ['px', 'rem', 'em', '%'],
                                      title: '单位类型',
                                      isRequired: false,
                                      readOnly: false,
                                    },
                                  },
                                  required: ['unit', 'quantity'],
                                  propertyOrder: ['unit', 'quantity'],
                                },
                              },
                              required: ['height', 'width', 'padding'],
                              propertyOrder: ['padding', 'width', 'height'],
                            },
                            data: {
                              type: 'object',
                              format: 'data',
                              title: '数据设置',
                              readOnly: false,
                              properties: {
                                imgList: {
                                  type: 'array',
                                  format: 'array',
                                  title: '图片列表',
                                  description: '面包屑数据内容',
                                  isRequired: false,
                                  readOnly: false,
                                  items: {
                                    type: 'object',
                                    format: 'object',
                                    title: '数组项',
                                    description: '',
                                    isRequired: false,
                                    readOnly: false,
                                    properties: {
                                      src: {
                                        type: 'string',
                                        title: '图片地址',
                                        format: 'url',
                                        default:
                                          'https://storage.360buyimg.com/jdw-web/1.53.0/img/our-bg-4.444d763d.png',
                                        description: '',
                                        placeholder: '',
                                        isRequired: false,
                                        readOnly: false,
                                      },
                                    },
                                    required: ['src'],
                                    propertyOrder: ['src'],
                                  },
                                  'minimum-child': 2,
                                },
                              },
                              required: ['imgList'],
                              propertyOrder: ['imgList'],
                            },
                            event: {
                              type: 'object',
                              format: 'event-schema',
                              title: '事件设置',
                              isFixedSchema: true,
                              readOnly: false,
                              properties: {},
                              required: [],
                              propertyOrder: [],
                            },
                          },
                          required: ['props', 'style', 'data', 'event'],
                          propertyOrder: ['props', 'style', 'data', 'event'],
                          lastUpdateTime: '2021-05-09T03:19:01.583Z',
                        },
                        mockData:
                          '{"props":{"autoplay":true,"dotPosition":"bottom","dots":true,"easing":"linear"},"style":{"padding":{"unit":"8px 8px 30px 8px","quantity":"px"},"width":{"unit":1024,"quantity":"px"},"height":{"unit":700,"quantity":"px"}},"data":{"imgList":[{"src":"https://storage.360buyimg.com/jdw-oss-prod-image-space/84e20dab-973e-4384-b1f8-a3466b9f3533.png"},{"src":"https://storage.360buyimg.com/jdw-oss-prod-image-space/a7c4563f-358d-4ddd-984d-0a47630e3e45.png"},{"src":"https://storage.360buyimg.com/jdw-oss-prod-image-space/22224243-b787-4fba-8ecd-87854b415c8c.png"}]},"event":{}}',
                      },
                    },
                  ],
                  style: {
                    margin: {
                      unit: '0px auto 0px auto',
                      quantity: 'px',
                    },
                    padding: {
                      unit: '66px 0px 50px 0px',
                      quantity: 'px',
                    },
                    flex: '1 1 auto',
                    flexBasis: {
                      unit: 1024,
                      quantity: 'px',
                    },
                    fixedHeight: false,
                    height: {
                      unit: 200,
                      quantity: 'px',
                    },
                    backgroundColor: 'initial',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    hasBorder: false,
                    borderStyle: 'solid',
                    borderWidth: {
                      unit: '1',
                      quantity: 'px',
                    },
                    borderColor: '#878787',
                    borderRadius: {
                      unit: '0',
                      quantity: 'px',
                    },
                    hasBoxShadow: false,
                    hShadow: {
                      unit: 5,
                      quantity: 'px',
                    },
                    vShadow: {
                      unit: 5,
                      quantity: 'px',
                    },
                    shadowBlur: {
                      unit: 5,
                      quantity: 'px',
                    },
                    shadowSpread: {
                      unit: 5,
                      quantity: 'px',
                    },
                    shadowColor: '#949494',
                    hasBackgroundImage: true,
                    backgroundImage:
                      '//img12.360buyimg.com/imagetools/s1440x720_jfs/t1/147390/18/9643/1002420/5f71bdaeE8cfba326/361a8db48ebf1831.png!q80',
                    backgroundRepeatX: 'no-repeat',
                    backgroundRepeatY: 'no-repeat',
                    backgroundOrigin: 'padding-box',
                    backgroundSize: 'cover',
                  },
                  elemName: '',
                  elemId: '',
                  elemVisible: true,
                },
              ],
              style: {
                margin: {
                  unit: '0',
                  quantity: 'px',
                },
                padding: {
                  unit: '0px 0px 0px 0px',
                  quantity: 'px',
                },
                fixedWidth: false,
                width: {
                  unit: 300,
                  quantity: 'px',
                },
                fixedHeight: false,
                height: {
                  unit: 200,
                  quantity: 'px',
                },
                flexWrap: 'nowrap',
                justifyContent: 'flex-start',
                backgroundColor: 'initial',
                hasBorder: false,
                borderStyle: 'solid',
                borderWidth: {
                  unit: '1',
                  quantity: 'px',
                },
                borderColor: '#878787',
                hasBoxShadow: false,
                hShadow: {
                  unit: 5,
                  quantity: 'px',
                },
                vShadow: {
                  unit: 5,
                  quantity: 'px',
                },
                shadowBlur: {
                  unit: 5,
                  quantity: 'px',
                },
                shadowSpread: {
                  unit: 5,
                  quantity: 'px',
                },
                shadowColor: '#949494',
                borderRadius: {
                  unit: '0',
                  quantity: 'px',
                },
                hasBackgroundImage: false,
                backgroundImage:
                  'https://storage.360buyimg.com/imgtools/42a6a16744-36f9a5f0-c7da-11ea-bc83-0146fbd6f0f1.png',
                backgroundRepeatX: 'no-repeat',
                backgroundRepeatY: 'no-repeat',
                backgroundOrigin: 'padding-box',
                backgroundSize: 'cover',
              },
              elemName: '',
              elemId: '',
              elemVisible: true,
            },
          ],
        },
      ], // 用于组件配置的schema
      currentActiveIndex: '',
      widgetSchema: {},
      mockData: {},
      dynamicDataList: [
        {
          id: 3,
          projectId: 97,
          type: '1',
          title: '获取项目数据源接口列表',
          name: 'getProjectDataSource',
          desc: '获取项目数据源接口列表数组',
          url: 'http://dev.jd.com:4000/project_datasource',
          method: 'GET',
          headers:
            '{"user-agent":"UA/chrome","content-type":"application/json"}',
          options:
            '{"cache":"no-cache","credentials":"*","mode":"cors","redirect":"follow"}',
          reqParams:
            '{"param1":{"title":"参数名称","scope":"static","value":"111"},"param2":{"title":"参数名称","scope":"window","name":"PARAM1","value":"111"},"pageId":{"title":"页面id","scope":"hash","name":"pId","value":"111"}}',
          dynamicParams:
            '{"param5":{"title":"参数名称","scope":"url","name":"pageId","value":"111"},"param7":{"title":"参数名称","scope":"dynamic","dataName":"api3","body":{"param2":{"title":"参数名称","scope":"static","value":"222"},"param3":{"title":"参数名称","scope":"static","value":"333"}}}}',
          respMock:
            '{"code":0,"data":[{"id":3,"projectId":89,"type":"1","title":"获取项目数据源","name":"getProjectDataSource","desc":"获取项目数据源","url":"http://dev.jd.com:4000/project_datasource","method":"GET","headers":"{\\"user-agent\\":\\"chrome\\",\\"content-type\\":\\"application/json\\"}","options":"{\\"cache\\":\\"no-cache\\",\\"credentials\\":\\"same-origin\\",\\"mode\\":\\"cors\\",\\"redirect\\":\\"follow\\"}","reqParams":"{\\"param1\\":{\\"title\\":\\"参数名称\\",\\"scope\\":\\"static\\",\\"value\\":\\"111\\"},\\"param2\\":{\\"title\\":\\"参数名称\\",\\"scope\\":\\"window\\",\\"name\\":\\"PARAM1\\",\\"value\\":\\"111\\"},\\"pageId\\":{\\"title\\":\\"页面id\\",\\"scope\\":\\"hash\\",\\"name\\":\\"pId\\",\\"value\\":\\"111\\"}}","dynamicParams":"{\\"param5\\":{\\"title\\":\\"参数名称\\",\\"scope\\":\\"url\\",\\"name\\":\\"pageId\\",\\"value\\":\\"111\\"},\\"param7\\":{\\"title\\":\\"参数名称\\",\\"scope\\":\\"dynamic\\",\\"dataName\\":\\"api3\\",\\"body\\":{\\"param2\\":{\\"title\\":\\"参数名称\\",\\"scope\\":\\"static\\",\\"value\\":\\"222\\"},\\"param3\\":{\\"title\\":\\"参数名称\\",\\"scope\\":\\"static\\",\\"value\\":\\"333\\"}}}}","respMock":"{}","creatorId":2,"createdAt":"2020-08-20T03:09:29.000Z","updatedAt":"2020-08-20T03:09:29.000Z","deletedAt":null,"creator":{"id":2,"erp":"wangjianhui16"},"dataName":"getProjectDataSource","body":{"param1":{"title":"参数名称","scope":"static","value":"111"},"param2":{"title":"参数名称","scope":"window","name":"PARAM1","value":"111"},"pageId":{"title":"页面id","scope":"hash","name":"pId","value":"111"},"param5":{"title":"参数名称","scope":"url","name":"pageId","value":"111"},"param7":{"title":"参数名称","scope":"dynamic","dataName":"api3","body":{"param2":{"title":"参数名称","scope":"static","value":"222"},"param3":{"title":"参数名称","scope":"static","value":"333"}}}}}]}',
          creatorId: 2,
          createdAt: '2020-08-20T03:09:29.000Z',
          updatedAt: '2020-08-20T12:40:19.000Z',
          deletedAt: null,
          creator: {
            id: 2,
            erp: 'wangjianhui16',
          },
          dataName: 'getProjectDataSource',
          body: '{"param1":{"title":"参数名称","scope":"static","value":"111"},"param2":{"title":"参数名称","scope":"window","name":"PARAM1","value":"111"},"pageId":{"title":"页面id","scope":"hash","name":"pId","value":"111"},"param5":{"title":"参数名称","scope":"url","name":"pageId","value":"111"},"param7":{"title":"参数名称","scope":"dynamic","dataName":"api3","body":{"param2":{"title":"参数名称","scope":"static","value":"222"},"param3":{"title":"参数名称","scope":"static","value":"333"}}}}',
        },
        {
          id: 4,
          projectId: 97,
          type: '1',
          title: 'getAttr2',
          name: 'getAttr2',
          desc: 'getAttr2',
          url: 'http://getAttr2',
          method: 'POST',
          headers: null,
          options: null,
          reqParams: null,
          dynamicParams:
            '{\n          "param1": {\n            "title": "参数名称",\n            "scope": "static",\n            "value": "111"\n          },\n          "param2": {\n            "title": "参数名称",\n            "scope": "window",\n            "name": "PARAM1",\n            "value": "111"\n          },\n          "pageId": {\n            "title": "页面id",\n            "scope": "hash",\n            "name": "pId",\n            "value": "111"\n          }\n        }\n',
          respMock: null,
          creatorId: 2,
          createdAt: '2020-08-20T14:54:17.000Z',
          updatedAt: '2020-08-20T14:54:17.000Z',
          deletedAt: null,
          creator: {
            id: 2,
            erp: 'wangjianhui16',
          },
          dataName: 'getAttr2',
          body: '{"param1":{"title":"参数名称","scope":"static","value":"111"},"param2":{"title":"参数名称","scope":"window","name":"PARAM1","value":"111"},"pageId":{"title":"页面id","scope":"hash","name":"pId","value":"111"}}',
        },
      ],
      wideScreen: false,
      jsonView: false,
      schemaCodeView: false, // schema源码模式
      viewStyle: 'tabs', // 默认折叠模式
    };
  }

  /* 楼层导航选择事件 */
  updateCurrentActiveIndex = (activeIndex) => {
    this.setState({
      currentActiveIndex: activeIndex,
    });
  };

  render() {
    const {
      widgetLayout,
      currentActiveIndex,
      widgetSchema,
      mockData,
      dynamicDataList,
      wideScreen,
      schemaCodeView,
      jsonView,
      viewStyle,
    } = this.state;

    return (
      <>
        <div className="title-container">
          <div className="title1-box">
            <p>
              <b className="title-name">WidgetSchemaEditor</b>: UI组件模型设置，
            </p>
            <div>
              <b>自定义展示</b>: &nbsp;&nbsp;
              <Switch
                style={{ display: 'inline-block' }}
                defaultChecked={schemaCodeView}
                checkedChildren="code"
                unCheckedChildren="view"
                onChange={(checked) => {
                  this.setState({
                    schemaCodeView: checked,
                  });
                }}
              />
            </div>
          </div>
          <div className={`title2-box ${!wideScreen ? 'mobile-view' : ''}`}>
            <p>
              <b className="title-name">JSONEditor</b>: 当前组件配置面板
            </p>
            <div>
              <b>自定义展示</b>: &nbsp;&nbsp;
              <Switch
                style={{ display: 'inline-block' }}
                defaultChecked={wideScreen}
                checkedChildren="大屏"
                unCheckedChildren="小屏"
                onChange={(checked) => {
                  this.setState({
                    wideScreen: checked,
                  });
                }}
              />
              &nbsp;&nbsp;
              <Switch
                style={{ display: 'inline-block' }}
                defaultChecked={viewStyle === 'tabs' ? true : false}
                checkedChildren="tabs"
                unCheckedChildren="fold"
                onChange={(checked) => {
                  this.setState({
                    viewStyle: checked ? 'tabs' : 'fold',
                  });
                }}
              />
              &nbsp;&nbsp;
              <Switch
                style={{ display: 'inline-block' }}
                defaultChecked={jsonView}
                checkedChildren="code"
                unCheckedChildren="view"
                onChange={(checked) => {
                  this.setState({
                    jsonView: checked,
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div className="json-action-container">
          <div className="json-schema-box">
            {!schemaCodeView && (
              <WidgetSchemaEditor
                currentWidgetLayout={widgetLayout}
                currentActiveIndex={currentActiveIndex}
                updateCurrentActiveIndex={this.updateCurrentActiveIndex}
                widgetSchema={widgetSchema}
                mockData={mockData}
                onChange={(newWidgetSchema) => {
                  console.log('schemaDataChange', newWidgetSchema);
                  this.setState({
                    widgetSchema: newWidgetSchema,
                  });
                  console.log('从widgetLayout中自动获取mockData：');
                  const newMockData = widgetSchema2mockData(
                    newWidgetSchema,
                    widgetLayout,
                  );
                  console.log(newMockData);
                }}
              />
            )}
            {schemaCodeView && (
              <AceEditor
                id="json_area_ace"
                value={JSON.stringify(widgetLayout, null, 2)}
                className="json-view-ace"
                mode="json"
                theme="solarized_light"
                name="JSON_CODE_EDIT"
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                readOnly={false}
                minLines={5}
                maxLines={33}
                width={'100%'}
                setOptions={{
                  useWorker: false,
                  showLineNumbers: true,
                  tabSize: 2,
                }}
              />
            )}
          </div>
          <div
            className={`json-editor-box ${!wideScreen ? 'mobile-view' : ''}`}
          >
            <JSONEditor
              viewStyle={viewStyle}
              jsonView={jsonView} // code模式
              wideScreen={wideScreen} // 宽屏和小屏的配置项
              schemaData={widgetSchema}
              jsonData={mockData}
              dynamicDataList={dynamicDataList}
              onChange={(newJsonData) => {
                console.log('jsonDataChange', newJsonData);
                this.setState({
                  mockData: newJsonData,
                });
              }}
            />
          </div>
        </div>
      </>
    );
  }
}

ReactDOM.render(
  <div>
    <h1 className="demoTitle">组件模型设置（添加配置项）Demo</h1>

    <br />

    <IndexDemo />
  </div>,
  document.getElementById('root'),
);
