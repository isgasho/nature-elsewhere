import * as NumberUtil from './number-util'

describe('wrap()', () => {
  test.each(
    // prettier-ignore
    [
      // Negative to zero range.
      [ -5  , -1,  0, -1  ],
      [ -4.5, -1,  0,  -.5],
      [ -4  , -1,  0, -1  ],
      [ -3.5, -1,  0,  -.5],
      [ -3  , -1,  0, -1  ],
      [ -2.5, -1,  0,  -.5],
      [ -2  , -1,  0, -1  ],
      [ -1.5, -1,  0,  -.5],
      [ -1  , -1,  0, -1  ],
      [  -.5, -1,  0,  -.5],
      [  0  , -1,  0, -1  ],
      [   .5, -1,  0,  -.5],
      [  1  , -1,  0, -1  ],
      [  1.5, -1,  0,  -.5],
      [  2  , -1,  0, -1  ],
      [  2.5, -1,  0,  -.5],
      [  3  , -1,  0, -1  ],
      [  3.5, -1,  0,  -.5],
      [  4  , -1,  0, -1  ],
      [  4.5, -1,  0,  -.5],
      [  5  , -1,  0, -1  ],

      // Zero to positive range.
      [ -5  ,  0,  1,  0  ],
      [ -4.5,  0,  1,   .5],
      [ -4  ,  0,  1,  0  ],
      [ -3.5,  0,  1,   .5],
      [ -3  ,  0,  1,  0  ],
      [ -2.5,  0,  1,   .5],
      [ -2  ,  0,  1,  0  ],
      [ -1.5,  0,  1,   .5],
      [ -1  ,  0,  1,  0  ],
      [  -.5,  0,  1,   .5],
      [  0  ,  0,  1,  0  ],
      [   .5,  0,  1,   .5],
      [  1  ,  0,  1,  0  ],
      [  1.5,  0,  1,   .5],
      [  2  ,  0,  1,  0  ],
      [  2.5,  0,  1,   .5],
      [  3  ,  0,  1,  0  ],
      [  3.5,  0,  1,   .5],
      [  4  ,  0,  1,  0  ],
      [  4.5,  0,  1,   .5],
      [  5  ,  0,  1,  0  ],

      // Negative to positive range.
      [ -5  , -1,  1, -1  ],
      [ -4.5, -1,  1,  -.5],
      [ -4  , -1,  1,  0  ],
      [ -3.5, -1,  1,   .5],
      [ -3  , -1,  1, -1  ],
      [ -2.5, -1,  1,  -.5],
      [ -2  , -1,  1,  0  ],
      [ -1.5, -1,  1,   .5],
      [ -1  , -1,  1, -1  ],
      [  -.5, -1,  1,  -.5],
      [  0  , -1,  1,  0  ],
      [   .5, -1,  1,   .5],
      [  1  , -1,  1, -1  ],
      [  1.5, -1,  1,  -.5],
      [  2  , -1,  1,  0  ],
      [  2.5, -1,  1,   .5],
      [  3  , -1,  1, -1  ],
      [  3.5, -1,  1,  -.5],
      [  4  , -1,  1,  0  ],
      [  4.5, -1,  1,   .5],
      [  5  , -1,  1, -1  ],

      // Lesser negative range.
      [ -7  , -6, -4, -5  ],
      [ -6.5, -6, -4, -4.5],
      [ -6  , -6, -4, -6  ],
      [ -5.5, -6, -4, -5.5],
      [ -5  , -6, -4, -5  ],
      [ -4.5, -6, -4, -4.5],
      [ -4  , -6, -4, -6  ],
      [ -3.5, -6, -4, -5.5],
      [ -3  , -6, -4, -5  ],
      [ -2.5, -6, -4, -4.5],
      [ -2  , -6, -4, -6  ],
      [ -1.5, -6, -4, -5.5],
      [ -1  , -6, -4, -5  ],
      [  -.5, -6, -4, -4.5],
      [  0  , -6, -4, -6  ],
      [   .5, -6, -4, -5.5],
      [  1  , -6, -4, -5  ],
      [  1.5, -6, -4, -4.5],
      [  2  , -6, -4, -6  ],
      [  2.5, -6, -4, -5.5],
      [  3  , -6, -4, -5  ],
      [  3.5, -6, -4, -4.5],
      [  4  , -6, -4, -6  ],
      [  4.5, -6, -4, -5.5],
      [  5  , -6, -4, -5  ],
      [  5.5, -6, -4, -4.5],
      [  6  , -6, -4, -6  ],
      [  6.5, -6, -4, -5.5],
      [  7  , -6, -4, -5  ],

      // Negative range.
      [-10  , -3, -1, -2  ],
      [ -9.5, -3, -1, -1.5],
      [ -9  , -3, -1, -3  ],
      [ -8.5, -3, -1, -2.5],
      [ -8  , -3, -1, -2  ],
      [ -7.5, -3, -1, -1.5],
      [ -7  , -3, -1, -3  ],
      [ -6.5, -3, -1, -2.5],
      [ -6  , -3, -1, -2  ],
      [ -5.5, -3, -1, -1.5],
      [ -5  , -3, -1, -3  ],
      [ -4.5, -3, -1, -2.5],
      [ -4  , -3, -1, -2  ],
      [ -3.5, -3, -1, -1.5],
      [ -3  , -3, -1, -3  ],
      [ -2.5, -3, -1, -2.5],
      [ -2  , -3, -1, -2  ],
      [ -1.5, -3, -1, -1.5],
      [ -1  , -3, -1, -3  ],
      [  -.5, -3, -1, -2.5],
      [  0  , -3, -1, -2  ],
      [   .5, -3, -1, -1.5],
      [  1  , -3, -1, -3  ],
      [  1.5, -3, -1, -2.5],
      [  2  , -3, -1, -2  ],
      [  2.5, -3, -1, -1.5],
      [  3  , -3, -1, -3  ],
      [  3.5, -3, -1, -2.5],
      [  4  , -3, -1, -2  ],
      [  4.5, -3, -1, -1.5],
      [  5  , -3, -1, -3  ],

      // Positive range.
      [ -5  ,  1,  3,  1  ],
      [ -4.5,  1,  3,  1.5],
      [ -4  ,  1,  3,  2  ],
      [ -3.5,  1,  3,  2.5],
      [ -3  ,  1,  3,  1  ],
      [ -2.5,  1,  3,  1.5],
      [ -2  ,  1,  3,  2  ],
      [ -1.5,  1,  3,  2.5],
      [ -1  ,  1,  3,  1  ],
      [  -.5,  1,  3,  1.5],
      [  0  ,  1,  3,  2  ],
      [   .5,  1,  3,  2.5],
      [  1  ,  1,  3,  1  ],
      [  1.5,  1,  3,  1.5],
      [  2  ,  1,  3,  2  ],
      [  2.5,  1,  3,  2.5],
      [  3  ,  1,  3,  1  ],
      [  3.5,  1,  3,  1.5],
      [  4  ,  1,  3,  2  ],
      [  4.5,  1,  3,  2.5],
      [  5  ,  1,  3,  1  ],

      // Greater positive range.
      [ -7  ,  4,  6,  5  ],
      [ -6.5,  4,  6,  5.5],
      [ -6  ,  4,  6,  4  ],
      [ -5.5,  4,  6,  4.5],
      [ -5  ,  4,  6,  5  ],
      [ -4.5,  4,  6,  5.5],
      [ -4  ,  4,  6,  4  ],
      [ -3.5,  4,  6,  4.5],
      [ -3  ,  4,  6,  5  ],
      [ -2.5,  4,  6,  5.5],
      [ -2  ,  4,  6,  4  ],
      [ -1.5,  4,  6,  4.5],
      [ -1  ,  4,  6,  5  ],
      [  -.5,  4,  6,  5.5],
      [  0  ,  4,  6,  4  ],
      [   .5,  4,  6,  4.5],
      [  1  ,  4,  6,  5  ],
      [  1.5,  4,  6,  5.5],
      [  2  ,  4,  6,  4  ],
      [  2.5,  4,  6,  4.5],
      [  3  ,  4,  6,  5  ],
      [  3.5,  4,  6,  5.5],
      [  4  ,  4,  6,  4  ],
      [  4.5,  4,  6,  4.5],
      [  5  ,  4,  6,  5  ],
      [  5.5,  4,  6,  5.5],
      [  6  ,  4,  6,  4  ],
      [  6.5,  4,  6,  4.5],
      [  7  ,  4,  6,  5  ],

      // Even greater positive range.
      [ 88  ,  90,  95, 93  ],
      [ 88.5,  90,  95, 93.5],
      [ 89  ,  90,  95, 94  ],
      [ 89.5,  90,  95, 94.5],
      [ 90  ,  90,  95, 90  ],
      [ 90.5,  90,  95, 90.5],
      [ 91  ,  90,  95, 91  ],
      [ 91.5,  90,  95, 91.5],
      [ 92  ,  90,  95, 92  ],
      [ 92.5,  90,  95, 92.5],
      [ 93  ,  90,  95, 93  ],
      [ 93.5,  90,  95, 93.5],
      [ 94  ,  90,  95, 94  ],
      [ 94.5,  90,  95, 94.5],
      [ 95  ,  90,  95, 90  ],
      [ 95.5,  90,  95, 90.5],
      [ 96  ,  90,  95, 91  ],
      [ 96.5,  90,  95, 91.5],
      [ 97  ,  90,  95, 92  ],
      [ 97.5,  90,  95, 92.5],
      [ 98  ,  90,  95, 93  ],
      [ 98.5,  90,  95, 93.5],
      [ 99  ,  90,  95, 94  ],
      [ 99.5,  90,  95, 94.5],

      // Negative to positive range with many inputs.
      [-20  , -3,  3, -2  ],
      [-19.5, -3,  3, -1.5],
      [-19  , -3,  3, -1  ],
      [-18.5, -3,  3,  -.5],
      [-18  , -3,  3,  0  ],
      [-17.5, -3,  3,   .5],
      [-17  , -3,  3,  1  ],
      [-16.5, -3,  3,  1.5],
      [-16  , -3,  3,  2  ],
      [-15.5, -3,  3,  2.5],
      [-15  , -3,  3, -3  ],
      [-14.5, -3,  3, -2.5],
      [-14  , -3,  3, -2  ],
      [-13.5, -3,  3, -1.5],
      [-13  , -3,  3, -1  ],
      [-12.5, -3,  3,  -.5],
      [-12  , -3,  3,  0  ],
      [-11.5, -3,  3,   .5],
      [-11  , -3,  3,  1  ],
      [-10.5, -3,  3,  1.5],
      [-10  , -3,  3,  2  ],
      [ -9.5, -3,  3,  2.5],
      [ -9  , -3,  3, -3  ],
      [ -8.5, -3,  3, -2.5],
      [ -8  , -3,  3, -2  ],
      [ -7.5, -3,  3, -1.5],
      [ -7  , -3,  3, -1  ],
      [ -6.5, -3,  3,  -.5],
      [ -6  , -3,  3,  0  ],
      [ -5.5, -3,  3,   .5],
      [ -5  , -3,  3,  1  ],
      [ -4.5, -3,  3,  1.5],
      [ -4  , -3,  3,  2  ],
      [ -3.5, -3,  3,  2.5],
      [ -3  , -3,  3, -3  ],
      [ -2.5, -3,  3, -2.5],
      [ -2  , -3,  3, -2  ],
      [ -1.5, -3,  3, -1.5],
      [ -1  , -3,  3, -1  ],
      [  -.5, -3,  3,  -.5],
      [  0  , -3,  3,  0  ],
      [   .5, -3,  3,   .5],
      [  1  , -3,  3,  1  ],
      [  1.5, -3,  3,  1.5],
      [  2  , -3,  3,  2  ],
      [  2.5, -3,  3,  2.5],
      [  3  , -3,  3, -3  ],
      [  3.5, -3,  3, -2.5],
      [  4  , -3,  3, -2  ],
      [  4.5, -3,  3, -1.5],
      [  5  , -3,  3, -1  ],
      [  5.5, -3,  3,  -.5],
      [  6  , -3,  3,  0  ],
      [  6.5, -3,  3,   .5],
      [  7  , -3,  3,  1  ],
      [  7.5, -3,  3,  1.5],
      [  8  , -3,  3,  2  ],
      [  8.5, -3,  3,  2.5],
      [  9  , -3,  3, -3  ],
      [  9.5, -3,  3, -2.5],
      [ 10  , -3,  3, -2  ],
      [ 10.5, -3,  3, -1.5],
      [ 11  , -3,  3, -1  ],
      [ 11.5, -3,  3,  -.5],
      [ 12  , -3,  3,  0  ],
      [ 12.5, -3,  3,   .5],
      [ 13  , -3,  3,  1  ],
      [ 13.5, -3,  3,  1.5],
      [ 14  , -3,  3,  2  ],
      [ 14.5, -3,  3,  2.5],
      [ 15  , -3,  3, -3  ],
      [ 15.5, -3,  3, -2.5],
      [ 16  , -3,  3, -2  ],
      [ 16.5, -3,  3, -1.5],
      [ 17  , -3,  3, -1  ],
      [ 17.5, -3,  3,  -.5],
      [ 18  , -3,  3,  0  ],
      [ 18.5, -3,  3,   .5],
      [ 19  , -3,  3,  1  ],
      [ 19.5, -3,  3,  1.5],
      [ 20  , -3,  3,  2  ]
    ]
  )('%#) %p wrap [%p,%p]', (x, min, max, expected) =>
    expect(NumberUtil.wrap(x, min, max)).toStrictEqual(expected)
  )
})
