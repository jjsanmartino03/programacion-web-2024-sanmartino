import React from 'react';
import {Page} from "@/types/common";
import Image from "next/image";
import MarkdownRenderer from "@/components/markdwon/renderer";

type PageViewProps = {
  page: Page;
  author: { email: string };
};

const PageView: React.FC<PageViewProps> = ({page,author}) => {
  return (
    <div className={'w-full flex justify-center'}>
      <div className="container items-start flex flex-col gap-2 lg:w-2/3 xl:w-1/2  px-4 py-8">
        <h1 className="text-4xl font-bold">{page.title}</h1>
        <i className="text-muted-foreground">Created by {author.email}</i>
        {page.imageUrl && (
          <div className="flex justify-center">
            <Image src={page.imageUrl} alt={page.title} height={400} width={800} className=" max-h-[400px] w-auto rounded-md shadow-md"/>
          </div>
        )}
        <MarkdownRenderer content={page.markdown}/>
      </div>
    </div>
  );
};

export default PageView;