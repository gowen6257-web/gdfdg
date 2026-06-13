// ========== 场景 4：雷暴云层（300-400m）— 参考图 4 还原 ==========
// 依赖全局：ctx, GAME_WIDTH, GAME_HEIGHT, height

function drawScene4(alpha, h) {
    if (alpha <= 0.01) return;
    ctx.globalAlpha = alpha;
    const shift = (h - 300) * 3.5;

    // 天空底色（深灰蓝，非纯黑）
    ctx.fillStyle = '#18181F';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // 积雨云：多层重叠，共 24 个云团，分 3 层
    // 底层暗云（10 朵）
    const darkClouds = [
        {x: 60, y: 280, rx: 100, ry: 50}, {x: 200, y: 310, rx: 130, ry: 60},
        {x: 340, y: 290, rx: 110, ry: 55}, {x: 30, y: 350, rx: 90, ry: 45},
        {x: 150, y: 380, rx: 120, ry: 55}, {x: 300, y: 370, rx: 100, ry: 50},
        {x: 80, y: 420, rx: 110, ry: 52}, {x: 260, y: 430, rx: 90, ry: 48},
        {x: 370, y: 410, rx: 85, ry: 45}, {x: 40, y: 460, rx: 95, ry: 50}
    ];
    darkClouds.forEach(c => {
        const cy = c.y + shift;
        if (cy > -80 && cy < GAME_HEIGHT + 80) {
            ctx.fillStyle = '#2A2A3A';
            ctx.beginPath(); ctx.ellipse(c.x, cy, c.rx, c.ry, 0, 0, Math.PI * 2); ctx.fill();
            // 底部压暗
            ctx.fillStyle = 'rgba(20,20,30,0.4)';
            ctx.beginPath(); ctx.ellipse(c.x, cy + c.ry * 0.4, c.rx * 0.9, c.ry * 0.5, 0, 0, Math.PI * 2); ctx.fill();
        }
    });

    // 中层云（8 朵）
    const midClouds = [
        {x: 100, y: 180, rx: 120, ry: 55}, {x: 280, y: 160, rx: 110, ry: 50},
        {x: 50, y: 220, rx: 90, ry: 45}, {x: 200, y: 240, rx: 100, ry: 48},
        {x: 350, y: 210, rx: 95, ry: 46}, {x: 140, y: 130, rx: 105, ry: 52},
        {x: 320, y: 120, rx: 85, ry: 42}, {x: 30, y: 160, rx: 80, ry: 40}
    ];
    midClouds.forEach(c => {
        const cy = c.y + shift;
        if (cy > -80 && cy < GAME_HEIGHT + 80) {
            ctx.fillStyle = '#3A3A4A';
            ctx.beginPath(); ctx.ellipse(c.x, cy, c.rx, c.ry, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#4A4A5A';
            ctx.beginPath(); ctx.ellipse(c.x - 15, cy - 8, c.rx * 0.7, c.ry * 0.85, 0, 0, Math.PI * 2); ctx.fill();
        }
    });

    // 顶层亮云（6 朵）
    const topClouds = [
        {x: 150, y: 70, rx: 130, ry: 58}, {x: 300, y: 55, rx: 120, ry: 52},
        {x: 80, y: 100, rx: 100, ry: 48}, {x: 250, y: 90, rx: 110, ry: 50},
        {x: 370, y: 80, rx: 90, ry: 45}, {x: 30, y: 60, rx: 85, ry: 42}
    ];
    topClouds.forEach(c => {
        const cy = c.y + shift;
        if (cy > -80 && cy < GAME_HEIGHT + 80) {
            ctx.fillStyle = '#4A4A5A';
            ctx.beginPath(); ctx.ellipse(c.x, cy, c.rx, c.ry, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#5A5A6A';
            ctx.beginPath(); ctx.ellipse(c.x - 20, cy - 10, c.rx * 0.65, c.ry * 0.8, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#6A6A7A';
            ctx.beginPath(); ctx.ellipse(c.x + 10, cy - 15, c.rx * 0.5, c.ry * 0.7, 0, 0, Math.PI * 2); ctx.fill();
        }
    });

    // 雨线（60 条，斜向 75°）
    ctx.strokeStyle = 'rgba(160,160,170,0.22)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 60; i++) {
        const rx = (i * 47 + 20) % (GAME_WIDTH + 40) - 20;
        const ry = (i * 61 + 150) % (GAME_HEIGHT + 60) + 80 + shift * 0.3;
        const rlen = 15 + (i % 5) * 7;
        if (ry > 0 && ry < GAME_HEIGHT + 30) {
            ctx.beginPath();
            ctx.moveTo(rx, ry);
            ctx.lineTo(rx - 4, ry + rlen);
            ctx.stroke();
        }
    }

    // 雨雾全局覆盖
    ctx.fillStyle = 'rgba(140,140,150,0.06)';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    ctx.globalAlpha = 1;
}