import React from 'react';
// markdown
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
// utils
import { specialCharDecoder } from '../../utils/decoders';
// -------------------------------------------------- //

export default function CustomReactMarkdown({
  markdown,
}: {
  markdown: string;
}) {
  return (
    <ReactMarkdown
      // eslint-disable-next-line
      children={specialCharDecoder(markdown)}
      remarkPlugins={[remarkGfm]}
      components={{
        img({ node, ...props }) {
          return (
            // eslint-disable-next-line
            <img {...props} style={{ maxWidth: '100%', height: 'auto' }} />
          );
        },
        blockquote({ node, ...props }) {
          return (
            <blockquote
              {...props}
              style={{
                backgroundColor: '#f3f4f6',
                fontStyle: 'italic',
                padding: '10px',
                borderLeft: '5px solid gray',
              }}
            />
          );
        },
        iframe({ node, ...props }) {
          return (
            <iframe {...props} style={{ maxWidth: '100%', height: 'auto' }} />
          );
        },
      }}
    />
  );
}
