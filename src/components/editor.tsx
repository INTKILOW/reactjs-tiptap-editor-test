"use client";

import React, { useCallback } from "react";
import RcTiptapEditor from "reactjs-tiptap-editor";
// eslint-disable-next-line import/order
import {
  BaseKit,
  Blockquote,
  Bold,
  BulletList,
  Clear,
  Code,
  CodeBlock,
  Color,
  ColumnActionButton,
  Emoji,
  ExportPdf,
  ExportWord,
  FontFamily,
  FontSize,
  FormatPainter,
  Heading,
  Highlight,
  History,
  HorizontalRule,
  Iframe,
  Image,
  Indent,
  Italic,
  Katex,
  LineHeight,
  Link,
  MoreMark,
  OrderedList,
  SearchAndReplace,
  SlashCommand,
  Strike,
  Table,
  TaskList,
  TextAlign,
  Underline,
  TableOfContents,
  Excalidraw,
  TextDirection,
  Mention,
} from "reactjs-tiptap-editor/extension-bundle";

import "katex/dist/katex.min.css";
import "easydrawer/styles.css";

import "reactjs-tiptap-editor/style.css";
 


export interface RichTextProps {
  isDisabled?: boolean;
  immediatelyRender?: boolean;
  value: any;
  label?: string;
  setValue?: (data: any) => void;
  uploadFile?: (data: any) => Promise<any>;
}

export default function RichTextEditor(props: RichTextProps) {
  const refEditor = React.useRef<any>(null);

 

  const extensions = (uploadFile?: (data: any) => Promise<any>) => [
    BaseKit.configure({
      multiColumn: true,
      placeholder: {
        showOnlyCurrent: true,
      },
      characterCount: false,
    }),
    History,
    SearchAndReplace,
    TextDirection,
    TableOfContents,
    FormatPainter.configure({ spacer: true }),
    Clear,
    FontFamily,
    Heading.configure({ spacer: true }),
    FontSize,
    Bold,
    Italic,
    Underline,
    Strike,
    MoreMark,
    Katex,
    Emoji,
    Color.configure({ spacer: true }),
    Highlight,
    BulletList,
    OrderedList,
    TextAlign.configure({ types: ["heading", "paragraph"], spacer: true }),
    Indent,
    LineHeight,
    TaskList.configure({
      spacer: true,
      taskItem: {
        nested: true,
      },
    }),
    Link,
    Image.configure({
      upload: async (files: File) => {
        // console.log(files);
        const { data } = await uploadFile?.([files]);
  
        if (data.code === 200) {
          return data.data;
        }
  
        return [];
      },
    }),
    Blockquote.configure({ spacer: true }),
    SlashCommand,
    HorizontalRule,
    Code.configure({
      toolbar: false,
    }),
    CodeBlock.configure({ defaultTheme: "dracula" }),
    ColumnActionButton,
    Table,
    Iframe,
    ExportPdf.configure({ spacer: true }),
    ExportWord,
    Excalidraw,
    Mention,
  ];
  
  function debounce(func: any, wait: number) {
    let timeout: NodeJS.Timeout;
  
    return function (...args: any[]) {
      clearTimeout(timeout);
      // @ts-ignore
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  const onValueChange = useCallback(
    debounce((value: any) => {
      props.setValue?.(value);
    }, 300),
    [],
  );

  // <button onClick={() => locale.setLang("zh_CN")}>Chinese</button>
  return (
    <div className='flex flex-col w-full'>
    
      <RcTiptapEditor
        ref={refEditor}
        content={props.value}
        contentClass={[
          props.isDisabled
            ? "RcTiptapEditorPaddingNone"
            : "RcTiptapEditorPadding",
        ]}

        disabled={props.isDisabled}
        extensions={extensions(props.uploadFile)}
        hideToolbar={props.isDisabled}
        output='html'
        useEditorOptions={
          props.immediatelyRender
            ? {
                immediatelyRender: true,
                shouldRerenderOnTransaction: false,
              }
            : {}
        }
        onChangeContent={onValueChange}
      />
    </div>
  );
}
