# buslocation
## 構成
バスロケシステムのwebアプリです．
### index.html
メインはindex.htmlで動的操作はmain.jsで行います．
Google mapのAPIキーは自身で書き換えてください．

### ajax.php
ajax.phpはサーバーと通信用のapiで，サーバー上のcsvファイルを読み込み，javasciptにレスポンスします．

### test.php
test.phpはiosアプリとサーバーの通信用apiです．GET通信で送られてきた値をサーバ上のcsvに書き込みます．
