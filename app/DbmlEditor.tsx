"use client"

import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";

export default function DbmlEditor() {
    const monaco = useMonaco();

    useEffect(() => {
        if (monaco == null) return;
        monaco.languages.register({ id: "dbml" });
        monaco.languages.setMonarchTokensProvider("dbml", {
            ignoreCase: true,
            tokenizer: {
                root: [
                    [/\b(?:table|type|ref|enum|indexes|index|primary|unique|foreign|key|null|note|not|name|unique|pk|fk|as)\b/, "keyword"],
                    [/\b(?:number|integer|int|string|boolean|float|varchar|timestamp|text|date|datetime)\b/gi, "type"],
                    [/["][^"]*["]/, "string"],
                    [/['][^']*[']/, "string"],
                    [/`/, "string", "@string"],
                    [/\/\/.*/, "comment"],
                    [/\/\*/, "comment", "@comment"],
                ],
                string: [
                    [/[^`]+/, "string"],
                    [/`/, "string", "@pop"],
                ],
                comment: [
                    [/\*\//, "comment", "@pop"],
                    [/./, "comment"],
                ],
            }
        });
        monaco.languages.setLanguageConfiguration("dbml", {
            comments: {
                lineComment: "//",
                blockComment: ["/*", "*/"],
            },
            brackets: [
                ["{", "}"],
                ["[", "]"],
                ["(", ")"],
            ],
            autoClosingPairs: [
                { open: "{", close: "}" },
                { open: "[", close: "]" },
                { open: "(", close: ")" },
                { open: '"', close: '"', notIn: ["string"] },
                { open: "'", close: "'", notIn: ["string"] },
                { open: "`", close: "`", notIn: ["string"] },
                { open: "/*", close: "*/", notIn: ["comment"] },
            ],
        });
    }, [monaco]);

    const defaultValue = `
// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs
/*
multiline comment 
*/
/**/
Table follows {
  following_user_id integer
  followed_user_id integer
  created_at timestamp 
}

Table users {
  id integer [primary key]
  username varchar
  role varchar
  created_at timestamp
}

Table posts {
  id integer [primary key]
  title varchar
  body text [note: 'Content of the post']
  user_id integer [not null]
  status varchar
  created_at timestamp
}

Table bookings {
  id integer
  country varchar
  booking_date date
  created_at timestamp

  indexes {
    (id, country) [pk] // composite primary key
    created_at [name: 'created_at_index', note: 'Date']
    booking_date
    (country, booking_date) [unique]
    booking_date [type: hash]
    (\`id*2\`)
    (\`id*3\`,\`getdate()\`)
    (\`id*3\`,id)
  }
}


Ref user_posts: posts.user_id > users.id // many-to-one

Ref: users.id < follows.following_user_id

Ref: users.id < follows.followed_user_id
`
    return (
        <Editor
            width={"100%"}
            height={"100%"}
            theme="vs-dark"
            language="dbml"
            defaultValue={defaultValue}
            options={
                {
                    fontSize: 12,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                }
            }
        />
    );
};
