/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, Button } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
  const { title, text, image, showTitle, showText, showImage } = attributes;

  const toggleAttribute = (attributeName) => setAttributes({ [attributeName]: !attributes[attributeName] });

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Ustawienia bloku', 'about-us')}>
          <ToggleControl checked={!!showTitle} label={__('Włącz tytuł', 'about-us')} onChange={() => toggleAttribute('showTitle')} />
          <ToggleControl checked={!!showText} label={__('Włącz opis', 'about-us')} onChange={() => toggleAttribute('showText')} />
          <ToggleControl checked={!!showImage} label={__('Włącz obrazek', 'about-us')} onChange={() => toggleAttribute('showImage')} />
        </PanelBody>
      </InspectorControls>

      <section {...useBlockProps({ className: 'about-us-block' })}>
        <div class="wrapper">
          <div class="about-us-block__content">
            {showTitle && <RichText tagName="h2" className="about-us-block__title" value={title} onChange={(value) => setAttributes({ title: value })} placeholder="Wpisz tytuł tutaj..." />}
            {showText && <RichText tagName="p" className="about-us-block__text" value={text} onChange={(value) => setAttributes({ text: value })} placeholder="Wpisz opis tutaj..." />}
          </div>
          {showImage && (
            <div className="about-us-block__image">
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={(media) => {
                    const srcSet = media.sizes
                      ? Object.values(media.sizes)
                          .map((size) => `${size.url} ${size.width}w`)
                          .join(', ')
                      : '';

                    setAttributes({
                      image: {
                        id: media.id,
                        url: media.url,
                        alt: media.alt || '',
                        srcSet: srcSet,
                      },
                    });
                  }}
                  value={image.id}
                  render={({ open }) => <Button onClick={open} className="image-selector-button"></Button>}
                />
              </MediaUploadCheck>
              {image.url && <img src={image.url} alt={image.alt} loading="lazy" srcSet={image.srcSet} sizes="100vw" />}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
