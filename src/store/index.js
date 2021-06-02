import ElemSchemaStore from './ElemSchemaStore';
import WidgetSchemaStore from './WidgetSchemaStore';

const JSONStore = {
  elemSchemaStore: new ElemSchemaStore(),
  widgetSchemaStore: new WidgetSchemaStore(),
};

export default JSONStore;
