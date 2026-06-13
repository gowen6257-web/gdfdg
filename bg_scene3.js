// ========== 场景 3：月夜星空（200-300m）— 参考图 3 还原 ==========
// 依赖全局：ctx, GAME_WIDTH, GAME_HEIGHT, height

function drawScene3(alpha, h) {
    if (alpha <= 0.01) return;
    ctx.globalAlpha = alpha;
    const shift = (h - 200) * 3.5;

    // 天空：近黑 → 深蓝灰 → 灰蓝
    const g3 = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
    g3.addColorStop(0, '#0D1117');
    g3.addColorStop(0.4, '#1A1F2E');
    g3.addColorStop(1, '#2E3A52');
    ctx.fillStyle = g3;
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // 星星（25 颗，柔和）
    const starPos = [
        [30,50],[80,90],[140,40],[210,80],[280,35],[350,70],[40,150],[120,130],[190,170],[260,140],
        [330,190],[70,250],[160,230],[240,260],[310,240],[50,330],[130,310],[220,340],[300,320],[370,350],
        [90,420],[180,400],[270,430],[340,410],[20,380]
    ];
    starPos.forEach((s, i) => {
        const size = 1 + (i % 4) * 0.4;
        ctx.fillStyle = `rgba(255,255,255,${0.5 + (i % 3) * 0.15})`;
        ctx.beginPath(); ctx.arc(s[0], s[1] + shift * 0.02, size, 0, Math.PI * 2); ctx.fill();
        // 部分星星带十字
        if (i % 5 === 0) {
            ctx.strokeStyle = `rgba(255,255,255,0.2)`;
            ctx.lineWidth = 0.6;
            ctx.beginPath(); ctx.moveTo(s[0] - 4, s[1] + shift * 0.02); ctx.lineTo(s[0] + 4, s[1] + shift * 0.02); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(s[0], s[1] + shift * 0.02 - 4); ctx.lineTo(s[0], s[1] + shift * 0.02 + 4); ctx.stroke();
        }
    });

    // 流星（4 条斜向渐变线）
    const meteors = [[340,30,260,100],[90,60,30,130],[380,180,300,260],[60,200,-10,280]];
    meteors.forEach(m => {
        const grad = ctx.createLinearGradient(m[0], m[1] + shift * 0.03, m[2], m[3] + shift * 0.03);
        grad.addColorStop(0, 'rgba(255,255,255,0.5)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(m[0], m[1] + shift * 0.03); ctx.lineTo(m[2], m[3] + shift * 0.03); ctx.stroke();
    });

    // 月亮光晕（2 层）
    const mx = 300, my = 140 + shift * 0.15;
    const mGlow1 = ctx.createRadialGradient(mx, my, 20, mx, my, 70);
    mGlow1.addColorStop(0, 'rgba(232,230,217,0.15)');
    mGlow1.addColorStop(1, 'rgba(232,230,217,0)');
    ctx.fillStyle = mGlow1;
    ctx.beginPath(); ctx.arc(mx, my, 70, 0, Math.PI * 2); ctx.fill();

    const mGlow2 = ctx.createRadialGradient(mx, my, 30, mx, my, 120);
    mGlow2.addColorStop(0, 'rgba(232,230,217,0.06)');
    mGlow2.addColorStop(1, 'rgba(232,230,217,0)');
    ctx.fillStyle = mGlow2;
    ctx.beginPath(); ctx.arc(mx, my, 120, 0, Math.PI * 2); ctx.fill();

    // 月亮本体
    ctx.fillStyle = '#E8E6D9';
    ctx.beginPath(); ctx.arc(mx, my, 24, 0, Math.PI * 2); ctx.fill();

    // 陨石坑（5 个，柔和灰色半透明）
    const craters = [[-6,-7,4.5],[8,-3,3.5],[-2,6,3],[7,8,2.5],[-8,4,2]];
    craters.forEach(c => {
        ctx.fillStyle = 'rgba(160,160,150,0.25)';
        ctx.beginPath(); ctx.arc(mx + c[0], my + c[1], c[2], 0, Math.PI * 2); ctx.fill();
    });

    // 远山（4 层剪影，逐层加深）
    const hills = [
        {c: '#1E2438', pts: [[0,510],[50,480],[120,500],[190,470],[270,490],[340,465],[400,480]]},
        {c: '#161B2E', pts: [[0,540],[60,510],[140,530],[220,505],[300,525],[370,500],[400,515]]},
        {c: '#0F1320', pts: [[0,570],[70,545],[150,565],[240,540],[320,560],[390,535],[400,550]]},
        {c: '#0A0E1A', pts: [[0,600],[80,580],[170,595],[260,575],[350,590],[400,570]]}
    ];
    hills.forEach(hill => {
        ctx.fillStyle = hill.c;
        ctx.beginPath();
        ctx.moveTo(hill.pts[0][0], hill.pts[0][1] + shift);
        for (let i = 1; i < hill.pts.length; i++) {
            const prev = hill.pts[i-1];
            const curr = hill.pts[i];
            ctx.bezierCurveTo(
                prev[0] + (curr[0] - prev[0]) * 0.4, prev[1] + shift,
                curr[0] - (curr[0] - prev[0]) * 0.4, curr[1] + shift,
                curr[0], curr[1] + shift
            );
        }
        ctx.lineTo(400, 700 + shift); ctx.lineTo(0, 700 + shift); ctx.closePath(); ctx.fill();
    });

    // 远景小树林（15 个暗色小圆弧）
    ctx.fillStyle = '#0D1117';
    const moonTrees = [25,55,95,135,175,225,265,305,345,385,45,115,195,285,365];
    moonTrees.forEach(tx => {
        const ty = 570 + shift - Math.abs(Math.sin(tx * 0.15)) * 12;
        ctx.beginPath(); ctx.arc(tx, ty, 2.5 + Math.sin(tx * 0.4) * 1.5, 0, Math.PI * 2); ctx.fill();
    });

    // 水面（底部 25%）
    ctx.fillStyle = '#1A1F2E';
    ctx.fillRect(0, 620 + shift, GAME_WIDTH, 80);

    // 月光水平波纹（8 条）
    for (let i = 0; i < 8; i++) {
        const ww = 70 - i * 7;
        ctx.fillStyle = `rgba(232,230,217,${0.08 - i * 0.008})`;
        ctx.beginPath(); ctx.ellipse(mx, 630 + shift + i * 10, ww / 2, 1.8, 0, 0, Math.PI * 2); ctx.fill();
    }

    // 薄云（2 朵暗蓝灰）
    ctx.fillStyle = 'rgba(100,110,140,0.1)';
    ctx.beginPath(); ctx.ellipse(100, 80 + shift * 0.04, 60, 18, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(320, 110 + shift * 0.04, 80, 22, 0, 0, Math.PI * 2); ctx.fill();

    ctx.globalAlpha = 1;
}
