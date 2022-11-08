## install pnpm packages
```
pnpm i 
```

## run frontend service 
```
pnpm run dev

or 

vite
```

## JS dedupe string
```javascript
uniq = [...new Set("AAAAA".split(""))].join("");
```

## extract font subset example
```
cd scripts/python

docker build -t pyfonttools:latest .

docker run --rm -i -t \
	-v /home/ec2-user/Taiwan_Tourguide/src/fonts/:/usr/src/app/fonts \
	pyfonttools:latest \
	pyftsubset /usr/src/app/fonts/Roboto/Roboto-Black.ttf --text="0123456789AaBbCcDdEeFfGgHhIiKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz意想不到的好康 請點擊以上皆提供完賽數位獎狀每個關卡各組名，設計、前端人十團體$,()項初選：將由六角學院評審進行第一波篩並於/（五）公布佳作單。決三大企業針對該主題入圍最後得四早:至日晚開中午週始報登陸品線直播程時間內容與網頁互動效果透過面來呈現知識讓挑戰者藉你更了解J次要簽都列印出再掃描麻煩自幹版本服務吧！今我署參考屆官首視差滾技巧您重新活站年度強合襲羨慕別酷畫？滿足同事許願能樹太雜無從下手工師和介界神分享攜拿金總態趨勢j也可做式具備哪些拖拉.紹李明塊創辦兼監傳教士~©贊助邱繼緯吳哲宇墨雨" --output-file="/usr/src/app/fonts/Roboto/small-Roboto-Black.ttf"

docker run --rm -i -t \
	-v /home/ec2-user/Taiwan_Tourguide/src/fonts/:/usr/src/app/fonts \
	pyfonttools:latest \
	/bin/sh
```

## JS dedupe string
```javascript
uniq = [...new Set("AAAAA".split(""))].join("");
```