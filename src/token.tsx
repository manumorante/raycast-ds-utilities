import { ActionPanel, CopyToClipboardAction, List, OpenInBrowserAction, showToast, ToastStyle } from "@raycast/api";
import { useState, useEffect } from "react";
import fs from "fs";
import { settings } from "./settings";

export default function TokenList() {
  const [state, setState] = useState<{ data: List[] }>({ data: [] });

  useEffect(() => {
    async function fetch() {
      const data = await fetchData();
      setState((oldState) => ({ ...oldState, data }));
    }
    fetch();
  }, []);

  return (
    <List isLoading={state.data.length === 0} searchBarPlaceholder="Search by name or prop ...">
      {state.data.map((token) => (
        <ListItem key={token.id} token={token} />
      ))}
    </List>
  );
}

function ListItem(props: { token: List }) {
  const token = props.token;

  return (
    <List.Item
      id={token.id}
      key={token.id}
      title={token.title}
      subtitle={token.subtitle}
      icon='🔹'
      accessoryTitle={token.accessory}
      keywords={[token.accessory, token.subtitle]}
      actions={
        <ActionPanel>
          <CopyToClipboardAction title="Copy token" content={token.title} />
          <CopyToClipboardAction title="Copy CSS" content={token.subtitle} />
          <OpenInBrowserAction title="Open tokens file" url={settings.tokens} />
        </ActionPanel>
      }
    />
  );
}

// Load CSS file, parse and return as JSON
function parseCSS() {
  const data = fs.readFileSync(settings.tokens, {encoding:'utf8', flag:'r'});
  let JSONasString = ''
  let total = 0

  data.split('\n').forEach(line => {
    if (line.includes('--')) {
      total += 1

      line = line.replace('--', '')
      line = line.replace(/\s/g, '')
      
      const title = line.split(':')[0]
      let subtitle = line.split(':').slice(1).join('')
      subtitle = subtitle.replace(/;$/, '')

      const isTotal = !isNaN(Number(subtitle))
      const isTitle = title.length > 0
      const isSubtitle = subtitle.length > 0

      if(isTotal && isTitle && isSubtitle) {        
        JSONasString = JSONasString + `{
          "id": "${total}",
          "title": "${title}",
          "subtitle": "${subtitle}",
          "accessory": "${subtitle}"\r
        },`
      }
    }
  })

  JSONasString = `{
    "items": [
      ${JSONasString}
      {
        "id": "id",
        "title": "title",
        "subtitle": "subtitle",
        "accessory": "subtitle"\r
      }
    ]
  }`

  return JSON.parse(JSONasString)
}

async function fetchData(): Promise<List[]> {  
  try {
    const json = parseCSS()
    return (json as Record<string, unknown>).items as List[];
  } catch (error) {
    console.error(error)
    showToast(ToastStyle.Failure, `Error loading settings.tokens(${settings.tokens})`);
    return Promise.resolve([]);
  }
}

type List = {
  id: string;
  title: string;
  subtitle: string;
  accessory: string;
};
