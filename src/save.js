/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
  const { title, text, image, showTitle, showText, showImage } = attributes;

  return (
    <section {...useBlockProps.save({ className: 'about-us-block' })}>
      <div class="wrapper">
        <div class="about-us-block__content">
          {showTitle && <RichText.Content tagName="h2" className="about-us-block__title" value={title} />}
          {showText && <RichText.Content tagName="p" className="about-us-block__text" value={text} />}
        </div>
        {showImage && <div class="about-us-block__image">{image.url && <img src={image.url} loading="lazy" alt={image.alt} srcSet={image.srcSet} sizes="100vw" />}</div>}
      </div>
    </section>
  );
}
