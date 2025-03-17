function solveMathProblem() {
    const problem = document.getElementById('mathProblem').value.trim();
    const resultElement = document.getElementById('result');

    // 檢查輸入是否為空
    if (problem === "") {
        resultElement.innerHTML = "<p class='error'>請輸入數學題目！</p>";
        return;
    }

    try {
        // 使用 math.js 解析並計算數學問題
        const result = math.evaluate(problem);

        // 提供結果與解釋
        resultElement.innerHTML = `
            <p><strong>計算結果：</strong> ${result}</p>
            <p class="step"><strong>解釋：</strong>這是根據數學規則計算得出的結果。您可以使用數學的加減乘除運算、括號、冪運算等。</p>
        `;
    } catch (error) {
        resultElement.innerHTML = "<p class='error'>無法識別的數學題目，請檢查格式並重新輸入。</p>";
    }
}

function handleImageUpload() {
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];
    const resultElement = document.getElementById('result');

    if (file) {
        resultElement.innerHTML = "<p>正在識別圖片中的數學問題，請稍候...</p>";
        
        // 使用 Tesseract.js 進行圖片識別
        Tesseract.recognize(
            file,
            'eng', // 這裡選擇英文，你可以改為 `chi_sim` 中文識別
            {
                logger: (m) => {
                    console.log(m); // 打印識別進度
                }
            }
        ).then(({ data: { text } }) => {
            // 提取到的文本內容
            const extractedText = text.trim();

            // 確保識別到的文本是有效的數學表達式
            if (extractedText && isMathExpression(extractedText)) {
                document.getElementById('mathProblem').value = extractedText;  // 顯示識別的結果
                solveMathProblem(); // 進行數學問題解答
            } else {
                resultElement.innerHTML = "<p class='error'>未能識別出有效的數學題目，請重新上傳圖片。</p>";
            }
        }).catch((error) => {
            resultElement.innerHTML = "<p class='error'>圖片識別出錯，請重試。</p>";
        });
    }
}

// 判斷識別出的文本是否為有效的數學表達式
function isMathExpression(text) {
    const mathExpressionPattern = /^[0-9+\-*/^().\s]*$/;
    return mathExpressionPattern.test(text);
}
