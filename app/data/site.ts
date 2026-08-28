export const siteNavigation = [
  { href: "/", label: "首頁" },
  { href: "/basics", label: "演奏基本功" },
  { href: "/instruments", label: "樂器介紹" },
  { href: "/appreciation", label: "音樂賞析" },
  { href: "/band-knowledge", label: "管樂團知識" },
] as const;

export const homeLessons = [
  { href: "/basics", title: "演奏基本功", en: "Playing Basics", text: "怎麼握鼓棒？姿勢長什麼樣？" },
  { href: "/instruments", title: "樂器介紹", en: "Instruments", text: "一次認識鼓與鈸類、琴類、小型與特殊打擊樂器。" },
  { href: "/appreciation", title: "音樂賞析", en: "Music Appreciation", text: "從經典原創曲、行進曲，到電影、遊戲與流行音樂改編，探索管樂的廣大世界。" },
  { href: "/band-knowledge", title: "管樂團知識", en: "Concert Band Guide", text: "從可點選的樂團配置圖開始，逐步認識木管、銅管與打擊樂器在舞台上的位置。" },
] as const;
