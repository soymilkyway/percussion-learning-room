export type Instrument = {
  id?: string;
  name: string;
  en: string;
  image?: string;
  description: string;
  note?: string;
  soundUrl?: string;
  soundLabel?: string;
};

export type InstrumentGroup = {
  id: string;
  label: string;
  en: string;
  icon: string;
  intro: string;
  items: Instrument[];
};

// 新增樂器時，只要把一個 Instrument 物件放進對應群組的 items。
// image、soundUrl、soundLabel 與 note 都是選填；沒有內容時可直接省略。
export const instrumentGroups: InstrumentGroup[] = [
  {
    id: "drums",
    label: "鼓與鈸類",
    en: "Drums & Cymbals",
    icon: "◉",
    intro: "鼓皮帶來有彈性的節奏與重音，金屬鈸鑼則有明亮或深沉的長共鳴；力度與止音會大幅改變聲音。",
    items: [
      { id: "snare-drum", name: "小鼓", en: "Snare Drum", image: "snare", description: "聲音清脆而銳利，底部響弦帶來細密的沙沙聲。", soundUrl: "https://www.youtube.com/shorts/b2AW7xi_9NM", soundLabel: "20世紀福斯片頭" },
      { name: "大鼓", en: "Bass Drum", image: "bass-drum", description: "聲音低沉厚重。", soundUrl: "https://www.youtube.com/shorts/CSwYAMOYa_E", soundLabel: "威爾第－安魂曲〈震怒之日〉（Dies Irae）" },
      { name: "筒鼓", en: "Tom-tom", image: "tom-tom", description: "音色圓潤飽滿、沒有小鼓的響弦沙聲；不同尺寸能形成由高到低的鼓聲層次。", soundUrl: "https://www.youtube.com/watch?v=-mgV_g0Wnwg&t=61s", soundLabel: "樽屋雅徳－マゼランの未知なる大陸への挑戦" },
      { name: "康加鼓", en: "Conga", image: "conga", description: "音色溫暖而有彈性，可奏出開放音、悶音與清脆掌擊，形成富有層次的拉丁節奏。", soundUrl: "https://www.youtube.com/shorts/hBkVNcrYh3M" },
      { name: "邦哥鼓", en: "Bongo", image: "bongo", description: "聲音短促明亮，高低兩顆鼓能彼此對答，手指敲奏時帶有靈活鮮明的拉丁節奏感。", soundUrl: "https://youtu.be/Bot7XxatiBE?si=kxjjoOMfarbWhTzX&t=47", soundLabel: "《不可能的任務》主題曲" },
      { name: "定音鼓", en: "Timpani", image: "timpani", description: "具有明確音高與深厚共鳴，既能演奏柔和的低音滾奏，也能帶來具有重量感的強烈重音。", soundUrl: "https://www.youtube.com/shorts/4B9LZWSGupM", soundLabel: "理查・史特勞斯－查拉圖斯特拉如是說〈日出〉" },
      { id: "timbales", name: "天巴鼓", en: "Timbales", image: "timbales", description: "成對使用的單面鼓，能演奏清脆、明亮而有穿透力的拉丁節奏。", soundUrl: "https://www.youtube.com/shorts/RJ8VkJzVisw" },
      { name: "雙鈸（手鈸）", en: "Crash Cymbals", image: "crash-cymbals", description: "碰擊時會爆發明亮寬廣的金屬聲，泛音豐富且餘音長，常用於高潮與強烈重音。", soundUrl: "https://www.youtube.com/shorts/jcSIgkr34q4", soundLabel: "柴可夫斯基－羅密歐與茱麗葉" },
      { name: "吊鈸", en: "Suspended Cymbal", image: "suspended-cymbal", description: "通常用來當作樂句之間過度用的音效。單擊時帶有柔和閃亮的金屬聲；滾奏則能從細微聲響逐漸擴展成寬廣的音牆。", soundUrl: "https://www.youtube.com/shorts/o3fnwOFVz6s" },
      { name: "大鑼", en: "Tam-tam", image: "tam-tam", description: "聲音低沉，演奏時具有巨大壓迫感，餘音會維持很久。", soundUrl: "https://www.youtube.com/watch?v=JzkkbPQNufc" },
    ],
  },
  {
    id: "mallets",
    label: "琴類",
    en: "Mallet Percussion",
    icon: "▥",
    intro: "琴類樂器都有明確音高，但木質與金屬材質會帶來完全不同的音色、穿透力與延音。",
    items: [
      { name: "木琴", en: "Xylophone", image: "xylophone", description: "音色乾脆明亮、音頭清楚且餘音較短，快速旋律也能保持清晰並穿透樂團。", soundUrl: "https://www.youtube.com/shorts/xYzOdlFOoE8", soundLabel: "Sabre Dance（劍舞）" },
      { name: "馬林巴木琴", en: "Marimba", image: "marimba", description: "具有溫暖深厚的木質音色，共鳴柔和；低音圓潤飽滿，高音則清楚但不尖銳。", soundUrl: "https://www.youtube.com/shorts/cB6eSQuwSEw", soundLabel: "大家熟悉的 iPhone 鈴聲" },
      { name: "鐘琴", en: "Glockenspiel / Bells", image: "glockenspiel", description: "聲音明亮如小鐘，音高清楚、餘音長，即使在完整樂團中也有很強的穿透力。", soundUrl: "https://www.youtube.com/shorts/H6FlnEFN7OU", soundLabel: "《哈利波特》嘿美主題曲（原曲開頭由鋼片琴演奏）" },
      { name: "顫音琴（鐵琴）", en: "Vibraphone", image: "vibraphone", description: "帶有柔和的金屬音色與持續共鳴，開啟馬達後還會產生波動般的顫音效果。", soundUrl: "https://www.instagram.com/reel/DHYSDeKTIcB/" },
      { id: "tubular-bells", name: "管鐘", en: "Chimes / Tubular Bells", image: "chimes", description: "聲音莊嚴宏亮，像大型教堂鐘；音高明確、餘音悠長，常用來營造隆重氣氛。", soundUrl: "https://www.youtube.com/shorts/6USFjDqW4T4" },
      { id: "crotales", name: "饒鈸", en: "Crotales", image: "crotales", description: "由一組具有固定音高的小型金屬圓盤組成，聲音明亮而且餘音悠長。", soundUrl: "https://www.youtube.com/shorts/l8HA4DrNlLE" },
    ],
  },
  {
    id: "small",
    label: "小型打擊樂器",
    en: "Accessory Percussion",
    icon: "✦",
    intro: "小型打擊樂器的聲音通常短促或具有高頻穿透力，細小的力度、速度與動作都會明顯改變音色。",
    items: [
      { name: "三角鐵", en: "Triangle", image: "triangle", description: "聲音清亮、細緻而有穿透力；單擊會留下長餘音，快速滾奏則形成閃爍的金屬聲。", soundUrl: "https://www.youtube.com/shorts/pccY_X0zTsA" },
      { name: "鈴鼓", en: "Tambourine", image: "tambourine", description: "鼓皮的敲擊聲會和明亮鈴片聲同時出現，也能透過搖奏與滾奏形成連續的金屬顫響。", soundUrl: "https://www.youtube.com/shorts/QC82WvRdFcw", soundLabel: "柴可夫斯基－胡桃鉗〈西班牙舞曲〉" },
      { name: "沙鈴", en: "Shaker", image: "shaker", description: "會產生連續而細密的沙沙聲，顆粒移動的方向與速度決定節奏是否清楚俐落。", soundUrl: "https://www.youtube.com/watch?v=QCYZRxc1UkM" },
      { name: "沙槌", en: "Maracas", image: "maracas", description: "具有明亮而清楚的顆粒聲，向前與回程都會發聲，成對演奏時能形成富有推進感的節奏。", soundUrl: "https://www.youtube.com/shorts/6THsuF_Fuyo" },
      { name: "響板", en: "Castanets", image: "castanets", description: "聲音短促、乾脆而帶木質感，快速連擊時會形成鮮明且具有舞蹈感的節奏。", soundUrl: "https://youtu.be/f9xdSEOZ3DA?si=RAzX9xlu4waDa-U4&t=30", soundLabel: "El Camino Real" },
      { name: "木魚", en: "Wood Block", image: "wood-block", description: "聲音乾燥、短促且帶有空心木質共鳴，不同大小能產生清楚的高低音差。", soundUrl: "https://youtu.be/m1Xk9z7Ihoo?si=17scwZsYsVcZTObB&t=414", soundLabel: "《七夕》中的木魚聲音" },
      { name: "牛鈴", en: "Cowbell", image: "cowbell", description: "聲音明亮、堅硬且帶有明顯金屬聲。", soundUrl: "https://www.youtube.com/watch?v=OKkxM1TSDd4" },
      { id: "sleigh-bells", name: "雪鈴", en: "Sleigh Bells", image: "sleigh-bells", description: "多顆鈴片會形成密集明亮的叮噹聲，既能演奏短促重音，也能製造連續閃爍的聲響。", soundUrl: "https://www.youtube.com/shorts/_4sWSBiajv0" },
      { name: "風鈴", en: "Wind Chime", image: "wind-chime", description: "許多高音金屬聲依序滑過，形成輕盈閃爍、逐漸消散的聲音瀑布。", soundUrl: "https://www.youtube.com/watch?v=ym9tXVKHdkw" },
      { name: "卡巴薩", en: "Cabasa", image: "cabasa", description: "會產生細密而略帶粗糙感的摩擦沙聲，可演奏短促音點，也能形成連續滾動的節奏。", soundUrl: "https://www.youtube.com/shorts/C4aQtcrfLCA" },
      { name: "響棒", en: "Claves", image: "claves", description: "聲音清脆、集中而帶有硬木質感，音量雖不大，卻能清楚穿透其他樂器。", soundUrl: "https://www.youtube.com/watch?v=BODYFCnWLC0" },
      { id: "finger-cymbals", name: "手指鈸", en: "Finger Cymbals", image: "finger-cymbals", description: "成對碰擊的小型金屬鈸，聲音清亮、集中而且餘音細緻。", soundUrl: "https://youtu.be/R1dMVof3OGc?t=11" },
    ],
  },
  {
    id: "special",
    label: "其他特殊打擊樂器",
    en: "Unusual Percussion",
    icon: "?",
    intro: "這些音效樂器各自擁有非常鮮明的聲音個性，常在樂曲中製造驚喜、戲劇效果或特殊色彩。",
    items: [
      { name: "刮葫", en: "Guiro", image: "guiro", description: "刮奏時會產生連續而粗糙的鋸齒聲，速度、方向與刮奏長度能改變節奏輪廓。", soundUrl: "https://www.youtube.com/watch?v=2bsAYD5R3S8" },
      { name: "震盪器", en: "Vibraslap", image: "vibraslap", description: "有點像是響尾蛇的聲響。", soundUrl: "https://www.youtube.com/watch?v=0l-qw9yRFOA" },
      { name: "拍板（樂鞭）", en: "Slapstick / Whip", image: "slapstick", description: "兩片木板快速拍合時會發出響亮而爆裂的啪聲，效果近似鞭子抽擊。", soundUrl: "https://www.youtube.com/shorts/9wj1VWxDesU" },
      { name: "彈音器", en: "Flexatone", image: "flexatone", description: "會發出明亮顫動的金屬聲，音高可上下滑動，帶有一種神祕或卡通音效般的感覺。", soundUrl: "https://www.youtube.com/shorts/o5swoHQcQ-o" },
      // 照片尚待公開使用確認，暫不設定 image；名稱與影片保留。
      { name: "鼓剎（煞車鼓）", en: "Brake Drum", description: "金屬敲擊會產生清楚、響亮而尖銳的鐘狀聲，帶有類似鐵砧的工業質感。", soundUrl: "https://www.youtube.com/watch?v=QTrJGhEjuyo" },
      { name: "阿哥哥鈴", en: "Agogo Bell", image: "agogo-bells", description: "通常能敲出一高一低兩種明亮金屬音，音頭快速、節奏清楚，常帶有鮮明的森巴律動。(可以想像成是兩個小的牛鈴)", soundUrl: "https://www.youtube.com/watch?v=bVEBHnlqJ9M" },
    ],
  },
];
