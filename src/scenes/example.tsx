import {makeScene2D} from '@motion-canvas/2d';
import {beginSlide, createRef} from '@motion-canvas/core';
import {
  CodeBlock,
  edit,
  insert,
} from '@motion-canvas/2d/lib/components/CodeBlock'

export default makeScene2D(function* (view) {
  const codeRef = createRef<CodeBlock>();
  view.fill('#1e1e2e'); 
  yield view.add(<CodeBlock ref={codeRef} code={``} />);

  yield* codeRef().edit(1.2, false)`${insert('var myBool = true')};`;


  yield* beginSlide('first slide');

  yield* codeRef().edit(1.2, false)`var myBool${insert(' = true')};`;

  yield* beginSlide('second slide');

  yield* codeRef().edit(1.2, false)`var myBool = ${edit('true', 'false')};`;
  
});