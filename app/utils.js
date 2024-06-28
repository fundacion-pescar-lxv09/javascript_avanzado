export const d = document
export const root = d.getElementById('root');
export const checker = "assets/checker.svg";
export const odd = (n) => n % 2 === 1
export const even = (n) => n % 2 === 0
export const checkCoord = (r,c) => (odd(r) && odd(c)) || (even(r) && even(c))  
