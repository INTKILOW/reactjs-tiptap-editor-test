'use client';
import RichTextEditor from "@/components/editor";
import { useState } from "react";

export default function Home() {

  const [value, setValue] = useState<string>('');
  const [value1, setValue1] = useState<string>('');
  return<>
    <div>
      <RichTextEditor value={value} setValue={setValue}/>
      <RichTextEditor value={value1} setValue={setValue1}/>
    </div>
  </>
 
}
