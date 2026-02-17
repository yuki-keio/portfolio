//勝手に打つコマンド：

(() => {
  const overlay = document.getElementById("gameOverOverlay");
  const newGameBtn = document.getElementById("newGameBtn");
  const pvpTab = [...document.querySelectorAll(".tab")].find((t) => t.dataset.mode === "pvp");
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  window.__stopAutoGameOver = false;

  (async () => {
    if (pvpTab && !pvpTab.classList.contains("active")) pvpTab.click();
    newGameBtn?.click();

    for (let i = 0; i < 5000; i += 1) {
      if (window.__stopAutoGameOver) return console.log("auto play stopped");
      if (overlay?.classList.contains("visible")) return console.log("game over reached");

      const legal = [...document.querySelectorAll(".cell.legal")];
      if (legal.length === 0) {
        await sleep(0);
        continue;
      }

      const cell = legal[(Math.random() * legal.length) | 0];
      cell.click();

      // 2タップ着手モード対策
      if (cell.classList.contains("armed")) cell.click();

      await sleep(0);
    }

    console.warn("手数上限で停止しました");
  })();
})();

