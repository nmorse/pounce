var cb_words = {
  'cb-init': {fn: function(s) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    s.push(ctx);
    return [s];
  }},
  'cb-line': {fn: function(s) {
    const x1 = s.pop();
    const y1 = s.pop();
    const x2 = s.pop();
    const y2 = s.pop();
    const ctx = s[s.length - 1];
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    return [s];
  }},
  'cb-box': {fn: function(s) {
    const d = s.pop();
    if (isNumber(d)) {
      const x = d
      const y = s.pop();
      const ctx = s[s.length - 1];
      ctx.fillStyle = 'rgb(0, 0, 0)';
      ctx.fillRect(x, y, 50, 50);
    }
    else {
      const ctx = s[s.length - 1];
      ctx.fillStyle = 'rgba('+d.color.r+', '+d.color.g+', '+d.color.b+', '+d.color.a+')';
      ctx.fillRect(d.x, d.y, d.w, d.h);
    }
    return [s];
  }},
  'cb-clear': {fn: function(s) {
    const ctx = s[s.length - 1];
    ctx.clearRect(0, 0, 300, 300); // clear canvas
    return [s];
  }},
};
words = Object.assign(cb_words, words);