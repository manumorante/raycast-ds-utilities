import { ActionPanel, CopyToClipboardAction, List, showToast, ToastStyle } from "@raycast/api";
import { useState, useEffect } from "react";
import fs from "fs";
import { settings } from "./settings";

export default function UtilityList() {
  const [state, setState] = useState<{ utilities: Utility[] }>({ utilities: [] });

  useEffect(() => {
    async function fetch() {
      const utilities = await fetchUtilities();
      setState((oldState) => ({
        ...oldState,
        utilities: utilities,
      }));
    }
    fetch();
  }, []);

  return (
    <List isLoading={state.utilities.length === 0} searchBarPlaceholder="Search by name or prop ...">
      {state.utilities.map((utility) => (
        <UtilityListItem key={utility.id} utility={utility} />
      ))}
    </List>
  );
}

function UtilityListItem(props: { utility: Utility }) {
  const utility = props.utility;

  return (
    <List.Item
      id={utility.id}
      key={utility.id}
      title={utility.title}
      subtitle={utility.subtitle}
      icon='🔹'
      accessoryTitle={utility.accessory}
      keywords={[utility.accessory]}
      actions={
        <ActionPanel>
          <CopyToClipboardAction title="Copy utility" content={utility.title} />
          <CopyToClipboardAction title="Copy CSS" content={utility.subtitle} />
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
  
      JSONasString = JSONasString + `{
        "id": "${total}",
        "title": "${title}",
        "subtitle": "${subtitle}",
        "accessory": "${subtitle}"\r
      },`
    }
  })

  JSONasString = `{
    "items": [
      ${JSONasString}
      { "title": "end" }
    ]
  }`

  return JSON.parse(JSONasString)
}

async function fetchUtilities(): Promise<Utility[]> {  
  try {
    const json = parseCSS()
    return (json as Record<string, unknown>).items as Utility[];
  } catch (error) {
    console.error(error)
    showToast(ToastStyle.Failure, `Error loading settings.tokens(${settings.tokens})`);
    return Promise.resolve([]);
  }
}

type Utility = {
  id: string;
  title: string;
  subtitle: string;
  accessory: string;
};
