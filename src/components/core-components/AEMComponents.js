import {init} from './AEMComponentInitializer';

import { TitleV2, TitleV2IsEmptyFn } from "@adobe/aem-core-components-react-base";
import { TextV2, TextV2IsEmptyFn } from "@adobe/aem-core-components-react-base";
import { ListV2, ListV2IsEmptyFn } from "@adobe/aem-core-components-react-base";
import { SeparatorV1, SeparatorV1IsEmptyFn } from "@adobe/aem-core-components-react-base";
import { ImageV2, ImageV2IsEmptyFn } from "@adobe/aem-core-components-react-base";
import {
    TeaserV1, TeaserV1IsEmptyFn,
    ButtonV1, ButtonV1IsEmptyFn
} from "@adobe/aem-core-components-react-base";

export let AEMTitle = init("Title", "wknd-spa/components/title", TitleV2, TitleV2IsEmptyFn);
export let AEMText = init("Text", "wknd-spa/components/text", TextV2, TextV2IsEmptyFn);
export let AEMList = init("List", "wknd-spa/components/list", ListV2, ListV2IsEmptyFn);
export let AEMSeparator = init("Separator", "wknd-spa/components/separator", SeparatorV1, SeparatorV1IsEmptyFn);
export let AEMImage = init("Image", "wknd-spa/components/image", ImageV2, ImageV2IsEmptyFn);
export let AEMTeaser = init("Teaser", "wknd-spa/components/teaser", TeaserV1, TeaserV1IsEmptyFn);
export let AEMButton = init("Button", "wknd-spa/components/button", ButtonV1, ButtonV1IsEmptyFn);
