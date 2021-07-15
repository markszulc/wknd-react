import { withMappable, MapTo } from '@adobe/aem-react-editable-components';

export function init (title, resourceType, component, emptyFn ) {

    const EditConfig = {
        emptyLabel: title,
        isEmpty: emptyFn,
        resourceType: resourceType
    };

    MapTo(resourceType)(component, EditConfig);

    return withMappable(component, EditConfig);
}
