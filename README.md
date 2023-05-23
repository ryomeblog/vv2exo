# vv2exo

VoiceVoxのテキストからAviUtlのexoファイルに変換するコード。

## フォルダ構成

```
.
├─.gitignore
├─format.txt
├─index.js
├─LICENSE
├─package-lock.json
├─package.json
├─README.md
├─settings.json
├─node_modules
│   └─...省略
└─sample
    └─sample.txt
```

- `format.txt`: 出力する文字のフォーマット。
- `index.js`: settings.jsonを元にexoファイルを出力するコード。
- `LICENSE`: ライセンス。
- `README.md`: 説明ファイル。
- `settings.json`: 設定ファイル。

## 設定

`settings.json` に設定を記載する。

- 例:
```
{
    "setting": {
        "inputFilePath": "../text.txt",
        "outputFilePath": "./result.exo",
        "speakerNameA": "四国めたん",
        "speakerNameB": "ずんだもん",
        "layerA": "1",
        "layerB": "2",
        "colorA": "ff00ff",
        "colorB": "008000",
        "color2A": "ffffff",
        "color2B": "ffffff",
        "secondLength": "250",
        "x": "-410.0",
        "y": "388.0",
        "rate": "190.00",
        "font": "メイリオ",
        "size": "34"
    }
}
```

- `inputFilePath`: VoiceVoxで出力したテキストファイルパス。
- `outputFilePath`: exoファイルを出力する先のパス。
- `speakerNameA`: VoiceVoxで出力したテキストのキャラ名。
- `speakerNameB`: VoiceVoxで出力したテキストのキャラ名。
- `layerA`: AviUtlのレイヤー。
- `layerB`: AviUtlのレイヤー。
- `colorA`: 文字色。
- `colorB`: 文字色。
- `color2A`: 文字背景色。
- `color2B`: 文字背景色。
- `secondLength`: 文字を表示する間隔。
- `x`: 文字を表示するX軸の位置
- `y`: 文字を表示するY軸の位置
- `rate`: 拡大率。
- `font`: フォントの種類。
- `size`: 文字サイズ。
