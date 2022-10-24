import { ActionPanel, PasteAction, Icon, List, showToast, ToastStyle, OpenInBrowserAction } from "@raycast/api";
import { useState, useEffect } from "react";
import fs from "fs";
import { settings } from "./settings";
// import { getVarValue } from "./util";

// Search prop in our categories list
// - if found, return the category
// - if not found, return the default category
function getPropCategory(prop: string ) {
  const filterCat = settings.propsCategories.filter((category) => {
    return category.props.includes(prop)
  })
  return (filterCat.length > 0) ? filterCat[0] : settings.noCategory
}

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
  const cat = getPropCategory(utility.accessory)

  return (
    <List.Item
      id={utility.id}
      key={utility.id}
      title={utility.title}
      subtitle={utility.subtitle}
      icon={cat.icon}
      accessoryTitle={cat.name}
      keywords={[utility.accessory, utility.subtitle, cat.name]}
      actions={
        <ActionPanel>
          <PasteAction icon={Icon.Hammer} title={`Paste utility '${utility.title}'`} content={utility.title} />
          <PasteAction icon={Icon.Gear} title="Paste CSS" content={utility.subtitle} />
          <OpenInBrowserAction title="Open utilities file" url={settings.utilities} />
        </ActionPanel>
      }
    />
  );
}

// Load file, parse and return as JSON
function parseCSS() {
  const data = fs.readFileSync(settings.utilities, {encoding:'utf8', flag:'r'});
  let JSONasString = ''
  let total = 0

  data.split('\n').forEach(line => {
    if (line.includes('{ ')) {
      total += 1
      line = line.replace(/^\./, '')
      line = line.replace(/\\/g, '')
      line = line.replace('{ ', '')
      line = line.replace(' }', '')
  
      const title = line.split(' ')[0]
      let subtitle = line.split(' ').slice(1).join(' ')
      const accessory = subtitle.split(':')[0]
  
      subtitle = subtitle.replace(/"/g, '\'')
      subtitle = subtitle.replace(/;$/, '')

      // Remove `var()`
      subtitle = subtitle.replace(/var\(/g, '')
      subtitle = subtitle.replace(/\)/g, '')
  
      JSONasString = JSONasString + `{
        "id": "${total}::${accessory}",
        "title": "${title}",
        "subtitle": "${subtitle}",
        "accessory": "${accessory}"\r
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
    showToast(ToastStyle.Failure, `Error loading settings.utilities(${settings.utilities})`);
    return Promise.resolve([]);
  }
}

type Utility = {
  id: string;
  title: string;
  subtitle: string;
  accessory: string;
};
