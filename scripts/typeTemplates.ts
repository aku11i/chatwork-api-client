import { Property } from "./utils";

export function getTypeString({
  types,
  enums,
  children,
  arrayProp,
}: Property): string {
  if (enums) {
    const enumStr = enums.map((e) => `"${e}"`).join("|");
    return `${enumStr}`;
  }

  if (types === "object") {
    return children
      ? `{
          ${children.map(propToType).join("\n")}
        }`
      : "any";
  }

  if (types === "array") {
    return arrayProp ? `${getTypeString(arrayProp)}[]` : "any";
  }

  if (types === "file") {
    return "string";
  }

  return `${types}`;
}

function propToType(prop: Property) {
  return `
  /** ${prop.description || ""} */
  ${prop.name}${prop.required ? "" : "?"}: ${getTypeString(prop)}
  `;
}

export function getType(typeName: string, props: Property | Property[]) {
  if (Array.isArray(props)) {
    return `
    export type ${typeName} = {
      ${props.map(propToType).join("\n")}
    }
    `;
  }

  return `export type ${typeName} = ${getTypeString(props)}`;
}
