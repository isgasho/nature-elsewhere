import {ObjectUtil} from '../utils/object-util'

/** Atlas AnimationIDs are Aseprite Tags and correspond to AtlasAnimations. */
export enum AnimationID {
  BACKGROUND = 'background ',
  CLOUD = 'cloud ',
  CLOUD_SHADOW = 'cloud shadow',
  CONIFER = 'conifer ',
  CONIFER_SHADOW = 'conifer shadow',
  MEM_FONT_0 = 'mem-font 0',
  MEM_FONT_1 = 'mem-font 1',
  MEM_FONT_2 = 'mem-font 2',
  MEM_FONT_3 = 'mem-font 3',
  MEM_FONT_4 = 'mem-font 4',
  MEM_FONT_5 = 'mem-font 5',
  MEM_FONT_6 = 'mem-font 6',
  MEM_FONT_7 = 'mem-font 7',
  MEM_FONT_8 = 'mem-font 8',
  MEM_FONT_9 = 'mem-font 9',
  MEM_FONT_10 = 'mem-font 10',
  MEM_FONT_11 = 'mem-font 11',
  MEM_FONT_12 = 'mem-font 12',
  MEM_FONT_13 = 'mem-font 13',
  MEM_FONT_14 = 'mem-font 14',
  MEM_FONT_15 = 'mem-font 15',
  MEM_FONT_16 = 'mem-font 16',
  MEM_FONT_17 = 'mem-font 17',
  MEM_FONT_18 = 'mem-font 18',
  MEM_FONT_19 = 'mem-font 19',
  MEM_FONT_20 = 'mem-font 20',
  MEM_FONT_21 = 'mem-font 21',
  MEM_FONT_22 = 'mem-font 22',
  MEM_FONT_23 = 'mem-font 23',
  MEM_FONT_24 = 'mem-font 24',
  MEM_FONT_25 = 'mem-font 25',
  MEM_FONT_26 = 'mem-font 26',
  MEM_FONT_27 = 'mem-font 27',
  MEM_FONT_28 = 'mem-font 28',
  MEM_FONT_29 = 'mem-font 29',
  MEM_FONT_30 = 'mem-font 30',
  MEM_FONT_31 = 'mem-font 31',
  MEM_FONT_32 = 'mem-font 32',
  MEM_FONT_33 = 'mem-font 33',
  MEM_FONT_34 = 'mem-font 34',
  MEM_FONT_35 = 'mem-font 35',
  MEM_FONT_36 = 'mem-font 36',
  MEM_FONT_37 = 'mem-font 37',
  MEM_FONT_38 = 'mem-font 38',
  MEM_FONT_39 = 'mem-font 39',
  MEM_FONT_40 = 'mem-font 40',
  MEM_FONT_41 = 'mem-font 41',
  MEM_FONT_42 = 'mem-font 42',
  MEM_FONT_43 = 'mem-font 43',
  MEM_FONT_44 = 'mem-font 44',
  MEM_FONT_45 = 'mem-font 45',
  MEM_FONT_46 = 'mem-font 46',
  MEM_FONT_47 = 'mem-font 47',
  MEM_FONT_48 = 'mem-font 48',
  MEM_FONT_49 = 'mem-font 49',
  MEM_FONT_50 = 'mem-font 50',
  MEM_FONT_51 = 'mem-font 51',
  MEM_FONT_52 = 'mem-font 52',
  MEM_FONT_53 = 'mem-font 53',
  MEM_FONT_54 = 'mem-font 54',
  MEM_FONT_55 = 'mem-font 55',
  MEM_FONT_56 = 'mem-font 56',
  MEM_FONT_57 = 'mem-font 57',
  MEM_FONT_58 = 'mem-font 58',
  MEM_FONT_59 = 'mem-font 59',
  MEM_FONT_60 = 'mem-font 60',
  MEM_FONT_61 = 'mem-font 61',
  MEM_FONT_62 = 'mem-font 62',
  MEM_FONT_63 = 'mem-font 63',
  MEM_FONT_64 = 'mem-font 64',
  MEM_FONT_65 = 'mem-font 65',
  MEM_FONT_66 = 'mem-font 66',
  MEM_FONT_67 = 'mem-font 67',
  MEM_FONT_68 = 'mem-font 68',
  MEM_FONT_69 = 'mem-font 69',
  MEM_FONT_70 = 'mem-font 70',
  MEM_FONT_71 = 'mem-font 71',
  MEM_FONT_72 = 'mem-font 72',
  MEM_FONT_73 = 'mem-font 73',
  MEM_FONT_74 = 'mem-font 74',
  MEM_FONT_75 = 'mem-font 75',
  MEM_FONT_76 = 'mem-font 76',
  MEM_FONT_77 = 'mem-font 77',
  MEM_FONT_78 = 'mem-font 78',
  MEM_FONT_79 = 'mem-font 79',
  MEM_FONT_80 = 'mem-font 80',
  MEM_FONT_81 = 'mem-font 81',
  MEM_FONT_82 = 'mem-font 82',
  MEM_FONT_83 = 'mem-font 83',
  MEM_FONT_84 = 'mem-font 84',
  MEM_FONT_85 = 'mem-font 85',
  MEM_FONT_86 = 'mem-font 86',
  MEM_FONT_87 = 'mem-font 87',
  MEM_FONT_88 = 'mem-font 88',
  MEM_FONT_89 = 'mem-font 89',
  MEM_FONT_90 = 'mem-font 90',
  MEM_FONT_91 = 'mem-font 91',
  MEM_FONT_92 = 'mem-font 92',
  MEM_FONT_93 = 'mem-font 93',
  MEM_FONT_94 = 'mem-font 94',
  MEM_FONT_95 = 'mem-font 95',
  MEM_FONT_96 = 'mem-font 96',
  MEM_FONT_97 = 'mem-font 97',
  MEM_FONT_98 = 'mem-font 98',
  MEM_FONT_99 = 'mem-font 99',
  MEM_FONT_100 = 'mem-font 100',
  MEM_FONT_101 = 'mem-font 101',
  MEM_FONT_102 = 'mem-font 102',
  MEM_FONT_103 = 'mem-font 103',
  MEM_FONT_104 = 'mem-font 104',
  MEM_FONT_105 = 'mem-font 105',
  MEM_FONT_106 = 'mem-font 106',
  MEM_FONT_107 = 'mem-font 107',
  MEM_FONT_108 = 'mem-font 108',
  MEM_FONT_109 = 'mem-font 109',
  MEM_FONT_110 = 'mem-font 110',
  MEM_FONT_111 = 'mem-font 111',
  MEM_FONT_112 = 'mem-font 112',
  MEM_FONT_113 = 'mem-font 113',
  MEM_FONT_114 = 'mem-font 114',
  MEM_FONT_115 = 'mem-font 115',
  MEM_FONT_116 = 'mem-font 116',
  MEM_FONT_117 = 'mem-font 117',
  MEM_FONT_118 = 'mem-font 118',
  MEM_FONT_119 = 'mem-font 119',
  MEM_FONT_120 = 'mem-font 120',
  MEM_FONT_121 = 'mem-font 121',
  MEM_FONT_122 = 'mem-font 122',
  MEM_FONT_123 = 'mem-font 123',
  MEM_FONT_124 = 'mem-font 124',
  MEM_FONT_125 = 'mem-font 125',
  MEM_FONT_126 = 'mem-font 126',
  MEM_FONT_127 = 'mem-font 127',
  MOUNTAIN = 'mountain ',
  MOUNTAIN_SHADOW = 'mountain shadow'
}

export const ReverseAnimationID: Readonly<
  Readonly<Reverse<typeof AnimationID>>
> = Object.freeze(ObjectUtil.reverse(AnimationID))
