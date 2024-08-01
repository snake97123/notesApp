// 今回JavaScriptファイルにしているのは、すべてのデータを文字列化した状態でデータベースに格納したいから。
export const fakeData = [
  {
    $id: 1,
    body: JSON.stringify(
      'Resources:\n- 本: "JavaScript基礎" 著者: 太郎\n\n- オンラインコース: "JavaScriptパターン" on Udemy.\n\n- Articles:\n"JavaScript基礎"  Qiita.\n\n"JavaScript中級" Zenn'
    ),
    colors: JSON.stringify({
      id: "color-purple",
      colorHeader: "#FED0FD",
      colorBody: "#FEE5FD",
      colorText: "#18181A",
    }),
    position: JSON.stringify({ x: 505, y: 10 }),
  },
  {
    $id: 2,
    body: JSON.stringify(
      'Resources:\n- 本: "JavaScript基礎" 著者: 太郎\n\n- オンラインコース: "JavaScriptパターン" on Udemy.\n\n- Articles:\n"JavaScript基礎"  Qiita.\n\n"JavaScript中級" Zenn'
    ),
    colors: JSON.stringify({
      id: "color-blue",
      colorHeader: "#9BD1DE",
      colorBody: "#A6DCE9",
      colorText: "#18181A",
    }),
    position: JSON.stringify({ x: 305, y: 110 }),
  },
  {
    $id: 3,
    body: JSON.stringify(
      'Resources:\n- 本: "JavaScript基礎" 著者: 太郎\n\n- オンラインコース: "JavaScriptパターン" on Udemy.\n\n- Articles:\n"JavaScript基礎"  Qiita.\n\n"JavaScript中級" Zenn'
    ),
    colors: JSON.stringify({
      id: "color-yellow",
      colorHeader: "#FFEFBE",
      colorBody: "#FFF5DF",
      colorText: "#18181A",
    }),
    position: JSON.stringify({ x: 605, y: 500 }),
  },
];
