// ========== 场景 2：夕阳云层（100-200m）— 参考图 2 还原 ==========
// 依赖全局：ctx, GAME_WIDTH, GAME_HEIGHT, height

function drawScene2(alpha, h) {
    if (alpha <= 0.01) return;
    ctx.globalAlpha = alpha;
    const shift = (h - 100) * 3.5;

    // 天空：深棕 → 暗橙棕 → 柔和棕黄
    const g2 = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
    g2.addColorStop(0, '#3E2B1F');
    g2.addColorStop(0.35, '#6B4423');
    g2.addColorStop(0.7, '#8B5A3A');
    g2.addColorStop(1, '#A67C52');
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // 顶层暗云（4 朵厚重积云）
    const topClouds = [
        {x: 80, y: 60, rx: 75, ry: 28}, {x: 220, y: 45, rx: 90, ry: 32},
        {x: 340, y: 75, rx: 65, ry: 24}, {x: 30, y: 100, rx: 55, ry: 22}
    ];
    topClouds.forEach(c => {
        ctx.fillStyle = '#2E1F16';
        ctx.beginPath(); ctx.ellipse(c.x, c.y + shift * 0.08, c.rx, c.ry, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#3E2B1F';
        ctx.beginPath(); ctx.ellipse(c.x + 10, c.y - 5 + shift * 0.08, c.rx * 0.8, c.ry * 0.9, 0, 0, Math.PI * 2); ctx.fill();
    });

    // 中层云（5 朵蓬松云，暗棕）
    const midClouds = [
        {x: 50, y: 140, rx: 85, ry: 35}, {x: 180, y: 120, rx: 110, ry: 42},
        {x: 320, y: 155, rx: 95, ry: 38}, {x: 380, y: 110, rx: 70, ry: 30},
        {x: 130, y: 190, rx: 120, ry: 45}
    ];
    midClouds.forEach(c => {
        ctx.fillStyle = '#4A3728';
        ctx.beginPath(); ctx.ellipse(c.x, c.y + shift * 0.06, c.rx, c.ry, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#5C4033';
        ctx.beginPath(); ctx.ellipse(c.x - 15, c.y - 8 + shift * 0.06, c.rx * 0.7, c.ry * 0.85, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#4A3728';
        ctx.beginPath(); ctx.ellipse(c.x + 20, c.y + 5 + shift * 0.06, c.rx * 0.6, c.ry * 0.7, 0, 0, Math.PI * 2); ctx.fill();
    });

    // 太阳（大圆盘+3 层柔和光晕）
    const sunY = 480 + shift;
    // 外层光晕
    const gSun3 = ctx.createRadialGradient(200, sunY, 30, 200, sunY, 140);
    gSun3.addColorStop(0, 'rgba(212,194,138,0.12)');
    gSun3.addColorStop(1, 'rgba(212,194,138,0)');
    ctx.fillStyle = gSun3;
    ctx.beginPath(); ctx.arc(200, sunY, 140, 0, Math.PI * 2); ctx.fill();
    // 中层光晕
    const gSun2 = ctx.createRadialGradient(200, sunY, 20, 200, sunY, 90);
    gSun2.addColorStop(0, 'rgba(212,194,138,0.08)');
    gSun2.addColorStop(1, 'rgba(212,194,138,0)');
    ctx.fillStyle = gSun2;
    ctx.beginPath(); ctx.arc(200, sunY, 90, 0, Math.PI * 2); ctx.fill();
    // 内层光晕
    const gSun1 = ctx.createRadialGradient(200, sunY, 15, 200, sunY, 55);
    gSun1.addColorStop(0, 'rgba(212,194,138,0.15)');
    gSun1.addColorStop(1, 'rgba(212,194,138,0)');
    ctx.fillStyle = gSun1;
    ctx.beginPath(); ctx.arc(200, sunY, 55, 0, Math.PI * 2); ctx.fill();
    // 太阳本体
    ctx.fillStyle = '#D4C28A';
    ctx.beginPath(); ctx.arc(200, sunY, 32, 0, Math.PI * 2); ctx.fill();

    // 远山剪影（3 层柔和贝塞尔）
    ctx.fillStyle = '#362618';
    ctx.beginPath();
    ctx.moveTo(0, 440 + shift);
    ctx.bezierCurveTo(40, 410 + shift, 90, 430 + shift, 150, 405 + shift);
    ctx.bezierCurveTo(210, 385 + shift, 270, 415 + shift, 330, 395 + shift);
    ctx.bezierCurveTo(370, 385 + shift, 400, 405 + shift, 400, 440 + shift);
    ctx.lineTo(400, 700 + shift); ctx.lineTo(0, 700 + shift); ctx.closePath(); ctx.fill();

    ctx.fillStyle = '#2A1C14';
    ctx.beginPath();
    ctx.moveTo(0, 470 + shift);
    ctx.bezierCurveTo(50, 440 + shift, 120, 460 + shift, 180, 435 + shift);
    ctx.bezierCurveTo(240, 415 + shift, 300, 445 + shift, 360, 425 + shift);
    ctx.bezierCurveTo(390, 415 + shift, 400, 435 + shift, 400, 470 + shift);
    ctx.lineTo(400, 700 + shift); ctx.lineTo(0, 700 + shift); ctx.closePath(); ctx.fill();

    ctx.fillStyle = '#1E140E';
    ctx.beginPath();
    ctx.moveTo(0, 500 + shift);
    ctx.bezierCurveTo(60, 475 + shift, 140, 495 + shift, 200, 470 + shift);
    ctx.bezierCurveTo(260, 450 + shift, 320, 480 + shift, 380, 460 + shift);
    ctx.bezierCurveTo(400, 455 + shift, 400, 470 + shift, 400, 500 + shift);
    ctx.lineTo(400, 700 + shift); ctx.lineTo(0, 700 + shift); ctx.closePath(); ctx.fill();

    // 水面/地面（底部 35%）
    ctx.fillStyle = '#2E1F16';
    ctx.fillRect(0, 520 + shift, GAME_WIDTH, 200);

    // 水面波纹（水平细线）
    ctx.strokeStyle = 'rgba(120,100,80,0.2)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 12; i++) {
        const wy = 535 + shift + i * 12;
        const ww = 360 - i * 22;
        ctx.beginPath();
        ctx.moveTo(200 - ww / 2, wy);
        ctx.lineTo(200 + ww / 2, wy);
        ctx.stroke();
    }

    // 太阳反射（10 条水平光带，宽度递减）
    for (let i = 0; i < 10; i++) {
        const rw = 100 - i * 9;
        const rx = 200 - rw / 2;
        const ry = 530 + shift + i * 9;
        ctx.fillStyle = `rgba(212,194,138,${0.14 - i * 0.012})`;
        ctx.beginPath(); ctx.ellipse(rx + rw / 2, ry, rw / 2, 2.5, 0, 0, Math.PI * 2); ctx.fill();
    }

    // 全局暖色氛围覆盖
    ctx.fillStyle = 'rgba(166,124,82,0.06)';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    ctx.globalAlpha = 1;
}
