import * as t from 'io-ts';

const ImageObjComp = t.type({
    source: t.string,
})

const ImageObjPartial = t.partial({
    url: t.string,
    photo_reference: t.string,
    html_attributions: t.array(t.string),
    height: t.number,
    width: t.number,
});

export const ImageObj = t.intersection([ImageObjComp, ImageObjPartial]);

export interface ImageInterface {
    source: string,
    url?: string,
    photo_reference?: string,
    html_attributions?: string[],
    height?: number,
    width?: number,
}