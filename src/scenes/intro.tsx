import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Txt, Rect, Line, Spline} from '@motion-canvas/2d/lib/components'
import { Direction, SimpleSignal, Vector2, all, beginSlide, createRef, createSignal, makeRef, range, waitFor, waitUntil } from '@motion-canvas/core';

export default makeScene2D(function* (view) {

  const bg = "#1e1e2e";

  view.fill(bg); 

  const txts: Txt[] = [];
  const rects: Rect[] = [];

  const FRONTEND = 0;
  const TRAEFIK = 1;
  const AUTH = 2;
  const BACKEND = 3;
  const MYSQL = 4;
  const S3 = 5;
  const REDIS = 6;
  const CHUNK = 7;
  const CONVERTER = 8;
  const THUMBNAILER = 9;
  const STATUSWORKER = 10;

  let getComponent = function(index: number): [Rect, Txt] {
    return [rects[index], txts[index]];
  }

  const components = [
    "Frontend", 
    "Traefik", 
    "Auth-svc", 
    "Backend", 
    "MySQL", 
    "S3", 
    "Redis Work Queue",
    "Chunk Worker",
    "Converter Worker",
    "Thumbnail Worker",
    "Status Worker",
  ];

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
        justifyContent={'center'}
        textAlign={'center'}
        textWrap
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
  var firstLines: Line[] = []

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
    apiGateText.y(0, 1),
    apiGateText.fontSize(30,1),
    apiGateBox.width(size * 3, 1),
    apiGateBox.height(size*6, 1),
  )

  {
    var start1 = frontendBox.position().addX(frontendBox.size().x/2)
    var end1 = Vector2.createSignal(start1)
    var status = createSignal(0.0);

    // Add lines.
    yield view.add(
      <Line
        lineWidth={5}
        stroke={'#ff6470'}
        endArrow
        startArrow
        ref={makeRef(firstLines, firstLines.length)}
        arrowSize={10}
        points={[start1, () => end1().lerp(apiGateBox.position().addX(-apiGateBox.size().x / 2), status())]}
      />
    )

    yield* status(1.0, 1)
  }


  //==================//
  //                  //
  //   Auth Service   //
  //                  //
  //==================//

  var [authBox, authText] = getComponent(AUTH)

  // Make visible.
  yield* all(
    authBox.opacity(1, 0.5),
    authText.opacity(1, 0.5),
  )

  var authPos = apiGateBox.position().addY(-(70 + (authBox.size().y/2) + (apiGateBox.size().y / 2)))
  // Move auth to be on top of api box.
  yield* all(
    authBox.position(authPos, 1),
    authText.position(authPos, 1)
  )

  {
    var start1 = authBox.position().addY(authBox.size().y/2)
    var end1 = Vector2.createSignal(start1)
    var status = createSignal(0.0);

    // Add lines.
    yield view.add(
      <Line
        lineWidth={5}
        stroke={'#ff6470'}
        endArrow
        startArrow
        ref={makeRef(firstLines, firstLines.length)}
        arrowSize={10}
        points={[start1, () => end1().lerp(apiGateBox.position().addY(-apiGateBox.size().y / 2), status())]}
      />
    )

    yield* status(1.0, 1)
  }

  //=================//
  //                 //
  // Backend Service //
  //                 //
  //=================//

  var [backendBox, backendText] = getComponent(BACKEND)

  // Make visible.
  yield* all(
    backendBox.opacity(1, 0.5),
    backendText.opacity(1, 0.5),
  )
  var backendPos = apiGateBox.position().addX(apiGateBox.size().x/2 + backendBox.size().x/2 + 125)

  // Put next to traefik.
  yield* all(
    backendBox.position(backendPos, 0.5),
    backendBox.size(size*4, 0.5),
    backendText.position(backendPos, 0.5)
  )

  {
    var start1 = apiGateBox.position().addX(apiGateBox.size().x/2)
    var end1 = Vector2.createSignal(start1)
    var status = createSignal(0.0);

    // Add lines.
    yield view.add(
      <Line
        lineWidth={5}
        stroke={'#ff6470'}
        endArrow
        startArrow
        ref={makeRef(firstLines, firstLines.length)}
        arrowSize={10}
        points={[start1, () => end1().lerp(backendBox.position().addX(-backendBox.size().x / 2), status())]}
      />
    )

    yield* status(1.0, 1)
  }

  //==================//
  //                  //
  // MYSQL, REDIS, S3 //
  //                  //
  //==================//
  var [MYSQLBox, MYSQLText] = getComponent(MYSQL)
  var MYSQLPos = backendBox.position().addY(backendBox.size().y/2 + MYSQLBox.size().y/2 + 170)

  var [REDISBox, REDISText] = getComponent(REDIS)
  var REDISPos = new Vector2(420, -350)

  var [S3Box, S3Text] = getComponent(S3)
  var S3Pos = MYSQLPos.addX(-(MYSQLBox.size().x/2 + 50))

  // Make visible.
  yield* all(
    MYSQLBox.opacity(1, 0.5),
    MYSQLText.opacity(1, 0.5),
    MYSQLBox.size.x(size*3, 0.5),
    MYSQLBox.size.y(size*4, 0.5),
    MYSQLBox.position(S3Pos, 0.5),
    MYSQLText.position(S3Pos, 0.5),

    REDISBox.opacity(1, 0.5),
    REDISText.opacity(1, 0.5),
    REDISBox.size.x(size*3, 0.5),
    REDISBox.size.y(size*4, 0.5),
    REDISText.size.x(size*3, 0.5),
    REDISText.size.y(size*4, 0.5),
    REDISText.fontSize(30, 0.5),
    REDISBox.position(REDISPos, 0.5),
    REDISText.position(REDISPos, 0.5),

    S3Box.opacity(1, 0.5),
    S3Text.opacity(1, 0.5),
    S3Box.size.x(size*3, 0.5),
    S3Box.size.y(size*4, 0.5),
    S3Text.fontSize(30, 0.5),
    S3Box.position(MYSQLPos, 0.5),
    S3Text.position(MYSQLPos, 0.5),
  )

  var redisLine = createRef<Line>();
  var s3Line = createRef<Line>();
  var mysqlLine = createRef<Line>();

  {
    var status = createSignal(0.0);
    {
      // MYSQL
      var start1 = backendBox.position().addY(backendBox.size().y/2)
      var end1 = Vector2.createSignal(start1)

      // REDIS
      var start2 = backendBox.position().addY(-(backendBox.size().y/2))

      // S3
      var start3 = backendBox.position().addY(backendBox.size().y/2).addX(-(backendBox.size().x/4))


      // Add lines.
      yield view.add(
      <>
        <Line
          lineWidth={5}
          stroke={'#ff6470'}
          endArrow
          startArrow
          arrowSize={10}
          end={0.5}
          start={0.5}
          ref={mysqlLine}
          points={[start1, S3Box.position().addY(-S3Box.size().y / 2)]}
        />
        <Line
          lineWidth={5}
          stroke={'#ff6470'}
          endArrow
          startArrow
          arrowSize={10}
          ref={redisLine}
          points={[start2, new Vector2(backendBox.position().x, REDISBox.position().y), REDISBox.position().addX(-REDISBox.size().x / 2)]}
          end={0.5}
          start={0.5}
        />
        <Line
          lineWidth={5}
          stroke={'#ff6470'}
          endArrow
          startArrow
          arrowSize={10}
          ref={s3Line}
          end={0.5}
          start={0.5}
          points={[start3, MYSQLBox.position().addY(-MYSQLBox.size().y / 2)]}
        />
      </>
    )
    yield* all (
      status(1.0, 1),
      redisLine().end(1, 1),
      redisLine().start(0, 1),
      s3Line().end(1, 1),
      s3Line().start(0, 1),
      mysqlLine().end(1, 1),
      mysqlLine().start(0, 1),
    )
    }
  }

  //===================//
  //                   //
  //      WORKERS      //
  //                   //
  //===================//
  const [CHUNKBox, CHUNKText] = getComponent(CHUNK)
  const [CONVERTERBox, CONVERTERText] = getComponent(CONVERTER)
  const [THUMBNAILERBox, THUMBNAILERText] = getComponent(THUMBNAILER)
  const [STATUSWORKERBox, STATUSWORKERText] = getComponent(STATUSWORKER)

  // Make visible.
  yield* all(
    CHUNKBox.opacity(1, 0.5),
    CHUNKText.opacity(1, 0.5),
    CHUNKText.fontSize(25, 0.5),

    CONVERTERBox.opacity(1, 0.5),
    CONVERTERText.opacity(1, 0.5),
    CONVERTERText.fontSize(25, 0.5),

    THUMBNAILERBox.opacity(1, 0.5),
    THUMBNAILERText.opacity(1, 0.5),
    THUMBNAILERText.fontSize(25, 0.5),

    STATUSWORKERBox.opacity(1, 0.5),
    STATUSWORKERText.opacity(1, 0.5),
    STATUSWORKERText.fontSize(25, 0.5),
  )

  let CHUNKPos = new Vector2(REDISBox.position().x - size*1.5 - 5, 0)
  let THUMBNAILERPos = CHUNKPos.addX(-(size*3 + 10))

  let CONVERTERPos = new Vector2(REDISBox.position().x + size*1.5 + 5, 0)
  let STATUSWORKERPos = CONVERTERPos.addX(size*3 + 10)


  // Put next to traefik.
  yield* all(
    CHUNKBox.position(CHUNKPos, 0.5),
    CHUNKBox.size(size*3, 0.5),
    CHUNKText.size(size*3, 0.5),
    CHUNKText.position(CHUNKPos, 0.5),

    CONVERTERBox.position(CONVERTERPos, 0.5),
    CONVERTERBox.size(size*3, 0.5),
    CONVERTERText.size(size*3, 0.5),
    CONVERTERText.position(CONVERTERPos, 0.5),

    THUMBNAILERBox.position(THUMBNAILERPos, 0.5),
    THUMBNAILERBox.size(size*3, 0.5),
    THUMBNAILERText.size(size*3, 0.5),
    THUMBNAILERText.position(THUMBNAILERPos, 0.5),

    STATUSWORKERBox.position(STATUSWORKERPos, 0.5),
    STATUSWORKERBox.size(size*3, 0.5),
    STATUSWORKERText.size(size*3, 0.5),
    STATUSWORKERText.position(STATUSWORKERPos, 0.5),
  )

  const lines: Line[] = [];
  {
    var midpoint = new Vector2(
      REDISBox.position().x, (CHUNKBox.top().y + REDISBox.bottom().y)/2
    );


    // Add lines.
    yield view.add(
    <>
      <Line
        lineWidth={5}
        stroke={'#ff6470'}
        endArrow
        arrowSize={10}
        end={0}
        ref={makeRef(lines, 0)}
        points={[midpoint, REDISBox.bottom()]}
      />
      <Line
        lineWidth={5}
        stroke={'#ff6470'}
        endArrow
        arrowSize={10}
        end={0}
        ref={makeRef(lines, 1)}
        points={[midpoint, new Vector2(THUMBNAILERBox.position().x, midpoint.y), THUMBNAILERBox.top()]}
      />
      <Line
        lineWidth={5}
        stroke={'#ff6470'}
        endArrow
        arrowSize={10}
        end={0}
        ref={makeRef(lines, 2)}
        points={[midpoint, new Vector2(CONVERTERBox.position().x, midpoint.y), CONVERTERBox.top()]}
      />
      <Line
        lineWidth={5}
        stroke={'#ff6470'}
        endArrow
        arrowSize={10}
        end={0}
        ref={makeRef(lines, 3)}
        points={[midpoint, new Vector2(STATUSWORKERBox.position().x, midpoint.y), STATUSWORKERBox.top()]}
      />
      <Line
        lineWidth={5}
        stroke={'#ff6470'}
        endArrow
        arrowSize={10}
        end={0}
        ref={makeRef(lines, 4)}
        points={[midpoint, new Vector2(CHUNKBox.position().x, midpoint.y), CHUNKBox.top()]}
      />
      </>
    )

    yield* all(
      lines[0].end(1, 1),
      lines[0].start(0, 1),

      lines[1].end(1, 1),
      lines[2].end(1, 1),
      lines[3].end(1, 1),
      lines[4].end(1, 1),
    );
  }

  const returnLines: Line[] = [];
  const splineLine = createRef<Spline>();
  // lines from the worker to S3.
  {
    

    let lowerMid = CHUNKBox.bottom().addY(-(midpoint.y-CONVERTERBox.top().y))

    // Add lines.
    yield view.add(
    <>
      <Line
        lineWidth={5}
        stroke={'#ff6470'}
        endArrow
        arrowSize={10}
        end={0}
        ref={makeRef(returnLines, 0)}
        points={[THUMBNAILERBox.bottom(), new Vector2(THUMBNAILERBox.x(), lowerMid.y), lowerMid]}
      />
      <Line
        lineWidth={5}
        stroke={'#ff6470'}
        endArrow
        arrowSize={10}
        end={0}
        ref={makeRef(returnLines, 1)}
        points={[CHUNKBox.bottom(), new Vector2(CHUNKBox.x(), lowerMid.y), lowerMid]}
      />
      <Line
        lineWidth={5}
        stroke={'#ff6470'}
        endArrow
        arrowSize={10}
        end={0}
        ref={makeRef(returnLines, 2)}
        points={[CONVERTERBox.bottom(), new Vector2(CONVERTERBox.x(), lowerMid.y), lowerMid]}
      />
      <Line
        lineWidth={5}
        stroke={'#ff6470'}
        endArrow
        arrowSize={10}
        end={0}
        ref={makeRef(returnLines, 3)}
        points={[lowerMid, new Vector2(lowerMid.x, S3Box.y()), S3Box.right()]}
      />
      <Spline
        lineWidth={5}
        stroke={'#ff6470'}
        endArrow
        arrowSize={10}
        end={0}
        ref={splineLine}
        points={[STATUSWORKERBox.bottom(), STATUSWORKERBox.bottom().addY(50), [560, 170], [750, 430], [580, 400], [395, 387], [219, 482], [-2, 344], [-104, 502], MYSQLBox.bottom().addY(50), MYSQLBox.bottom() ]}
      />
      </>
    )

    yield* all(
      returnLines[0].end(1, 1),
      returnLines[0].endArrow(false, 1),

      returnLines[1].end(1, 1),
      returnLines[1].endArrow(false, 1),

      returnLines[2].end(1, 1),
      returnLines[2].endArrow(false, 1),
    );

    yield* returnLines[3].end(1, 1);

    yield* splineLine().end(1,1);
  }

  
  //================//
  //                //
  //   End of map   //
  //                //
  //================//

  yield* beginSlide("Explaining frontend")

  // Let's focus on the frontend.
  yield* all (
    ...rects.filter(rect => rect != frontendBox).map(rect =>
      rect.opacity(0, 1)
    ),
    ...txts.filter(txt => txt != frontendText).map(txt =>
      txt.opacity(0, 1)
    ),
    ...returnLines.map(line =>
      line.opacity(0, 1)
    ),
    ...lines.map(line =>
      line.opacity(0, 1)
    ),
    ...firstLines.map(line =>
      line.opacity(0, 1)
    ),
    splineLine().opacity(0, 1),
    redisLine().opacity(0, 1),
    s3Line().opacity(0, 1),
    mysqlLine().opacity(0, 1),
  )

  yield* all (
    frontendBox.size('200%', 1),
    frontendBox.position(Vector2.zero, 1),
    frontendText.position(Vector2.zero, 1),
  )

  var front_end_lines: Line[] = []
  yield view.add(
    <Spline
    ref={makeRef(front_end_lines, front_end_lines.length)}
    stroke={'#f38ba8'}
    lineWidth={5}
    end={0}
    points={[
        () => frontendText.bottomLeft(),
        () => frontendText.bottomRight(),
    ]}
    />
  )

  yield* all (
    frontendText.position(Vector2.zero.addY(-450), 1),
    frontendBox.fill(bg, 1),
    front_end_lines[front_end_lines.length-1].end(1, 1)
  )


  yield* beginSlide("Explaining frontend interface")
});