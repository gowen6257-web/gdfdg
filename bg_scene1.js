// ========== 场景 1：家门口（0-100m）— 参考图 1 还原 ==========
// 依赖全局：ctx, GAME_WIDTH, GAME_HEIGHT, height

function drawScene1(alpha, h) {
    if (alpha <= 0.01) return;
    ctx.globalAlpha = alpha;
    const shift = h * 3.5;

    // 天空：柔和天蓝 → 灰紫 → 米杏
    const g1 = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
    g1.addColorStop(0, '#8ECAE6');
    g1.addColorStop(0.45, '#B8B8D1');
    g1.addColorStop(1, '#F0E6D3');
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // 阳光射线（7 条斜向贝塞尔带状，极淡）
    ctx.fillStyle = 'rgba(255,250,230,0.06)';
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        const ox = 280 + i * 40;
        ctx.moveTo(ox, 0);
        ctx.lineTo(ox + 120, 0);
        ctx.bezierCurveTo(ox + 80, 250, ox - 40, 500, ox - 100, GAME_HEIGHT);
        ctx.lineTo(ox - 160, GAME_HEIGHT);
        ctx.bezierCurveTo(ox - 80, 500, ox + 40, 250, ox - 40, 0);
        ctx.closePath(); ctx.fill();
    }

    // 光斑 bokeh（18 个柔和椭圆）
    const bokeh = [
        [45,90,6],[120,60,4],[280,110,8],[340,80,5],[80,200,7],[220,170,4],
        [310,240,9],[150,280,5],[260,320,6],[60,380,4],[180,360,7],[330,400,5],
        [100,450,8],[250,480,4],[370,440,6],[200,520,5],[140,580,7],[290,560,4]
    ];
    bokeh.forEach(b => {
        ctx.fillStyle = `rgba(255,255,240,${0.15 + b[2] * 0.02})`;
        ctx.beginPath(); ctx.ellipse(b[0], b[1] + shift * 0.08, b[2], b[2] * 0.9, 0, 0, Math.PI * 2); ctx.fill();
    });

    // 柔和云朵（3 朵）
    const clouds = [[100,140,70,22],[260,100,90,28],[340,180,60,18]];
    clouds.forEach(c => {
        ctx.fillStyle = 'rgba(255,255,255,0.35)';
        ctx.beginPath(); ctx.ellipse(c[0], c[1] + shift * 0.05, c[2], c[3], 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(c[0] - 25, c[1] + 5 + shift * 0.05, c[2] * 0.6, c[3] * 0.8, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(c[0] + 25, c[1] + 3 + shift * 0.05, c[2] * 0.55, c[3] * 0.75, 0, 0, Math.PI * 2); ctx.fill();
    });

    // 远山（第 1 层，灰蓝紫，极淡）
    ctx.fillStyle = '#9AA5B8';
    ctx.beginPath();
    ctx.moveTo(0, 430 + shift);
    ctx.bezierCurveTo(50, 400 + shift, 110, 415 + shift, 160, 395 + shift);
    ctx.bezierCurveTo(220, 375 + shift, 280, 405 + shift, 340, 390 + shift);
    ctx.bezierCurveTo(380, 380 + shift, 400, 400 + shift, 400, 430 + shift);
    ctx.lineTo(400, 700 + shift); ctx.lineTo(0, 700 + shift); ctx.closePath(); ctx.fill();

    // 中山（第 2 层，灰绿）
    ctx.fillStyle = '#8A9A7A';
    ctx.beginPath();
    ctx.moveTo(0, 480 + shift);
    ctx.bezierCurveTo(60, 450 + shift, 130, 470 + shift, 190, 440 + shift);
    ctx.bezierCurveTo(250, 415 + shift, 310, 455 + shift, 360, 435 + shift);
    ctx.bezierCurveTo(390, 425 + shift, 400, 450 + shift, 400, 480 + shift);
    ctx.lineTo(400, 700 + shift); ctx.lineTo(0, 700 + shift); ctx.closePath(); ctx.fill();

    // 近山（第 3 层，深灰绿）
    ctx.fillStyle = '#6A7A5A';
    ctx.beginPath();
    ctx.moveTo(0, 540 + shift);
    ctx.bezierCurveTo(70, 510 + shift, 150, 535 + shift, 220, 505 + shift);
    ctx.bezierCurveTo(290, 480 + shift, 350, 520 + shift, 400, 495 + shift);
    ctx.lineTo(400, 700 + shift); ctx.lineTo(0, 700 + shift); ctx.closePath(); ctx.fill();

    // 山丘上的树林剪影（15 个小圆弧）
    ctx.fillStyle = '#5A6A4A';
    const trees = [30,70,110,160,210,260,300,340,380,50,130,190,250,320,370];
    trees.forEach(tx => {
        const ty = 535 + shift - Math.abs(Math.sin(tx * 0.1)) * 15;
        ctx.beginPath(); ctx.arc(tx, ty, 3 + Math.sin(tx * 0.3) * 2, 0, Math.PI * 2); ctx.fill();
    });

    // 地面（深橄榄褐）
    ctx.fillStyle = '#5A4A3A';
    ctx.fillRect(0, 600 + shift, GAME_WIDTH, 200);

    // 草丛纹理（20 个随机小圆弧）
    ctx.fillStyle = '#4A5A3A';
    for (let i = 0; i < 20; i++) {
        const gx = i * 22 + 8;
        ctx.beginPath(); ctx.arc(gx, 605 + shift + (i % 3) * 2, 3 + (i % 4), Math.PI, 0); ctx.fill();
    }

    // 漂浮气球（9 个 pastel 色椭圆气球+曲线绳）
    const time = Date.now() * 0.001;
    const balloons = [
     //    {x: 55, y: 150, c: '#F4C2C2', s: 1.0}, {x: 115, y: 110, c: '#C2D4F4', s: 0.9},
     //    {x: 175, y: 170, c: '#F4E8C2', s: 1.1}, {x: 235, y: 130, c: '#D4C2F4', s: 0.95},
     //    {x: 295, y: 190, c: '#C2E8D4', s: 1.05}, {x: 355, y: 145, c: '#F4D4C2', s: 0.85},
     //    {x: 85, y: 230, c: '#E8C2D4', s: 0.9}, {x: 200, y: 250, c: '#D4E8C2', s: 1.0},
        {x: 325, y: 270, c: '#C2E0E8', s: 0.95}
    ];
    balloons.forEach(b => {
        const by = b.y + shift * 0.25 + Math.sin(time + b.x * 0.05) * 5;
        ctx.fillStyle = b.c;
        ctx.beginPath();
        ctx.ellipse(b.x, by, 10 * b.s, 13 * b.s, 0, 0, Math.PI * 2);
        ctx.fill();
        // 柔和高光
        ctx.fillStyle = 'rgba(255,255,255,0.35)';
        ctx.beginPath();
        ctx.ellipse(b.x - 3, by - 4, 3.5 * b.s, 4.5 * b.s, -0.3, 0, Math.PI * 2);
        ctx.fill();
        // 结
        ctx.fillStyle = b.c;
        ctx.beginPath();
        ctx.moveTo(b.x - 2, by + 12 * b.s);
        ctx.lineTo(b.x + 2, by + 12 * b.s);
        ctx.lineTo(b.x, by + 15 * b.s);
        ctx.closePath(); ctx.fill();
        // 绳子（贝塞尔曲线）
        ctx.strokeStyle = 'rgba(160,140,120,0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(b.x, by + 15 * b.s);
        ctx.quadraticCurveTo(b.x + 3 + Math.sin(time * 1.5 + b.x) * 4, by + 45, b.x + Math.sin(time + b.x) * 2, by + 70);
        ctx.stroke();
    });

    // 底部暗角覆盖
    const darkGrad = ctx.createLinearGradient(0, 580 + shift, 0, GAME_HEIGHT + shift);
    darkGrad.addColorStop(0, 'rgba(80,70,60,0)');
    darkGrad.addColorStop(1, 'rgba(80,70,60,0.2)');
    ctx.fillStyle = darkGrad;
    ctx.fillRect(0, 580 + shift, GAME_WIDTH, GAME_HEIGHT - 580);

    ctx.globalAlpha = 1;
}
