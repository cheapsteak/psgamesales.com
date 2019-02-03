// generated using https://app.quicktype.io/
export interface ValkyrieStorefrontBase {
  data: Data;
  included: any[];
}

interface Data {
  attributes: Attributes;
  id: string;
  relationships: Relationships;
  type: string;
}

interface Attributes {
  name: string;
  navigation: Navigation[];
}

interface Navigation {
  id: string;
  name: string;
  'route-name': string;
  submenu: Submenu[];
  'target-container-id': string;
}

interface Submenu {
  items: ValkyrieStorefrontBase__Item[];
  name: string;
  'target-container-id': string;
  'template-def-id': number | null;
}

export interface ValkyrieStorefrontBase__Item {
  'is-separator': boolean;
  name: string;
  'target-container-id': string;
  'target-container-type': Type;
  'template-def-id': number | null;
}

enum Type {
  Container = 'container',
}

interface Relationships {
  children: Children;
  'legacy-skus': Children;
}

interface Children {
  data: Datum[];
}

interface Datum {
  id: string;
  type: Type;
}
