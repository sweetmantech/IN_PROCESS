export const COLLECTION_ADDRESS = "0xf0b2ab81056c8e2fdc40e46e32fae895f809c90d";
export const MINT_FEE_RECIPIENT = "0xcfBf34d385EA2d5Eb947063b67eA226dcDA3DC38";

export const JSON_EXTENSION_REGISTRY =
  "0xabcdefed93200601e1dfe26d6644758801d732e8";
import { Point } from "@/types/spiral";
import {
  zoraCreator1155FactoryImplABI,
  zoraCreatorFixedPriceSaleStrategyABI,
} from "@zoralabs/protocol-deployments";
import { encodeEventTopics } from "viem";
import { baseSepolia, base } from "viem/chains";

export const IS_TESTNET =
  process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? true : false;

export const FIXED_PRICE_SALE_STRATEGY_ADDRESS =
  "0xd34872BE0cdb6b09d45FCa067B07f04a1A9aE1aE";

// Wagmi
export const CHAIN = IS_TESTNET ? baseSepolia : base;
export const CHAIN_ID = CHAIN.id;
// Zora
export const REFERRAL_RECIPIENT = "0x749B7b7A6944d72266Be9500FC8C221B6A7554Ce";
// IPFS
export const ONE_MB = 1024 * 1024;
export const MAX_FILE_SIZE = 5 * ONE_MB;

export const SETUP_NEW_CONTRACT_EVENT_SIGNATURE = encodeEventTopics({
  abi: zoraCreator1155FactoryImplABI,
  eventName: "SetupNewContract",
})[0];

export const MINT_COMMENT_EVENT_SIGNATURE = encodeEventTopics({
  abi: zoraCreatorFixedPriceSaleStrategyABI,
  eventName: "MintComment",
})[0];

export const CROSSMINT_SIGNER_ADDRESS =
  "0xa105C311fA72b8Fb78c992EcbDb8b02Ea5bd394d";

  
export const SPIRAL_POINTS: Point[] = [
  [19, 113],
  [39, 106],
  [70, 98],
  [105, 90],
  [132, 82],
  [163, 74],
  [199, 69],
  [255, 57],
  [288, 51],
  [321, 46],
  [350, 41],
  [391, 36],
  [442, 31],
  [484, 24],
  [544, 15],
  [579, 13],
  [600, 11],
  [627, 8],
  [653, 7],
  [694, 5],
  [707, 3],
  [738, 3],
  [772, 4],
  [794, 5],
  [820, 5],
  [856, 5],
  [882, 6],
  [920, 6],
  [950, 9],
  [980, 10],
  [1020, 13],
  [1050, 17],
  [1086, 25],
  [1115, 32],
  [1136, 40],
  [1161, 54],
  [1189, 71],
  [1216, 88],
  [1238, 105],
  [1255, 121],
  [1278, 146],
  [1290, 166],
  [1310, 197],
  [1321, 218],
  [1335, 243],
  [1340, 271],
  [1349, 302],
  [1353, 328],
  [1351, 351],
  [1353, 391],
  [1343, 420],
  [1343, 446],
  [1319, 476],
  [1305, 494],
  [1287, 517],
  [1256, 541],
  [1240, 551],
  [1219, 565],
  [1199, 579],
  [1182, 596],
  [1153, 610],
  [1124, 626],
  [1097, 642],
  [1071, 653],
  [1048, 661],
  [1030, 671],
  [996, 682],
  [968, 694],
  [936, 705],
  [911, 716],
  [891, 722],
  [870, 730],
  [840, 738],
  [800, 750],
  [770, 753],
  [746, 761],
  [709, 770],
  [677, 773],
  [646, 775],
  [605, 778],
  [570, 780],
  [527, 782],
  [490, 791],
  [454, 789],
  [417, 779],
  [381, 772],
  [355, 753],
  [325, 739],
  [303, 722],
  [287, 693],
  [281, 671],
  [281, 669],
  [281, 667],
  [281, 665],
  [282, 663],
  [282, 661],
  [282, 659],
  [282, 657],
  [282, 655],
  [282, 653],
  [283, 651],
  [283, 649],
  [283, 647],
  [283, 645],
  [283, 643],
  [284, 641],
  [291, 619],
  [302, 597],
  [318, 576],
  [339, 558],
  [359, 539],
  [386, 519],
  [405, 503],
  [442, 485],
  [490, 461],
  [530, 446],
  [558, 435],
  [579, 427],
  [618, 415],
  [658, 403],
  [700, 390],
  [735, 379],
  [779, 370],
  [820, 363],
  [865, 356],
  [910, 349],
  [945, 347],
  [990, 343],
  [1119, 352],
  [1170, 358],
  [1203, 363],
  [1235, 372],
  [1265, 378],
  [1296, 388],
  [1336, 401],
  [1360, 414],
  [1385, 423],
  [1409, 433],
  [1429, 444],
  [1450, 460],
  [1474, 479],
  [1496, 493],
  [1520, 513],
  [1545, 533],
  [1564, 553],
  [1578, 573],
  [1592, 591],
  [1604, 609],
  [1617, 629],
  [1630, 647],
  [1643, 665],
  [1647, 682],
  [1657, 720],
  [1661, 736],
  [1668, 751],
  [1673, 766],
  [1679, 783],
  [1687, 797],
  [1690, 815],
  [1697, 830],
  [1703, 836],
];
