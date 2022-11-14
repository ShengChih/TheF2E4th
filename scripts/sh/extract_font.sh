#/bin/sh

"歷史記錄上傳中載入.選擇檔案(限10MB 內的PDF或JG)小綠簽©Code:Alx/signKT超過，請重新格式錯誤"



echo "/usr/src/app/fonts/EBGaramond/EBGaramond-Bold.otf\n"
docker run --rm -i -t \
	-v /home/ec2-user/Taiwan_Tourguide/src/fonts/:/usr/src/app/fonts \
	pyfonttools:latest \
	pyftsubset \
	--text="歷史記錄上傳中載入中.選擇檔案(限10MB 內的PDF或JPG檔)小綠簽 © Code: Alex  /  Design: KT" \
	--passthrough-tables \
/usr/src/app/fonts/EBGaramond/EBGaramond-Bold.otf --output-file="/usr/src/app/fonts/EBGaramond/small-EBGaramond-Bold.otf"

echo "/usr/src/app/fonts/EBGaramond/EBGaramond-ExtraBold.otf\n"
docker run --rm -i -t \
	-v /home/ec2-user/Taiwan_Tourguide/src/fonts/:/usr/src/app/fonts \
	pyfonttools:latest \
	pyftsubset \
	--text="歷史記錄上傳中載入中.選擇檔案(限10MB 內的PDF或JPG檔)小綠簽 © Code: Alex  /  Design: KT" \
	--passthrough-tables \
/usr/src/app/fonts/EBGaramond/EBGaramond-ExtraBold.otf --output-file="/usr/src/app/fonts/EBGaramond/small-EBGaramond-ExtraBold.otf"

echo "/usr/src/app/fonts/EBGaramond/EBGaramond-Medium.otf\n"
docker run --rm -i -t \
	-v /home/ec2-user/Taiwan_Tourguide/src/fonts/:/usr/src/app/fonts \
	pyfonttools:latest \
	pyftsubset \
	--text="歷史記錄上傳中載入中.選擇檔案(限10MB 內的PDF或JPG檔)小綠簽 © Code: Alex  /  Design: KT" \
	--passthrough-tables \
/usr/src/app/fonts/EBGaramond/EBGaramond-Medium.otf --output-file="/usr/src/app/fonts/EBGaramond/small-EBGaramond-Medium.otf"

echo "/usr/src/app/fonts/EBGaramond/EBGaramond-Regular.otf\n"
docker run --rm -i -t \
	-v /home/ec2-user/Taiwan_Tourguide/src/fonts/:/usr/src/app/fonts \
	pyfonttools:latest \
	pyftsubset \
	--text="歷史記錄上傳中載入中.選擇檔案(限10MB 內的PDF或JPG檔)小綠簽 © Code: Alex  /  Design: KT" \
	--passthrough-tables \
/usr/src/app/fonts/EBGaramond/EBGaramond-Regular.otf --output-file="/usr/src/app/fonts/EBGaramond/small-EBGaramond-Regular.otf"

echo "/usr/src/app/fonts/EBGaramond/EBGaramond-SemiBold.otf\n"
docker run --rm -i -t \
	-v /home/ec2-user/Taiwan_Tourguide/src/fonts/:/usr/src/app/fonts \
	pyfonttools:latest \
	pyftsubset \
	--text="歷史記錄上傳中載入中.選擇檔案(限10MB 內的PDF或JPG檔)小綠簽 © Code: Alex  /  Design: KT" \
	--passthrough-tables \
/usr/src/app/fonts/EBGaramond/EBGaramond-SemiBold.otf --output-file="/usr/src/app/fonts/EBGaramond/small-EBGaramond-SemiBold.otf"

echo "/usr/src/app/fonts/ar-julian.woff\n"
docker run --rm -i -t \
	-v /home/ec2-user/Taiwan_Tourguide/src/fonts/:/usr/src/app/fonts \
	pyfonttools:latest \
	pyftsubset \
	--text="歷史記錄上傳中載入中.選擇檔案(限10MB 內的PDF或JPG檔)小綠簽 © Code: Alex  /  Design: KT" \
	--passthrough-tables \
/usr/src/app/fonts/ar-julian.woff --output-file="/usr/src/app/fonts/small-ar-julian.woff"

echo "/usr/src/app/fonts/Noto_Sans_TC/NotoSansTC-Black.otf"
docker run --rm -i -t \
	-v /home/ec2-user/Taiwan_Tourguide/src/fonts/:/usr/src/app/fonts \
	pyfonttools:latest \
	pyftsubset \
	--text="歷史記錄上傳中載入中.選擇檔案(限10MB 內的PDF或JPG檔)小綠簽 © Code: Alex  /  Design: KT" \
	--passthrough-tables \
/usr/src/app/fonts/Noto_Sans_TC/NotoSansTC-Black.otf --output-file="/usr/src/app/fonts/Noto_Sans_TC/small-NotoSansTC-Black.otf"

echo "/usr/src/app/fonts/Noto_Sans_TC/NotoSansTC-Bold.otf"
docker run --rm -i -t \
	-v /home/ec2-user/Taiwan_Tourguide/src/fonts/:/usr/src/app/fonts \
	pyfonttools:latest \
	pyftsubset \
	--text="歷史記錄上傳中載入中.選擇檔案(限10MB 內的PDF或JPG檔)小綠簽 © Code: Alex  /  Design: KT" \
	--passthrough-tables \
/usr/src/app/fonts/Noto_Sans_TC/NotoSansTC-Bold.otf --output-file="/usr/src/app/fonts/Noto_Sans_TC/small-NotoSansTC-Bold.otf"

echo "/usr/src/app/fonts/Noto_Sans_TC/NotoSansTC-Light.otf\n"
docker run --rm -i -t \
	-v /home/ec2-user/Taiwan_Tourguide/src/fonts/:/usr/src/app/fonts \
	pyfonttools:latest \
	pyftsubset \
	--text="歷史記錄上傳中載入中.選擇檔案(限10MB 內的PDF或JPG檔)小綠簽 © Code: Alex  /  Design: KT" \
	--passthrough-tables \
/usr/src/app/fonts/Noto_Sans_TC/NotoSansTC-Light.otf --output-file="/usr/src/app/fonts/Noto_Sans_TC/small-NotoSansTC-Light.otf"

echo "/usr/src/app/fonts/Noto_Sans_TC/NotoSansTC-Medium.otf"
docker run --rm -i -t \
	-v /home/ec2-user/Taiwan_Tourguide/src/fonts/:/usr/src/app/fonts \
	pyfonttools:latest \
	pyftsubset \
	--text="歷史記錄上傳中載入中.選擇檔案(限10MB 內的PDF或JPG檔)小綠簽 © Code: Alex  /  Design: KT" \
	--passthrough-tables \
/usr/src/app/fonts/Noto_Sans_TC/NotoSansTC-Medium.otf --output-file="/usr/src/app/fonts/Noto_Sans_TC/small-NotoSansTC-Medium.otf"

echo "/usr/src/app/fonts/Noto_Sans_TC/NotoSansTC-Regular.otf\n"
docker run --rm -i -t \
	-v /home/ec2-user/Taiwan_Tourguide/src/fonts/:/usr/src/app/fonts \
	pyfonttools:latest \
	pyftsubset \
	--text="歷史記錄上傳中載入中.選擇檔案(限10MB 內的PDF或JPG檔)小綠簽 © Code: Alex  /  Design: KT" \
	--passthrough-tables \
/usr/src/app/fonts/Noto_Sans_TC/NotoSansTC-Regular.otf --output-file="/usr/src/app/fonts/Noto_Sans_TC/small-NotoSansTC-Regular.otf"

echo "/usr/src/app/fonts/Noto_Sans_TC/NotoSansTC-Thin.otf\n"
docker run --rm -i -t \
	-v /home/ec2-user/Taiwan_Tourguide/src/fonts/:/usr/src/app/fonts \
	pyfonttools:latest \
	pyftsubset \
	--text="歷史記錄上傳中載入中.選擇檔案(限10MB 內的PDF或JPG檔)小綠簽 © Code: Alex  /  Design: KT" \
	--passthrough-tables \
/usr/src/app/fonts/Noto_Sans_TC/NotoSansTC-Thin.otf --output-file="/usr/src/app/fonts/Noto_Sans_TC/small-NotoSansTC-Thin.otf"

echo "/usr/src/app/fonts/Noto_Serif_TC/NotoSerifTC-Black.otf\n"
docker run --rm -i -t \
	-v /home/ec2-user/Taiwan_Tourguide/src/fonts/:/usr/src/app/fonts \
	pyfonttools:latest \
	pyftsubset \
	--text="歷史記錄上傳中載入中.選擇檔案(限10MB 內的PDF或JPG檔)小綠簽 © Code: Alex  /  Design: KT" \
	--passthrough-tables \
/usr/src/app/fonts/Noto_Serif_TC/NotoSerifTC-Black.otf --output-file="/usr/src/app/fonts/Noto_Serif_TC/small-NotoSerifTC-Black.otf"

echo "/usr/src/app/fonts/Noto_Serif_TC/NotoSerifTC-Medium.otf\n"
docker run --rm -i -t \
	-v /home/ec2-user/Taiwan_Tourguide/src/fonts/:/usr/src/app/fonts \
	pyfonttools:latest \
	pyftsubset \
	--text="歷史記錄上傳中載入中.選擇檔案(限10MB 內的PDF或JPG檔)小綠簽 © Code: Alex  /  Design: KT" \
	--passthrough-tables \
/usr/src/app/fonts/Noto_Serif_TC/NotoSerifTC-Medium.otf --output-file="/usr/src/app/fonts/Noto_Serif_TC/small-NotoSerifTC-Medium.otf"

echo "/usr/src/app/fonts/Noto_Serif_TC/NotoSerifTC-Regular.otf\n"
docker run --rm -i -t \
	-v /home/ec2-user/Taiwan_Tourguide/src/fonts/:/usr/src/app/fonts \
	pyfonttools:latest \
	pyftsubset \
	--text="歷史記錄上傳中載入中.選擇檔案(限10MB 內的PDF或JPG檔)小綠簽 © Code: Alex  /  Design: KT" \
	--passthrough-tables \
/usr/src/app/fonts/Noto_Serif_TC/NotoSerifTC-Regular.otf --output-file="/usr/src/app/fonts/Noto_Serif_TC/small-NotoSerifTC-Regular.otf"

echo "/usr/src/app/fonts/Noto_Serif_TC/NotoSerifTC-SemiBold.otf\n"
docker run --rm -i -t \
	-v /home/ec2-user/Taiwan_Tourguide/src/fonts/:/usr/src/app/fonts \
	pyfonttools:latest \
	pyftsubset \
	--text="歷史記錄上傳中載入中.選擇檔案(限10MB 內的PDF或JPG檔)小綠簽 © Code: Alex  /  Design: KT" \
	--passthrough-tables \
/usr/src/app/fonts/Noto_Serif_TC/NotoSerifTC-SemiBold.otf --output-file="/usr/src/app/fonts/Noto_Serif_TC/small-NotoSerifTC-SemiBold.otf"

echo "/usr/src/app/fonts/Noto_Serif_TC/NotoSerifTC-Bold.otf"
docker run --rm -i -t \
	-v /home/ec2-user/Taiwan_Tourguide/src/fonts/:/usr/src/app/fonts \
	pyfonttools:latest \
	pyftsubset \
	--text="歷史記錄上傳中載入中.選擇檔案(限10MB 內的PDF或JPG檔)小綠簽 © Code: Alex  /  Design: KT" \
	--passthrough-tables \
/usr/src/app/fonts/Noto_Serif_TC/NotoSerifTC-Bold.otf --output-file="/usr/src/app/fonts/Noto_Serif_TC/small-NotoSerifTC-Bold.otf"

echo "/usr/src/app/fonts/Noto_Serif_TC/NotoSerifTC-ExtraLight.otf\n"
docker run --rm -i -t \
	-v /home/ec2-user/Taiwan_Tourguide/src/fonts/:/usr/src/app/fonts \
	pyfonttools:latest \
	pyftsubset \
	--text="歷史記錄上傳中載入中.選擇檔案(限10MB 內的PDF或JPG檔)小綠簽 © Code: Alex  /  Design: KT" \
	--passthrough-tables \
/usr/src/app/fonts/Noto_Serif_TC/NotoSerifTC-ExtraLight.otf --output-file="/usr/src/app/fonts/Noto_Serif_TC/small-NotoSerifTC-ExtraLight.otf"

echo "/usr/src/app/fonts/Noto_Serif_TC/NotoSerifTC-Light.otf\n"
docker run --rm -i -t \
	-v /home/ec2-user/Taiwan_Tourguide/src/fonts/:/usr/src/app/fonts \
	pyfonttools:latest \
	pyftsubset \
	--text="歷史記錄上傳中載入中.選擇檔案(限10MB 內的PDF或JPG檔)小綠簽 © Code: Alex  /  Design: KT" \
	--passthrough-tables \
/usr/src/app/fonts/Noto_Serif_TC/NotoSerifTC-Light.otf --output-file="/usr/src/app/fonts/Noto_Serif_TC/small-NotoSerifTC-Light.otf"

echo "/usr/src/app/fonts/Roboto/Roboto-Regular.otf\n"
docker run --rm -i -t \
	-v /home/ec2-user/Taiwan_Tourguide/src/fonts/:/usr/src/app/fonts \
	pyfonttools:latest \
	pyftsubset \
	--text="歷史記錄上傳中載入中.選擇檔案(限10MB 內的PDF或JPG檔)小綠簽 © Code: Alex  /  Design: KT" \
	--passthrough-tables \
/usr/src/app/fonts/Roboto/Roboto-Regular.otf --output-file="/usr/src/app/fonts/Roboto/small-Roboto-Regular.otf"

echo "/usr/src/app/fonts/Roboto/Roboto-Medium.otf\n"
docker run --rm -i -t \
	-v /home/ec2-user/Taiwan_Tourguide/src/fonts/:/usr/src/app/fonts \
	pyfonttools:latest \
	pyftsubset \
	--text="歷史記錄上傳中載入中.選擇檔案(限10MB 內的PDF或JPG檔)小綠簽 © Code: Alex  /  Design: KT" \
	--passthrough-tables \
/usr/src/app/fonts/Roboto/Roboto-Medium.otf --output-file="/usr/src/app/fonts/Roboto/small-Roboto-Medium.otf"

echo "/usr/src/app/fonts/Roboto/Roboto-Black.otf\n"
docker run --rm -i -t \
	-v /home/ec2-user/Taiwan_Tourguide/src/fonts/:/usr/src/app/fonts \
	pyfonttools:latest \
	pyftsubset \
	--text="歷史記錄上傳中載入中.選擇檔案(限10MB 內的PDF或JPG檔)小綠簽 © Code: Alex  /  Design: KT" \
	--passthrough-tables \
/usr/src/app/fonts/Roboto/Roboto-Black.otf --output-file="/usr/src/app/fonts/Roboto/small-Roboto-Black.otf"

echo "/usr/src/app/fonts/Roboto/Roboto-Bold.otf\n"
docker run --rm -i -t \
	-v /home/ec2-user/Taiwan_Tourguide/src/fonts/:/usr/src/app/fonts \
	pyfonttools:latest \
	pyftsubset \
	--text="歷史記錄上傳中載入中.選擇檔案(限10MB 內的PDF或JPG檔)小綠簽 © Code: Alex  /  Design: KT" \
	--passthrough-tables \
/usr/src/app/fonts/Roboto/Roboto-Bold.otf --output-file="/usr/src/app/fonts/Roboto/small-Roboto-Bold.otf"


sudo chown -R ec2-user:ec2-user ./src/fonts