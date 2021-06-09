import { getCurrentFormat } from '@wibetter/json-utils';
import ObjectSchema from '$components/ObjectSchema/index';
import GeneralSchema from '$components/GeneralSchema/index';

/** 根据当前类型选择对应的组件进行渲染 */
const MappingRender = (props) => {
  const { targetJsonSchema } = props;
  const curType = getCurrentFormat(targetJsonSchema); // 获取当前元素类型（format）

  switch (curType) {
    case 'func':
    case 'style':
    case 'data':
    case 'widgets':
    case 'func-schema':
    case 'style-schema':
    case 'data-schema':
    case 'widgets-schema':
    case 'event-schema':
      return ObjectSchema(props);
      break;
    default:
      return GeneralSchema(props);
  }
};

export default MappingRender;
