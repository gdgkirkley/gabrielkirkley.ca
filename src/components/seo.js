import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import SchemaOrg from "./schema-org";

function SEO({ description, lang, meta, title, image, isBlogPost, date }) {
  const { site, defaultImage } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            social {
              twitter
            }
          }
        }
        defaultImage: allImageSharp(
          filter: { fluid: { originalName: { eq: "churro.jpg" } } }
        ) {
          nodes {
            fixed {
              src
            }
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const datePublished = isBlogPost ? date : false;

  const seoImage = `${site.siteMetadata.siteUrl}${
    image || defaultImage.nodes[0].fixed.src
  }`;

  return (
    <>
      <Helmet
        htmlAttributes={{
          lang,
        }}
        title={title}
        titleTemplate={`%s | ${site.siteMetadata.title}`}
        meta={[
          {
            name: `description`,
            content: metaDescription,
          },
          {
            name: "image",
            content: seoImage,
          },
          {
            property: "og:url",
            content: site.siteMetadata.siteUrl,
          },
          {
            property: `og:title`,
            content: title,
          },
          {
            property: `og:description`,
            content: metaDescription,
          },
          {
            property: `og:type`,
            content: `website`,
          },
          {
            property: "og:image",
            content: seoImage,
          },
          {
            name: `twitter:card`,
            content: `summary_large_image`,
          },
          {
            name: `twitter:creator`,
            content: site.siteMetadata.social.twitter,
          },
          {
            name: `twitter:title`,
            content: title,
          },
          {
            name: `twitter:description`,
            content: metaDescription,
          },
          {
            property: "twitter:image",
            content: seoImage,
          },
        ].concat(meta)}
      />
      <SchemaOrg
        isBlogPost={isBlogPost}
        url={site.siteMetadata.siteUrl}
        title={title}
        description={metaDescription}
        datePublished={datePublished}
        author={site.siteMetadata.author}
        defaultTitle={site.siteMetadata.title}
        image={`${site.siteMetadata.siteUrl}${defaultImage.nodes[0].fixed.src}`}
      />
    </>
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default SEO;
