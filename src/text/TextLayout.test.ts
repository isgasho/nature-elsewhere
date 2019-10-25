import {lineHeight, letterHeight} from './memFont.json'
import {Rect} from '../math/Rect'
import {TextLayout} from './TextLayout'
import {XY} from '../math/XY'

describe('layout()', () =>
  test.each(<readonly [string, number, TextLayout][]>[
    ['', Number.MAX_VALUE, {chars: [], cursor: new XY(0, 0 * lineHeight)}],
    [
      ' ',
      Number.MAX_VALUE,
      {chars: [undefined], cursor: new XY(3, 0 * lineHeight)}
    ],
    [
      '\n',
      Number.MAX_VALUE,
      {chars: [undefined], cursor: new XY(0, 1 * lineHeight)}
    ],
    [
      'abc def ghi jkl mno',
      Number.MAX_VALUE,
      {
        chars: [
          Rect.make(0, 0 * lineHeight, 3, letterHeight),
          Rect.make(4, 0 * lineHeight, 3, letterHeight),
          Rect.make(8, 0 * lineHeight, 3, letterHeight),
          undefined,
          Rect.make(14, 0 * lineHeight, 3, letterHeight),
          Rect.make(18, 0 * lineHeight, 3, letterHeight),
          Rect.make(22, 0 * lineHeight, 3, letterHeight),
          undefined,
          Rect.make(28, 0 * lineHeight, 3, letterHeight),
          Rect.make(32, 0 * lineHeight, 3, letterHeight),
          Rect.make(36, 0 * lineHeight, 1, letterHeight),
          undefined,
          Rect.make(40, 0 * lineHeight, 3, letterHeight),
          Rect.make(44, 0 * lineHeight, 3, letterHeight),
          Rect.make(48, 0 * lineHeight, 1, letterHeight),
          undefined,
          Rect.make(52, 0 * lineHeight, 5, letterHeight),
          Rect.make(58, 0 * lineHeight, 3, letterHeight),
          Rect.make(62, 0 * lineHeight, 3, letterHeight)
        ],
        cursor: new XY(65, 0 * lineHeight)
      }
    ],

    [
      'abc def ghi jkl mno',
      10,
      {
        chars: [
          Rect.make(0, 0 * lineHeight, 3, letterHeight),
          Rect.make(4, 0 * lineHeight, 3, letterHeight),
          Rect.make(0, 1 * lineHeight, 3, letterHeight),
          undefined,
          Rect.make(6, 1 * lineHeight, 3, letterHeight),
          Rect.make(0, 2 * lineHeight, 3, letterHeight),
          Rect.make(4, 2 * lineHeight, 3, letterHeight),
          undefined,
          Rect.make(0, 3 * lineHeight, 3, letterHeight),
          Rect.make(4, 3 * lineHeight, 3, letterHeight),
          Rect.make(8, 3 * lineHeight, 1, letterHeight),
          undefined,
          Rect.make(0, 4 * lineHeight, 3, letterHeight),
          Rect.make(4, 4 * lineHeight, 3, letterHeight),
          Rect.make(8, 4 * lineHeight, 1, letterHeight),
          undefined,
          Rect.make(0, 5 * lineHeight, 5, letterHeight),
          Rect.make(6, 5 * lineHeight, 3, letterHeight),
          Rect.make(0, 6 * lineHeight, 3, letterHeight)
        ],
        cursor: new XY(3, 6 * lineHeight)
      }
    ],
    [
      'abc def ghi jkl mno',
      20,
      {
        chars: [
          Rect.make(0, 0 * lineHeight, 3, letterHeight),
          Rect.make(4, 0 * lineHeight, 3, letterHeight),
          Rect.make(8, 0 * lineHeight, 3, letterHeight),
          undefined,
          Rect.make(0, 1 * lineHeight, 3, letterHeight),
          Rect.make(4, 1 * lineHeight, 3, letterHeight),
          Rect.make(8, 1 * lineHeight, 3, letterHeight),
          undefined,
          Rect.make(0, 2 * lineHeight, 3, letterHeight),
          Rect.make(4, 2 * lineHeight, 3, letterHeight),
          Rect.make(8, 2 * lineHeight, 1, letterHeight),
          undefined,
          Rect.make(0, 3 * lineHeight, 3, letterHeight),
          Rect.make(4, 3 * lineHeight, 3, letterHeight),
          Rect.make(8, 3 * lineHeight, 1, letterHeight),
          undefined,
          Rect.make(0, 4 * lineHeight, 5, letterHeight),
          Rect.make(6, 4 * lineHeight, 3, letterHeight),
          Rect.make(10, 4 * lineHeight, 3, letterHeight)
        ],
        cursor: new XY(13, 4 * lineHeight)
      }
    ],
    [
      'abc def ghi jkl mno',
      21,
      {
        chars: [
          Rect.make(0, 0 * lineHeight, 3, letterHeight),
          Rect.make(4, 0 * lineHeight, 3, letterHeight),
          Rect.make(8, 0 * lineHeight, 3, letterHeight),
          undefined,
          Rect.make(0, 1 * lineHeight, 3, letterHeight),
          Rect.make(4, 1 * lineHeight, 3, letterHeight),
          Rect.make(8, 1 * lineHeight, 3, letterHeight),
          undefined,
          Rect.make(0, 2 * lineHeight, 3, letterHeight),
          Rect.make(4, 2 * lineHeight, 3, letterHeight),
          Rect.make(8, 2 * lineHeight, 1, letterHeight),
          undefined,
          Rect.make(12, 2 * lineHeight, 3, letterHeight),
          Rect.make(16, 2 * lineHeight, 3, letterHeight),
          Rect.make(20, 2 * lineHeight, 1, letterHeight),
          undefined,
          Rect.make(0, 3 * lineHeight, 5, letterHeight),
          Rect.make(6, 3 * lineHeight, 3, letterHeight),
          Rect.make(10, 3 * lineHeight, 3, letterHeight)
        ],
        cursor: new XY(13, 3 * lineHeight)
      }
    ],

    [
      'a  b',
      4,
      {
        chars: [
          Rect.make(0, 0 * lineHeight, 3, letterHeight),
          undefined,
          undefined,
          Rect.make(0, 2 * lineHeight, 3, letterHeight)
        ],
        cursor: new XY(3, 2 * lineHeight)
      }
    ],
    [
      'a  b ',
      4,
      {
        chars: [
          Rect.make(0, 0 * lineHeight, 3, letterHeight),
          undefined,
          undefined,
          Rect.make(0, 2 * lineHeight, 3, letterHeight),
          undefined
        ],
        cursor: new XY(0, 3 * lineHeight)
      }
    ]
  ])('%#) %p %p => %p', (string, width, expected) =>
    expect(
      TextLayout.layout(string, width, new XY(1, 1 + 0 * lineHeight))
    ).toStrictEqual(expected)
  ))

describe('layoutWord()', () =>
  test.each(<readonly [XY, number, string, number, TextLayout][]>[
    [
      new XY(0, 0 * lineHeight),
      Number.MAX_VALUE,
      ' ',
      0,
      {chars: [], cursor: new XY(0, 0 * lineHeight)}
    ],
    [
      new XY(0, 0 * lineHeight),
      Number.MAX_VALUE,
      '',
      0,
      {chars: [], cursor: new XY(0, 0 * lineHeight)}
    ],
    [
      new XY(0, 0 * lineHeight),
      Number.MAX_VALUE,
      '\n',
      0,
      {chars: [], cursor: new XY(0, 0 * lineHeight)}
    ],
    [
      new XY(0, 0 * lineHeight),
      Number.MAX_VALUE,
      'a',
      0,
      {
        chars: [Rect.make(0, 0 * lineHeight, 3, letterHeight)],
        cursor: new XY(3, 0 * lineHeight)
      }
    ],
    [
      new XY(0, 0 * lineHeight),
      Number.MAX_VALUE,
      '.',
      0,
      {
        chars: [Rect.make(0, 0 * lineHeight, 1, letterHeight)],
        cursor: new XY(1, 0 * lineHeight)
      }
    ],
    [
      new XY(0, 0 * lineHeight),
      Number.MAX_VALUE,
      'a ',
      0,
      {
        chars: [Rect.make(0, 0 * lineHeight, 3, letterHeight)],
        cursor: new XY(3, 0 * lineHeight)
      }
    ],
    [
      new XY(0, 0 * lineHeight),
      Number.MAX_VALUE,
      'a\n',
      0,
      {
        chars: [Rect.make(0, 0 * lineHeight, 3, letterHeight)],
        cursor: new XY(3, 0 * lineHeight)
      }
    ],
    [
      new XY(0, 0 * lineHeight),
      Number.MAX_VALUE,
      'a a',
      0,
      {
        chars: [Rect.make(0, 0 * lineHeight, 3, letterHeight)],
        cursor: new XY(3, 0 * lineHeight)
      }
    ],
    [
      new XY(0, 0 * lineHeight),
      Number.MAX_VALUE,
      'a.',
      0,
      {
        chars: [
          Rect.make(0, 0 * lineHeight, 3, letterHeight),
          Rect.make(4, 0 * lineHeight, 1, letterHeight)
        ],
        cursor: new XY(5, 0 * lineHeight)
      }
    ],
    [
      new XY(0, 0 * lineHeight),
      Number.MAX_VALUE,
      'aa',
      0,
      {
        chars: [
          Rect.make(0, 0 * lineHeight, 3, letterHeight),
          Rect.make(4, 0 * lineHeight, 3, letterHeight)
        ],
        cursor: new XY(7, 0 * lineHeight)
      }
    ],
    [
      new XY(0, 0 * lineHeight),
      Number.MAX_VALUE,
      'aa\n',
      0,
      {
        chars: [
          Rect.make(0, 0 * lineHeight, 3, letterHeight),
          Rect.make(4, 0 * lineHeight, 3, letterHeight)
        ],
        cursor: new XY(7, 0 * lineHeight)
      }
    ],
    [
      new XY(0, 0 * lineHeight),
      Number.MAX_VALUE,
      'aa aa',
      0,
      {
        chars: [
          Rect.make(0, 0 * lineHeight, 3, letterHeight),
          Rect.make(4, 0 * lineHeight, 3, letterHeight)
        ],
        cursor: new XY(7, 0 * lineHeight)
      }
    ],
    [
      new XY(0, 0 * lineHeight),
      Number.MAX_VALUE,
      'g',
      0,
      {
        chars: [Rect.make(0, 0 * lineHeight, 3, letterHeight)],
        cursor: new XY(3, 0 * lineHeight)
      }
    ],
    [
      new XY(0, 0 * lineHeight),
      Number.MAX_VALUE,
      'abcdefgh',
      0,
      {
        chars: [
          Rect.make(0, 0 * lineHeight, 3, letterHeight),
          Rect.make(4, 0 * lineHeight, 3, letterHeight),
          Rect.make(8, 0 * lineHeight, 3, letterHeight),
          Rect.make(12, 0 * lineHeight, 3, letterHeight),
          Rect.make(16, 0 * lineHeight, 3, letterHeight),
          Rect.make(20, 0 * lineHeight, 3, letterHeight),
          Rect.make(24, 0 * lineHeight, 3, letterHeight),
          Rect.make(28, 0 * lineHeight, 3, letterHeight)
        ],
        cursor: new XY(31, 0 * lineHeight)
      }
    ],

    [
      new XY(0, 0 * lineHeight),
      Number.MAX_VALUE,
      'abcdefgh',
      1,
      {
        chars: [
          Rect.make(0, 0 * lineHeight, 3, letterHeight),
          Rect.make(4, 0 * lineHeight, 3, letterHeight),
          Rect.make(8, 0 * lineHeight, 3, letterHeight),
          Rect.make(12, 0 * lineHeight, 3, letterHeight),
          Rect.make(16, 0 * lineHeight, 3, letterHeight),
          Rect.make(20, 0 * lineHeight, 3, letterHeight),
          Rect.make(24, 0 * lineHeight, 3, letterHeight)
        ],
        cursor: new XY(27, 0 * lineHeight)
      }
    ],
    [
      new XY(0, 0 * lineHeight),
      Number.MAX_VALUE,
      'abcdefgh',
      8,
      {chars: [], cursor: new XY(0, 0 * lineHeight)}
    ],

    [
      new XY(0, 0 * lineHeight),
      0,
      'abcdefgh',
      0,
      {
        chars: [
          Rect.make(0, 0 * lineHeight, 3, letterHeight),
          Rect.make(0, 1 * lineHeight, 3, letterHeight),
          Rect.make(0, 2 * lineHeight, 3, letterHeight),
          Rect.make(0, 3 * lineHeight, 3, letterHeight),
          Rect.make(0, 4 * lineHeight, 3, letterHeight),
          Rect.make(0, 5 * lineHeight, 3, letterHeight),
          Rect.make(0, 6 * lineHeight, 3, letterHeight),
          Rect.make(0, 7 * lineHeight, 3, letterHeight)
        ],
        cursor: new XY(3, 7 * lineHeight)
      }
    ],
    [
      new XY(0, 0 * lineHeight),
      1,
      'abcdefgh',
      0,
      {
        chars: [
          Rect.make(0, 0 * lineHeight, 3, letterHeight),
          Rect.make(0, 1 * lineHeight, 3, letterHeight),
          Rect.make(0, 2 * lineHeight, 3, letterHeight),
          Rect.make(0, 3 * lineHeight, 3, letterHeight),
          Rect.make(0, 4 * lineHeight, 3, letterHeight),
          Rect.make(0, 5 * lineHeight, 3, letterHeight),
          Rect.make(0, 6 * lineHeight, 3, letterHeight),
          Rect.make(0, 7 * lineHeight, 3, letterHeight)
        ],
        cursor: new XY(3, 7 * lineHeight)
      }
    ],
    [
      new XY(0, 0 * lineHeight),
      3,
      'abcdefgh',
      0,
      {
        chars: [
          Rect.make(0, 0 * lineHeight, 3, letterHeight),
          Rect.make(0, 1 * lineHeight, 3, letterHeight),
          Rect.make(0, 2 * lineHeight, 3, letterHeight),
          Rect.make(0, 3 * lineHeight, 3, letterHeight),
          Rect.make(0, 4 * lineHeight, 3, letterHeight),
          Rect.make(0, 5 * lineHeight, 3, letterHeight),
          Rect.make(0, 6 * lineHeight, 3, letterHeight),
          Rect.make(0, 7 * lineHeight, 3, letterHeight)
        ],
        cursor: new XY(3, 7 * lineHeight)
      }
    ],
    [
      new XY(0, 0 * lineHeight),
      5,
      'abcdefgh',
      0,
      {
        chars: [
          Rect.make(0, 0 * lineHeight, 3, letterHeight),
          Rect.make(0, 1 * lineHeight, 3, letterHeight),
          Rect.make(0, 2 * lineHeight, 3, letterHeight),
          Rect.make(0, 3 * lineHeight, 3, letterHeight),
          Rect.make(0, 4 * lineHeight, 3, letterHeight),
          Rect.make(0, 5 * lineHeight, 3, letterHeight),
          Rect.make(0, 6 * lineHeight, 3, letterHeight),
          Rect.make(0, 7 * lineHeight, 3, letterHeight)
        ],
        cursor: new XY(3, 7 * lineHeight)
      }
    ],
    [
      new XY(0, 0 * lineHeight),
      6,
      'abcdefgh',
      0,
      {
        chars: [
          Rect.make(0, 0 * lineHeight, 3, letterHeight),
          Rect.make(0, 1 * lineHeight, 3, letterHeight),
          Rect.make(0, 2 * lineHeight, 3, letterHeight),
          Rect.make(0, 3 * lineHeight, 3, letterHeight),
          Rect.make(0, 4 * lineHeight, 3, letterHeight),
          Rect.make(0, 5 * lineHeight, 3, letterHeight),
          Rect.make(0, 6 * lineHeight, 3, letterHeight),
          Rect.make(0, 7 * lineHeight, 3, letterHeight)
        ],
        cursor: new XY(3, 7 * lineHeight)
      }
    ],
    [
      new XY(0, 0 * lineHeight),
      7,
      'abcdefgh',
      0,
      {
        chars: [
          Rect.make(0, 0 * lineHeight, 3, letterHeight),
          Rect.make(0, 1 * lineHeight, 3, letterHeight),
          Rect.make(0, 2 * lineHeight, 3, letterHeight),
          Rect.make(0, 3 * lineHeight, 3, letterHeight),
          Rect.make(0, 4 * lineHeight, 3, letterHeight),
          Rect.make(0, 5 * lineHeight, 3, letterHeight),
          Rect.make(0, 6 * lineHeight, 3, letterHeight),
          Rect.make(4, 6 * lineHeight, 3, letterHeight)
        ],
        cursor: new XY(7, 6 * lineHeight)
      }
    ],
    [
      new XY(0, 0 * lineHeight),
      8,
      'abcdefgh',
      0,
      {
        chars: [
          Rect.make(0, 0 * lineHeight, 3, letterHeight),
          Rect.make(4, 0 * lineHeight, 3, letterHeight),
          Rect.make(0, 1 * lineHeight, 3, letterHeight),
          Rect.make(4, 1 * lineHeight, 3, letterHeight),
          Rect.make(0, 2 * lineHeight, 3, letterHeight),
          Rect.make(4, 2 * lineHeight, 3, letterHeight),
          Rect.make(0, 3 * lineHeight, 3, letterHeight),
          Rect.make(4, 3 * lineHeight, 3, letterHeight)
        ],
        cursor: new XY(7, 3 * lineHeight)
      }
    ],
    [
      new XY(0, 0 * lineHeight),
      9,
      'abcdefgh',
      0,
      {
        chars: [
          Rect.make(0, 0 * lineHeight, 3, letterHeight),
          Rect.make(4, 0 * lineHeight, 3, letterHeight),
          Rect.make(0, 1 * lineHeight, 3, letterHeight),
          Rect.make(4, 1 * lineHeight, 3, letterHeight),
          Rect.make(0, 2 * lineHeight, 3, letterHeight),
          Rect.make(4, 2 * lineHeight, 3, letterHeight),
          Rect.make(0, 3 * lineHeight, 3, letterHeight),
          Rect.make(4, 3 * lineHeight, 3, letterHeight)
        ],
        cursor: new XY(7, 3 * lineHeight)
      }
    ],
    [
      new XY(0, 0 * lineHeight),
      10,
      'abcdefgh',
      0,
      {
        chars: [
          Rect.make(0, 0 * lineHeight, 3, letterHeight),
          Rect.make(4, 0 * lineHeight, 3, letterHeight),
          Rect.make(0, 1 * lineHeight, 3, letterHeight),
          Rect.make(4, 1 * lineHeight, 3, letterHeight),
          Rect.make(0, 2 * lineHeight, 3, letterHeight),
          Rect.make(4, 2 * lineHeight, 3, letterHeight),
          Rect.make(0, 3 * lineHeight, 3, letterHeight),
          Rect.make(4, 3 * lineHeight, 3, letterHeight)
        ],
        cursor: new XY(7, 3 * lineHeight)
      }
    ],
    [
      new XY(0, 0 * lineHeight),
      11,
      'abcdefgh',
      0,
      {
        chars: [
          Rect.make(0, 0 * lineHeight, 3, letterHeight),
          Rect.make(4, 0 * lineHeight, 3, letterHeight),
          Rect.make(0, 1 * lineHeight, 3, letterHeight),
          Rect.make(4, 1 * lineHeight, 3, letterHeight),
          Rect.make(0, 2 * lineHeight, 3, letterHeight),
          Rect.make(4, 2 * lineHeight, 3, letterHeight),
          Rect.make(0, 3 * lineHeight, 3, letterHeight),
          Rect.make(4, 3 * lineHeight, 3, letterHeight)
        ],
        cursor: new XY(7, 3 * lineHeight)
      }
    ],
    [
      new XY(0, 0 * lineHeight),
      12,
      'abcdefgh',
      0,
      {
        chars: [
          Rect.make(0, 0 * lineHeight, 3, letterHeight),
          Rect.make(4, 0 * lineHeight, 3, letterHeight),
          Rect.make(8, 0 * lineHeight, 3, letterHeight),
          Rect.make(0, 1 * lineHeight, 3, letterHeight),
          Rect.make(4, 1 * lineHeight, 3, letterHeight),
          Rect.make(8, 1 * lineHeight, 3, letterHeight),
          Rect.make(0, 2 * lineHeight, 3, letterHeight),
          Rect.make(4, 2 * lineHeight, 3, letterHeight)
        ],
        cursor: new XY(7, 2 * lineHeight)
      }
    ],

    [
      new XY(1, 0 * lineHeight),
      5,
      'abcdefgh',
      0,
      {
        chars: [
          Rect.make(1, 0 * lineHeight, 3, letterHeight),
          Rect.make(0, 1 * lineHeight, 3, letterHeight),
          Rect.make(0, 2 * lineHeight, 3, letterHeight),
          Rect.make(0, 3 * lineHeight, 3, letterHeight),
          Rect.make(0, 4 * lineHeight, 3, letterHeight),
          Rect.make(0, 5 * lineHeight, 3, letterHeight),
          Rect.make(0, 6 * lineHeight, 3, letterHeight),
          Rect.make(0, 7 * lineHeight, 3, letterHeight)
        ],
        cursor: new XY(3, 7 * lineHeight)
      }
    ],
    [
      new XY(2, 0 * lineHeight),
      5,
      'abcdefgh',
      0,
      {
        chars: [
          Rect.make(0, 1 * lineHeight, 3, letterHeight),
          Rect.make(0, 2 * lineHeight, 3, letterHeight),
          Rect.make(0, 3 * lineHeight, 3, letterHeight),
          Rect.make(0, 4 * lineHeight, 3, letterHeight),
          Rect.make(0, 5 * lineHeight, 3, letterHeight),
          Rect.make(0, 6 * lineHeight, 3, letterHeight),
          Rect.make(0, 7 * lineHeight, 3, letterHeight),
          Rect.make(0, 8 * lineHeight, 3, letterHeight)
        ],
        cursor: new XY(3, 8 * lineHeight)
      }
    ],

    [
      new XY(2, 1 + 0 * lineHeight),
      5,
      'abcdefgh',
      0,
      {
        chars: [
          Rect.make(0, 1 + 1 * lineHeight, 3, letterHeight),
          Rect.make(0, 1 + 2 * lineHeight, 3, letterHeight),
          Rect.make(0, 1 + 3 * lineHeight, 3, letterHeight),
          Rect.make(0, 1 + 4 * lineHeight, 3, letterHeight),
          Rect.make(0, 1 + 5 * lineHeight, 3, letterHeight),
          Rect.make(0, 1 + 6 * lineHeight, 3, letterHeight),
          Rect.make(0, 1 + 7 * lineHeight, 3, letterHeight),
          Rect.make(0, 1 + 8 * lineHeight, 3, letterHeight)
        ],
        cursor: new XY(3, 1 + 8 * lineHeight)
      }
    ]
  ])('%#) %p %p %p %p => %p', (cursor, width, string, index, expected) =>
    expect(
      TextLayout.layoutWord(
        cursor,
        width,
        string,
        index,
        new XY(1, 1 + 0 * lineHeight)
      )
    ).toStrictEqual(expected)
  ))
