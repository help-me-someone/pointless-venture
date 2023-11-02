import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Txt, Rect, Line} from '@motion-canvas/2d/lib/components'
import { Direction, SimpleSignal, Vector2, all, beginSlide, createRef, createSignal, makeRef, range, waitFor, waitUntil } from '@motion-canvas/core';

export default makeScene2D(function* (view) {

  const bg = "#1e1e2e";

  view.fill(bg); 

  const txts: Txt[] = [];
  const rects: Rect[] = [];

  const FRONTEND = 0;
  const TRAEFIK = 1;
  const AUTH = 2;

  let getComponent = function(index: number): [Rect, Txt] {
    return [rects[index], txts[index]];
  }

  const components = ["Frontend", "Traefik", "Auth Service", "MYSQL", "AUTH", "API GATEWAY"];
  const componentsSize = components.length;
  const gap = 150;
  const size = 50;

  yield view.add(
    range(componentsSize).map(i => (
      <Rect
        ref={makeRef(rects, i)}
        opacity={0}
        y={450}
        x={750}
        radius={10}
        width={size * 5}
        height={size}
        fill={'#313244'}
      />
    ))
  )

  yield* beginSlide("init");

  yield view.add(
    range(componentsSize).map(i => (
      <Txt
        ref={makeRef(txts, i)}
        fontSize={40}
        y={450}
        x={750}
        opacity={0}
        fontFamily={'JetBrains Mono'}
        fill={'#cdd6f4'}
        alignItems={'center'}
        alignContent={'center'}
        text={components[i]}
      />
    ))
  )  

  //================//
  //                //
  //    FRONTEND    //
  //                //
  //================//
  
  // Set the position for the frontend.
  // let frontEndIndex: number = 0;
  const [frontendBox, frontendText] = getComponent(FRONTEND)

  // Explain frontend.
  yield* beginSlide("Create map");

  // Make visible.
  yield* all(
    frontendBox.opacity(1, 0.5),
    frontendText.opacity(1, 0.5),
  )

  // Put frontend in position.
  yield* all (
    frontendBox.x(-800, 1),
    frontendBox.y(0, 1),
    frontendText.x(-800, 1),
    frontendText.y(0, 1)
  )

  //=================//
  //                 //
  //   API Gateway   //
  //                 //
  //=================//

  // Set the position for the API gateway.
  const [apiGateBox, apiGateText] = getComponent(TRAEFIK)
  let frontApiLine = createRef<Line>();

  // Make visible.
  yield* all(
    apiGateBox.opacity(1, 0.5),
    apiGateText.opacity(1, 0.5),
  )

  // Put frontend in position.
  yield* all (
    apiGateBox.x(-500, 1),
    apiGateBox.y(0, 1),
    apiGateText.x(-500, 1),
    apiGateText.y(0, 1)
  )
  yield* all (
    apiGateText.fontSize(30,2),
    apiGateBox.width(size * 3, 2),
    apiGateBox.height(size*6, 2),
  )

  var radius = createSignal(0);

  var vDiff = new Vector2(
    apiGateBox.position().x - frontendBox.position().x, 
    apiGateBox.position().y - frontendBox.position().y, 
  );

  var start = frontendBox.position().addX(frontendBox.size().x/2)
  var end = Vector2.createSignal(start)
  var status = createSignal(0.0);

  // Add lines.
  yield view.add(
    <Line
      lineWidth={5}
      stroke={'#ff6470'}
      endArrow
      ref={frontApiLine}
      arrowSize={10}
      points={[start, () => end().lerp(apiGateBox.position().addX(-apiGateBox.size().x / 2), status())]}
    />
  )

  yield* status(1.0, 1)
  yield* waitFor(1);

  //==================//
  //                  //
  //   Auth Service   //
  //                  //
  //==================//

});