// ========== 场景 6：外太空（500m+）— 参考图 6 还原 ==========
// 依赖全局：ctx, GAME_WIDTH, GAME_HEIGHT, height

function drawScene6(alpha, h) {
    if (alpha <= 0.01) return;
    ctx.globalAlpha = alpha;
    const shift = (h - 500) * 2.5;

    // 深紫黑背景
    const g6 = ctx.createRadialGradient(200, 350, 30, 200, 350, 450);
    g6.addColorStop(0, '#0A0A12');
    g6.addColorStop(1, '#151520');
    ctx.fillStyle = g6;
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // 星云团 1（左上，淡紫雾）
    const neb1 = ctx.createRadialGradient(80, 150, 10, 80, 150, 180);
    neb1.addColorStop(0, 'rgba(120,100,160,0.1)');
    neb1.addColorStop(1, 'rgba(120,100,160,0)');
    ctx.fillStyle = neb1;
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // 星云团 2（右下，淡蓝雾）
    const neb2 = ctx.createRadialGradient(340, 520, 20, 340, 520, 200);
    neb2.addColorStop(0, 'rgba(100,130,180,0.08)');
    neb2.addColorStop(1, 'rgba(100,130,180,0)');
    ctx.fillStyle = neb2;
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // 星云团 3（中央偏右，淡粉紫）
    const neb3 = ctx.createRadialGradient(250, 300, 15, 250, 300, 140);
    neb3.addColorStop(0, 'rgba(160,120,140,0.06)');
    neb3.addColorStop(1, 'rgba(160,120,140,0)');
    ctx.fillStyle = neb3;
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // 星星（40 颗，白色/淡蓝白）
    for (let i = 0; i < 40; i++) {
        const sx = (i * 53 + 15) % GAME_WIDTH;
        const sy = (i * 71 + 25) % GAME_HEIGHT;
        const size = 0.8 + (i % 5) * 0.35;
        const blueness = i % 3 === 0 ? '220,230,255' : '255,255,255';
        ctx.fillStyle = `rgba(${blueness},${0.5 + (i % 4) * 0.12})`;
        ctx.beginPath(); ctx.arc(sx, sy + shift * 0.02, size, 0, Math.PI * 2); ctx.fill();
        // 部分带十字
        if (i % 7 === 0) {
            ctx.strokeStyle = `rgba(${blueness},0.15)`;
            ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.moveTo(sx - 3, sy + shift * 0.02); ctx.lineTo(sx + 3, sy + shift * 0.02); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(sx, sy + shift * 0.02 - 3); ctx.lineTo(sx, sy + shift * 0.02 + 3); ctx.stroke();
        }
    }

    // 小行星（8 颗，不规则贝塞尔岩石，灰紫色）
    const roids = [
        {x: 70, y: 130, r: 22, pts: [[1,0.3],[0.8,0.9],[0.2,1.1],[-0.4,0.8],[-0.9,0.2],[-0.6,-0.5],[0.1,-0.9],[0.7,-0.6]]},
        {x: 340, y: 280, r: 30, pts: [[0.9,0.1],[1.05,0.6],[0.7,1.0],[0.1,1.15],[-0.5,0.9],[-0.8,0.4],[-0.6,-0.3],[0.2,-0.8],[0.6,-0.5]]},
        {x: 50, y: 430, r: 18, pts: [[1,0.2],[0.85,0.8],[0.3,1.0],[-0.3,0.85],[-0.8,0.3],[-0.5,-0.4],[0.2,-0.9],[0.7,-0.4]]},
        {x: 360, y: 120, r: 14, pts: [[1,0.1],[0.9,0.7],[0.4,0.95],[-0.2,0.8],[-0.7,0.4],[-0.5,-0.2],[0.1,-0.85],[0.6,-0.5]]},
        {x: 200, y: 560, r: 35, pts: [[1,0.2],[0.95,0.7],[0.6,1.05],[0.1,1.1],[-0.4,0.95],[-0.8,0.5],[-0.7,-0.1],[-0.3,-0.7],[0.3,-0.95],[0.7,-0.6]]},
        {x: 120, y: 630, r: 20, pts: [[0.95,0.3],[0.8,0.85],[0.2,1.05],[-0.4,0.9],[-0.75,0.4],[-0.55,-0.2],[0,-0.85],[0.5,-0.6],[0.7,-0.3]]},
        {x: 310, y: 490, r: 16, pts: [[1,0.15],[0.85,0.75],[0.35,0.95],[-0.25,0.8],[-0.7,0.35],[-0.5,-0.25],[0.1,-0.8],[0.6,-0.5]]},
        {x: 35, y: 310, r: 19, pts: [[0.9,0.25],[0.75,0.8],[0.25,1.0],[-0.35,0.85],[-0.75,0.3],[-0.55,-0.3],[0.05,-0.85],[0.55,-0.55]]}
    ];

    roids.forEach(a => {
        const ay = a.y + shift * 0.3;
        if (ay < -60 || ay > GAME_HEIGHT + 60) return;
        ctx.save();
        ctx.translate(a.x, ay);
        ctx.rotate(shift * 0.0003);

        // 不规则主体
        ctx.fillStyle = '#4A4A5A';
        ctx.beginPath();
        a.pts.forEach((p, i) => {
            const angle = (Math.PI * 2 / a.pts.length) * i - 0.2;
            const rad = a.r * p[0];
            const px = Math.cos(angle) * rad;
            const py = Math.sin(angle) * rad * p[1];
            if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        });
        ctx.closePath(); ctx.fill();

        // 陨石坑（3 个深色凹陷）
        const craters = [
            {cx: -a.r * 0.3, cy: -a.r * 0.2, cr: a.r * 0.18},
            {cx: a.r * 0.25, cy: a.r * 0.3, cr: a.r * 0.15},
            {cx: -a.r * 0.1, cy: a.r * 0.45, cr: a.r * 0.12}
        ];
        craters.forEach(c => {
            ctx.fillStyle = '#2A2A3A';
            ctx.beginPath(); ctx.arc(c.cx, c.cy, c.cr, 0, Math.PI * 2); ctx.fill();
            // 坑边缘提亮
            ctx.strokeStyle = '#5A5A6A';
            ctx.lineWidth = 0.8;
            ctx.beginPath(); ctx.arc(c.cx, c.cy, c.cr, 0, Math.PI * 2); ctx.stroke();
        });

        ctx.restore();
    });

    // 远处淡雾
    ctx.fillStyle = 'rgba(180,160,200,0.03)';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    ctx.globalAlpha = 1;
}
