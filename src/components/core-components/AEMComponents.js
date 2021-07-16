import {init} from './AEMComponentInitializer';

import { TitleV2, TitleV2IsEmptyFn } from "@adobe/aem-core-components-react-base";
import { TextV2, TextV2IsEmptyFn } from "@adobe/aem-core-components-react-base";
import { ListV2, ListV2IsEmptyFn } from "@adobe/aem-core-components-react-base";
import { SeparatorV1, SeparatorV1IsEmptyFn } from "@adobe/aem-core-components-react-base";
import { ImageV2, ImageV2IsEmptyFn } from "@adobe/aem-core-components-react-base";
import { ContainerV1, ContainerV1IsEmptyFn, TabsV1, TabsV1IsEmptyFn } from "@adobe/aem-core-components-react-spa"
import {
    TeaserV1, TeaserV1IsEmptyFn,
    ButtonV1, ButtonV1IsEmptyFn
} from "@adobe/aem-core-components-react-base";

import { ResponsiveGrid,  } from "@adobe/aem-react-editable-components";
import { AEMForm } from "../AEMForm";

export let AEMTitle = init("Title", "wknd/components/title", TitleV2, TitleV2IsEmptyFn);
export let AEMText = init("Text", "wknd/components/text", TextV2, TextV2IsEmptyFn);
export let AEMList = init("List", "wknd/components/list", ListV2, ListV2IsEmptyFn);
export let AEMSeparator = init("Separator", "wknd/components/separator", SeparatorV1, SeparatorV1IsEmptyFn);
export let AEMImage = init("Image", "wknd/components/image", ImageV2, ImageV2IsEmptyFn);
export let AEMTeaser = init("Teaser", "wknd/components/teaser", TeaserV1, TeaserV1IsEmptyFn);
export let AEMButton = init("Button", "wknd/components/button", ButtonV1, ButtonV1IsEmptyFn);
export let AEMTabs = init("Tabs", "wknd/components/tabs", TabsV1, TabsV1IsEmptyFn);
export let WKNDContainer = init("WKND Container", "wknd/components/container", ContainerV1, ContainerV1IsEmptyFn);
export let AEMFormComponent = init("AEM Form", "wknd/components/aemform/v1/aemform", AEMForm, function(props) {
    console.log(props)
    return !props || !props.formPath || props.formPath.trim().length < 1;
});
// export let AEMTitle = init("Title", "wknd-spa/components/title", TitleV2, TitleV2IsEmptyFn);
// export let AEMText = init("Text", "wknd-spa/components/text", TextV2, TextV2IsEmptyFn);
// export let AEMList = init("List", "wknd-spa/components/list", ListV2, ListV2IsEmptyFn);
// export let AEMSeparator = init("Separator", "wknd-spa/components/separator", SeparatorV1, SeparatorV1IsEmptyFn);
// export let AEMImage = init("Image", "wknd-spa/components/image", ImageV2, ImageV2IsEmptyFn);
// export let AEMTeaser = init("Teaser", "wknd-spa/components/teaser", TeaserV1, TeaserV1IsEmptyFn);
// export let AEMButton = init("Button", "wknd-spa/components/button", ButtonV1, ButtonV1IsEmptyFn);
// export let AEMTabs = init("Tabs", "wknd-spa/components/tabs", TabsV1, TabsV1IsEmptyFn);
// export let WKNDContainer = init("WKND Container", "wknd-spa/components/container", ContainerV1, ContainerV1IsEmptyFn);
// export let AEMFormComponent = init("AEM Form", "wknd-spa/components/aemform/v1/aemform", AEMForm, function(props) {
//     console.log(props)
//     return !props || !props.formPath || props.formPath.trim().length < 1;
// });
export let AEMContainer = init("Container", "wcm/foundation/components/responsivegrid", ResponsiveGrid, ContainerV1IsEmptyFn);
