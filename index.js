const fs = require('fs');
const iconv = require('iconv-lite');
const settings = require('./settings.json');

// ファイルからバッファを取得
const fileContent = fs.readFileSync(settings.setting.inputFilePath);
const decodedText = iconv.decode(fileContent, 'UTF-8');
const lines = decodedText.trim().split('\n');

// フォーマットテキストをバッファとして読み込む
const formatContent = fs.readFileSync('format.txt');
const formatText = iconv.decode(formatContent, 'Shift_JIS');

let loopCount = 0; // ループ回数をカウントする変数を追加

// Unicodeに変換し、入れ替えとパディングを行う
const unicodeStrings = lines.map((line) => {
  const speakerName = line.split(',')[0];
  const targetText = line.split(',')[1];

  // Unicodeに変換
  const unicodeArray = Array.from(targetText).map((char) => char.charCodeAt(0).toString(16).padStart(4, '0'));
  const unicodeString = unicodeArray.join('');

  // 入れ替えとパディング
  let swappedUnicode = '';
  for (let i = 0; i < unicodeString.length; i += 4) {
    swappedUnicode += unicodeString.slice(i + 2, i + 4) + unicodeString.slice(i, i + 2);
  }

  const paddedUnicode = swappedUnicode.padEnd(4096, '0');

  let color = 'ffffff';
  let layer = "1";
  if (speakerName.includes(settings.setting.speakerNameA)) {
    color = 'f61b82';
    layer = settings.setting.layerA;
  } else if (speakerName.includes(settings.setting.speakerNameB)) {
    color = '86e03c';
    layer = settings.setting.layerB;
  }

  let secondLength = 0;
  if (settings.setting.secondLength === 'none') {
    secondLength = 100;
  } else {
    secondLength = settings.setting.secondLength;
  }

  const outputText = formatText
    .replace('【text】', paddedUnicode)
    .replace('【color】', color)
    .replace('【loop】', loopCount)
    .replace('【loop】', loopCount)
    .replace('【loop】', loopCount)
    .replace('【X】', settings.setting.x)
    .replace('【Y】', settings.setting.y)
    .replace('【font】', settings.setting.font)
    .replace('【size】', settings.setting.size)
    .replace('【layer】', Number(layer))
    .replace('【start】', (loopCount * Number(secondLength)) + 1)
    .replace('【end】', (loopCount + 1) * Number(secondLength));
  loopCount++; // ループ回数をカウントアップ

  return outputText;
});

// フォーマットテキストにpaddedUnicodeを代入して出力
const outputText = `[exedit]
width=3840
height=2160
rate=60
scale=1
length=79
audio_rate=44100
audio_ch=2\n` + unicodeStrings.join('\n');

fs.writeFileSync(settings.setting.outputFilePath, iconv.encode(outputText, 'Shift_JIS'), 'binary');

console.log('出力が完了しました。');