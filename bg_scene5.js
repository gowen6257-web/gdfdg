// ========== 场景 5：近地轨道（400-500m）— 参考图 5 还原 ==========
// 依赖全局：ctx, GAME_WIDTH, GAME_HEIGHT, height

function drawScene5(alpha, h) {
    if (alpha <= 0.01) return;
    ctx.globalAlpha = alpha;
    const shift = (h - 400) * 3.5;

    // 太空背景（极黑 → 深蓝黑）
    const g5 = ctx.createRadialGradient(200, 350, 50, 200, 350, 400);
    g5.addColorStop(0, '#050508');
    g5.addColorStop(1, '#0A0F1E');
    ctx.fillStyle = g5;
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // 稀疏星星（20 颗）
    const s5stars = [
        [20,30],[70,80],[130,40],[200,90],[280,25],[350,60],[40,150],[110,120],[190,170],[260,140],
        [330,190],[60,250],[150,220],[240,260],[310,240],[90,330],[180,300],[270,340],[350,310],[30,280]
    ];
    s5stars.forEach(s => {
        ctx.fillStyle = `rgba(255,255,255,${0.4 + Math.sin(s[0] * 0.5) * 0.3})`;
        ctx.beginPath(); ctx.arc(s[0], s[1], 1 + (s[0] % 3) * 0.3, 0, Math.PI * 2); ctx.fill();
    });

    // 地球（巨大球体，中心在画面下方）
    const earthY = 950 + shift;
    const earthR = 580;

    // 海洋
    ctx.fillStyle = '#1A2A3A';
    ctx.beginPath(); ctx.arc(200, earthY, earthR, Math.PI * 0.85, Math.PI * 0.15, true); ctx.fill();

    // 陆地（3 块贝塞尔曲线大陆，暗灰绿）
    ctx.fillStyle = '#2E3A2E';
    ctx.beginPath();
    ctx.moveTo(20, earthY - 80);
    ctx.bezierCurveTo(60, earthY - 180, 160, earthY - 220, 260, earthY - 160);
    ctx.bezierCurveTo(320, earthY - 130, 360, earthY - 60, 300, earthY - 20);
    ctx.bezierCurveTo(240, earthY + 20, 140, earthY + 10, 80, earthY - 40);
    ctx.bezierCurveTo(40, earthY - 60, 10, earthY - 70, 20, earthY - 80);
    ctx.closePath(); ctx.fill();

    ctx.fillStyle = '#3A4A3A';
    ctx.beginPath();
    ctx.moveTo(280, earthY - 120);
    ctx.bezierCurveTo(340, earthY - 160, 390, earthY - 120, 395, earthY - 60);
    ctx.bezierCurveTo(400, earthY - 10, 360, earthY + 40, 300, earthY + 20);
    ctx.bezierCurveTo(260, earthY + 5, 250, earthY - 50, 280, earthY - 120);
    ctx.closePath(); ctx.fill();

    ctx.fillStyle = '#2E3A2E';
    ctx.beginPath();
    ctx.moveTo(100, earthY + 30);
    ctx.bezierCurveTo(150, earthY + 80, 220, earthY + 100, 280, earthY + 70);
    ctx.bezierCurveTo(330, earthY + 45, 350, earthY + 10, 320, earthY - 20);
    ctx.bezierCurveTo(280, earthY - 40, 200, earthY - 30, 140, earthY - 10);
    ctx.bezierCurveTo(90, earthY + 5, 80, earthY + 20, 100, earthY + 30);
    ctx.closePath(); ctx.fill();

    // 云层（4 条白色云带，半透明椭圆堆叠）
    ctx.fillStyle = 'rgba(220,220,230,0.25)';
    const cloudBands = [
        {x: 140, y: earthY - 140, rx: 90, ry: 18}, {x: 260, y: earthY - 100, rx: 110, ry: 22},
        {x: 180, y: earthY - 50, rx: 130, ry: 25}, {x: 300, y: earthY + 10, rx: 80, ry: 16}
    ];
    cloudBands.forEach(c => {
        ctx.beginPath(); ctx.ellipse(c.x, c.y, c.rx, c.ry, 0.1, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(c.x + 20, c.y + 5, c.rx * 0.7, c.ry * 0.8, -0.05, 0, Math.PI * 2); ctx.fill();
    });

    // 大气层光晕（地球边缘蓝色径向渐变）
    const atmo = ctx.createRadialGradient(200, earthY, earthR - 15, 200, earthY, earthR + 25);
    atmo.addColorStop(0, 'rgba(74,106,138,0)');
    atmo.addColorStop(0.5, 'rgba(74,106,138,0.3)');
    atmo.addColorStop(0.85, 'rgba(90,130,180,0.5)');
    atmo.addColorStop(1, 'rgba(74,106,138,0)');
    ctx.fillStyle = atmo;
    ctx.beginPath(); ctx.arc(200, earthY, earthR + 25, 0, Math.PI * 2); ctx.fill();

    // 晨昏线（暗部覆盖左侧）
    ctx.fillStyle = 'rgba(10,15,30,0.45)';
    ctx.beginPath();
    ctx.moveTo(0, 0); ctx.lineTo(GAME_WIDTH, 0); ctx.lineTo(GAME_WIDTH, earthY);
    ctx.arc(200, earthY, earthR, 0, Math.PI, true);
    ctx.lineTo(0, earthY); ctx.closePath(); ctx.fill();

    // 远处卫星/碎片（3 个光点带轨迹）
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.beginPath(); ctx.arc(80, 120 + shift * 0.05, 1.5, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(80, 120 + shift * 0.05); ctx.lineTo(65, 110 + shift * 0.05); ctx.stroke();

    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.beginPath(); ctx.arc(340, 200 + shift * 0.03, 1, 0, Math.PI * 2); ctx.fill();

    ctx.globalAlpha = 1;
}