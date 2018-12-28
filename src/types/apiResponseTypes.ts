export interface ValkyrieStoreResponse {
  data: Data;
  included: ValkyrieStoreIncludedItem[];
}

export interface ValkyrieStoreIncludedItem {
  attributes: ValkyrieStoreItemAttributes;
  id: string;
  relationships: ValkyrieStoreItemRelationships;
  type: string;
}

interface ValkyrieStoreItemRelationships {
  children: ValkyrieStoreItemChildren;
  'legacy-skus': ValkyrieStoreItemChildren;
}

interface ValkyrieStoreItemChildren {
  data: Datum[];
}

interface ValkyrieStoreItemAttributes {
  amortizeFlag?: boolean;
  bundleExclusiveFlag?: boolean;
  chargeImmediatelyFlag?: boolean;
  charge_type_id?: number;
  credit_card_required_flag?: number;
  defaultSku?: boolean;
  display_price?: string;
  eligibilities?: Eligibility[];
  entitlements?: Entitlement[];
  id?: string;
  is_original?: boolean;
  name: string;
  platforms: (number | string)[];
  price?: number;
  rewards?: Reward[];
  seasonPassExclusiveFlag?: boolean;
  skuAvailabilityOverrideFlag?: boolean;
  sku_type?: number;
  type?: string;
  'badge-info'?: BadgeInfo;
  'cero-z-status'?: Cerozstatus;
  'content-rating'?: ContentRating;
  'content-type'?: string;
  'default-sku-id'?: string;
  'dob-required'?: boolean;
  'file-size'?: Filesize;
  'game-content-type'?: string;
  genres?: string[];
  'is-igc-upsell'?: boolean;
  'is-multiplayer-upsell'?: boolean;
  'kamaji-relationship'?: string;
  'legal-text'?: string;
  'long-description'?: string;
  'macross-brain-context'?: string;
  'media-list'?: GameMediaList;
  'nsx-confirm-message'?: string;
  parent?: Parent;
  'plus-reward-description'?: any;
  'primary-classification'?: string;
  'provider-name'?: string;
  'ps-camera-compatibility'?: string;
  'ps-move-compatibility'?: string;
  'ps-vr-compatibility'?: string;
  'release-date'?: string;
  'secondary-classification'?: string;
  skus?: Skus[];
  'star-rating'?: Starrating;
  'subtitle-language-codes'?: any[];
  'tertiary-classification'?: string;
  'thumbnail-url-base'?: string;
  'top-category'?: string;
  'upsell-info'?: Upsellinfo;
  'voice-language-codes'?: any[];
}

interface Upsellinfo {
  'discount-percentage-difference': number;
  'display-price': string;
  'is-free': boolean;
  type: string;
}

interface Starrating {
  score?: number;
  total?: number;
}

interface Skus {
  entitlements: Entitlement2[];
  id: string;
  'is-preorder': boolean;
  multibuy?: any;
  name: string;
  'playability-date': string;
  'plus-reward-description'?: any;
  prices: Prices;
}

interface Prices {
  'non-plus-user': NonPlusUserPrice;
  'plus-user': PlusUserPrice;
}

interface PlusUserPrice {
  'actual-price': ActualPrice;
  availability: Availability;
  'discount-percentage': number;
  'is-plus': boolean;
  'strikethrough-price': ActualPrice;
  'upsell-price'?: any;
}

interface NonPlusUserPrice {
  'actual-price': ActualPrice;
  availability: Availability;
  'discount-percentage': number;
  'is-plus': boolean;
  'strikethrough-price': ActualPrice;
  'upsell-price'?: ActualPrice;
}

interface Availability {
  'end-date': string;
  'start-date': string;
}

interface ActualPrice {
  display: string;
  value: number;
}

interface Entitlement2 {
  duration: number;
  'exp-after-first-use': number;
}

interface Parent {
  id: string;
  name: string;
  thumbnail: string;
  url: string;
}

export interface GameMediaList {
  preview: Preview[];
  promo: Promo;
  screenshots: Preview[];
}

interface Promo {
  images: Preview[];
  videos: Preview[];
}

interface Preview {
  url: string;
}

interface Filesize {
  unit: string;
  value?: number;
}

interface ContentRating {
  'content-descriptors': ContentDescriptor[];
  contentInteractiveElement: ContentInteractiveElement[];
  'rating-system': string;
  url: string;
}

interface ContentInteractiveElement {
  description: string;
  name: string;
}

interface ContentDescriptor {
  description: string;
  name: string;
  url?: any;
}

interface Cerozstatus {
  'is-allowed-in-cart': boolean;
  'is-on': boolean;
}

interface BadgeInfo {
  'non-plus-user': BadgeUserInfo;
  'plus-user': BadgeUserInfo;
}

interface BadgeUserInfo {
  'discount-percentage': number;
  'is-plus': boolean;
  type: string;
}

interface Reward {
  bonus_discount?: number;
  bonus_display_price?: string;
  bonus_entitlement_id?: string;
  bonus_price?: number;
  campaigns: Campaign[];
  discount: number;
  display_price: string;
  end_date: string;
  id: string;
  isPlus: boolean;
  price: number;
  reward_source_type_id: number;
  reward_type: number;
  start_date: string;
}

interface Campaign {
  end_date: string;
  id: string;
  start_date: string;
}

interface Entitlement {
  description?: any;
  drms: any[];
  duration: number;
  durationOverrideTypeId?: any;
  exp_after_first_use: number;
  feature_type_id: number;
  id: string;
  license_type: number;
  metadata?: (Metadatum | null)[];
  name: string;
  packageType?: null | string | string;
  packages: (Package | Package)[];
  preorder_placeholder_flag: boolean;
  size: number;
  subType: number;
  subtitle_language_codes?: any;
  type: number;
  use_count: number;
  voice_language_codes?: any;
}

interface Package {
  platformId: number;
  platformName: string;
  size: number;
}

interface Metadatum {
  packageSubType: string[];
}

interface Eligibility {
  description?: any;
  drms: any[];
  entitlement_type?: any;
  id: string;
  is_eligible: number;
  name: string;
  operand: string;
  operator: string;
}

interface Data {
  attributes: ValkyrieStoreAttributes;
  id: string;
  relationships: Relationships;
  type: string;
}

interface Relationships {
  children: Children;
  'legacy-skus': Legacyskus;
}

interface Legacyskus {
  data: any[];
}

interface Children {
  data: Datum[];
}

interface Datum {
  id: string;
  type: string;
}

interface ValkyrieStoreAttributes {
  banners: Banner[];
  facets: any[];
  name: string;
  'nsx-ps-plus-upsell'?: any;
  'promo-background-url': string;
  'promo-backgrounds': Promobackground[];
  'sub-scenes': Subscenes;
  'template-id': number;
  'thumbnail-url-base': string;
  'total-results': number;
}

interface Subscenes {}

interface Promobackground {
  'template-extra-id': number;
  url: string;
}

interface Banner {
  'asset-dimensions': string;
  assets: Asset[];
  'location-widget-id': number;
  'target-container-id': string;
  'target-type': string;
}

interface Asset {
  'asset-id': number;
  'report-id': string;
  url: string;
}
