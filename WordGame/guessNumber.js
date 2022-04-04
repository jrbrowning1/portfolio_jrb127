/*
 * number of guess for jotto game
 *
 * @author: Jonathan Browning
*/

const guessString = 
`first
second
third
fourth
fifth
sixth
seventh
eighth
ninth
tenth
eleventh
twelfth
thirteenth
fourteenth
fifthteenth
sixteenth
`.split('\n').map(x => x.trim()).filter(x => x.length > 0);