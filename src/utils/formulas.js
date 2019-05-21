export const pathFromBezierCurve = (cubicBezierCurve) => {
    const {
        initialAxis, initialControlPoint, endingControlPoint, endingAxis,
    } = cubicBezierCurve;
    return `
      M${initialAxis.x} ${initialAxis.y}
      c ${initialControlPoint.x} ${initialControlPoint.y}
      ${endingControlPoint.x} ${endingControlPoint.y}
      ${endingAxis.x} ${endingAxis.y}
    `;
};

export const radiansToDegrees = radians => ((radians * 180) / Math.PI);

// https://math.stackexchange.com/questions/714378/find-the-angle-that-creating-with-y-axis-in-degrees
export const calculateAngle = (x1, y1, x2, y2) => {
    var comp = 0;
    if ( y2-y1 >= 0) {
        comp = 180;
    }
    const dividend = x2 - x1;
    const divisor = y2 - y1;
    const quotient = dividend / divisor;
    return radiansToDegrees(Math.atan(quotient)) * -1 + comp;
};

export const getCanvasPosition = (event) => {
    // mouse position on auto-scaling canvas
    // https://stackoverflow.com/a/10298843/1232793
    // console.log(5)
    const svg = document.getElementById('aliens-go-home-canvas');
    const point = svg.createSVGPoint();
  
    point.x = event.clientX;
    point.y = event.clientY;
    
    
    const { x, y } = point.matrixTransform(svg.getScreenCTM().inverse());
    
    // console.log(event.clientX, event.clientY)
    return {x, y};
  };