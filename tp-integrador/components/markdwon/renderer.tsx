import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type MarkdownRendererProps = {
  content: string;
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({content}) => {
  return (
    <div className="prose prose-lg mx-auto my-8 rounded-md">
      <ReactMarkdown
        components={{
          'h1': ({children}) => <h1 className="text-4xl font-bold mb-4">{children}</h1>,
          'h2': ({children}) => <h2 className="text-3xl font-bold mb-4">{children}</h2>,
          'h3': ({children}) => <h3 className="text-2xl font-bold mb-4">{children}</h3>,
          'h4': ({children}) => <h4 className="text-xl font-bold mb-4">{children}</h4>,
          'h5': ({children}) => <h5 className="text-lg font-bold mb-4">{children}</h5>,
          'h6': ({children}) => <h6 className="text-base font-bold mb-4">{children}</h6>,
          'p': ({children}) => <p className="mb-4">{children}</p>,
          'ul': ({children}) => <ul className="list-disc pl-4 mb-4">{children}</ul>,
          'ol': ({children}) => <ol className="list-decimal pl-4 mb-4">{children}</ol>,
          'li': ({children}) => <li className="mb-2">{children}</li>,
          'a': ({children, href}) =>
            <a className="text-blue-500 hover:underline" href={href as string}>{children}</a>,
          'hr': () => <hr className="my-4 border-gray-300"/>,
          'blockquote': ({children}) => <blockquote
            className="border-l-4 border-gray-300 pl-4 mb-4">{children}</blockquote>,
          'code': ({children}) => <code className="bg-gray-100 p-1 rounded-md">{children}</code>,
          'pre': ({children}) => <pre className="bg-gray-100 p-4 rounded-md overflow-auto">{children}</pre>,
          'table': ({children}) => <table className="table-auto w-full">{children}</table>,
          'thead': ({children}) => <thead className="bg-gray-100">{children}</thead>,
          'tbody': ({children}) => <tbody>{children}</tbody>,
          'tr': ({children}) => <tr>{children}</tr>,
          'th': ({children}) => <th className="p-2 font-bold">{children}</th>,
          'td': ({children}) => <td className="p-2 border border-gray-300">{children}</td>,
          'img': ({src, alt}) => <img src={src as string} alt={alt as string} className="w-full rounded-md shadow-md"/>,
        }}
        remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;