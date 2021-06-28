import * as React from 'react';
import ReactDOM from 'react-dom';
import { Switch } from 'antd';
import JSONEditor from '@wibetter/json-editor';
import WidgetSchemaEditor from './main';
// 引入组件内容数据
import { widgetLayout } from './demo/widgetLayout';
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
      widgetLayout: widgetLayout, // 用于组件配置的schema
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
