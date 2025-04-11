'use client';
import RichTextEditor from "@/components/editor";
import { useState } from "react";
import NextLink from "next/link";

export default function Home() {

  const [value, setValue] = useState<string>('');
  const [value1, setValue1] = useState<string>('');
  return<>
    <div>
      <NextLink href="/pages/test/t-page" >ASDSAFASD</NextLink>
    </div>
  </>
 
}
